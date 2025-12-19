import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  border: '#E5E7EB',
};

export default function ManifestScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Manifest</Text>
            <Text style={styles.breadcrumb}>Manifest {'>'} All</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={18} color={COLORS.white} />
              <Text style={styles.addButtonText}>Create Manifest</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={18} color={COLORS.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search manifest..."
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={18} color={COLORS.darkGray} />
            <Text style={styles.filterButtonText}>More Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="document-text-outline" size={64} color={COLORS.gray} />
          </View>
          <Text style={styles.emptyTitle}>No Open Manifests</Text>
          <Text style={styles.emptyDescription}>
            Your manifests will appear here once you create them.
          </Text>
          <TouchableOpacity style={styles.createButton}>
            <Ionicons name="add-circle-outline" size={20} color={COLORS.white} />
            <Text style={styles.createButtonText}>Create Manifest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  breadcrumb: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 200,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.darkGray,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 8,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
