import React, { useEffect, useState } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import useProducts from "@/hooks/useProducts";
import Select from "@/components/global/ui/Select";
import { colors } from "@/lib/theme";
import { productsFiltersStyles as styles } from "@/styles/Products.styles";

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
        <Pressable
          style={({ pressed }) => [styles.searchBtn, pressed && styles.pressed]}
          onPress={handleSearch}
        >
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

export default ProductsFilters;
