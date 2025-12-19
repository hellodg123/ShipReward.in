from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'shipreward_db')]

# JWT Configuration
SECRET_KEY = os.environ.get('SECRET_KEY', 'shipreward-secret-key-2024')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security
security = HTTPBearer()

# Create the main app
app = FastAPI(title="ShipReward API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============ Models ============

class UserBase(BaseModel):
    email: str
    first_name: str
    last_name: str
    mobile_number: str
    role: str = "customer"  # customer, admin, pickup_man

class UserCreate(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    mobile_number: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    mobile_number: str
    role: str
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    email: str
    new_password: str

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# ============ Helper Functions ============

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await db.users.find_one({"id": user_id})
    if user is None:
        raise credentials_exception
    return user

# ============ Auth Routes ============

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email.lower()})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if mobile number exists
    existing_mobile = await db.users.find_one({"mobile_number": user_data.mobile_number})
    if existing_mobile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mobile number already registered"
        )
    
    # Create new user
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user_data.password)
    
    new_user = {
        "id": user_id,
        "email": user_data.email.lower(),
        "password": hashed_password,
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "mobile_number": user_data.mobile_number,
        "role": "customer",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    await db.users.insert_one(new_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    user_response = UserResponse(
        id=user_id,
        email=new_user["email"],
        first_name=new_user["first_name"],
        last_name=new_user["last_name"],
        mobile_number=new_user["mobile_number"],
        role=new_user["role"],
        created_at=new_user["created_at"]
    )
    
    return TokenResponse(access_token=access_token, user=user_response)

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email.lower()})
    
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user["id"]})
    
    user_response = UserResponse(
        id=user["id"],
        email=user["email"],
        first_name=user["first_name"],
        last_name=user["last_name"],
        mobile_number=user["mobile_number"],
        role=user["role"],
        created_at=user["created_at"]
    )
    
    return TokenResponse(access_token=access_token, user=user_response)

@api_router.post("/auth/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    user = await db.users.find_one({"email": request.email.lower()})
    
    # Always return success to prevent email enumeration
    if not user:
        return {"message": "If your email is registered, you will receive password reset instructions."}
    
    # In production, send email with reset link
    # For now, we'll just return success
    return {"message": "If your email is registered, you will receive password reset instructions."}

@api_router.post("/auth/reset-password")
async def reset_password(request: ResetPasswordRequest):
    user = await db.users.find_one({"email": request.email.lower()})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update password
    hashed_password = get_password_hash(request.new_password)
    await db.users.update_one(
        {"email": request.email.lower()},
        {"$set": {"password": hashed_password, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Password reset successful"}

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        first_name=current_user["first_name"],
        last_name=current_user["last_name"],
        mobile_number=current_user["mobile_number"],
        role=current_user["role"],
        created_at=current_user["created_at"]
    )

# ============ Status Routes ============

@api_router.get("/")
async def root():
    return {"message": "ShipReward API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
