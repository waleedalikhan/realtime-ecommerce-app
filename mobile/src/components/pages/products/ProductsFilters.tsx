import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import useProducts from "@/hooks/useProducts";
import Select from "@/components/global/ui/Select";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const ProductsFilters: React.FC = () => {
  const { updateFilters, search, category, categories, sort } = useProducts();
  const [searchInput, setSearchInput] = useState(search ?? "");

  useEffect(() => {
    setSearchInput(search ?? "");
  }, [search]);

  const handleSearch = () => {
    updateFilters({ search: searchInput.trim(), page: 1 });
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="Search products..."
          placeholderTextColor={colors.stone[500]}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Pressable style={({ pressed }) => [styles.searchBtn, pressed && styles.pressed]} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>Search</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Category</Text>
        <Select
          value={category ?? "all"}
          onValueChange={(v) => updateFilters({ category: v, page: 1 })}
          options={[
            { value: "all", label: "All" },
            ...(categories ?? []).map((c) => ({ value: c, label: c })),
          ]}
          ariaLabel="Filter by category"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Sort</Text>
        <Select
          value={sort ?? "price_asc"}
          onValueChange={(v) =>
            updateFilters({ sort: v as "price_asc" | "price_desc", page: 1 })
          }
          options={[
            { value: "price_asc", label: "Price: low to high" },
            { value: "price_desc", label: "Price: high to low" },
          ]}
          ariaLabel="Sort by"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.gap[2],
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.gap[2],
  },
  searchRow: { flexDirection: "row", minWidth: 200, maxWidth: 400, flex: 1 },
  searchInput: {
    flex: 1,
    ...typography.base,
    color: colors.white,
    backgroundColor: "rgba(41,37,36,0.6)",
    borderWidth: 1,
    borderColor: colors.stone[600],
    borderTopLeftRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.py.sm,
  },
  searchBtn: {
    backgroundColor: colors.stone[700],
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: colors.stone[600],
    borderTopRightRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.py.sm,
    justifyContent: "center",
  },
  pressed: { opacity: 0.8 },
  searchBtnText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.white,
  },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.gap[2] },
  label: {
    ...typography.sm,
    color: colors.stone[400],
  },
});

export default ProductsFilters;
