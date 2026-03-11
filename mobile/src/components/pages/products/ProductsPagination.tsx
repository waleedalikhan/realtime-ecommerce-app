import React from "react";
import { View, Text, Pressable } from "react-native";
import useProducts from "@/hooks/useProducts";
import Select from "@/components/global/ui/Select";
import { productsPaginationStyles as styles } from "@/styles/Products.styles";

const ProductsPagination: React.FC = () => {
  const { total, from, to, page, totalPages, limit, updateFilters } =
    useProducts();

  if (total === 0) return null;

  return (
    <View style={styles.nav}>
      <Text style={styles.summary}>
        Showing {from} to {to} of {total} · Page {page} of {totalPages}
      </Text>
      <View style={styles.controls}>
        <Select
          value={String(limit)}
          onValueChange={(v) => updateFilters({ limit: Number(v), page: 1 })}
          options={[
            { value: "6", label: "6" },
            { value: "12", label: "12" },
            { value: "24", label: "24" },
          ]}
          ariaLabel="Items per page"
        />
        {totalPages > 1 && (
          <View style={styles.buttons}>
            <Pressable
              onPress={() => updateFilters({ page: 1 })}
              disabled={page <= 1}
              style={[styles.pageBtn, page <= 1 && styles.pageBtnDisabled]}
            >
              <Text
                style={[
                  styles.pageBtnText,
                  page <= 1 && styles.pageBtnTextDisabled,
                ]}
              >
                «
              </Text>
            </Pressable>
            <Pressable
              onPress={() => updateFilters({ page: page - 1 })}
              disabled={page <= 1}
              style={[styles.pageBtn, page <= 1 && styles.pageBtnDisabled]}
            >
              <Text
                style={[
                  styles.pageBtnText,
                  page <= 1 && styles.pageBtnTextDisabled,
                ]}
              >
                ‹
              </Text>
            </Pressable>
            <Pressable
              onPress={() => updateFilters({ page: page + 1 })}
              disabled={page >= totalPages}
              style={[
                styles.pageBtn,
                page >= totalPages && styles.pageBtnDisabled,
              ]}
            >
              <Text
                style={[
                  styles.pageBtnText,
                  page >= totalPages && styles.pageBtnTextDisabled,
                ]}
              >
                ›
              </Text>
            </Pressable>
            <Pressable
              onPress={() => updateFilters({ page: totalPages })}
              disabled={page >= totalPages}
              style={[
                styles.pageBtn,
                page >= totalPages && styles.pageBtnDisabled,
              ]}
            >
              <Text
                style={[
                  styles.pageBtnText,
                  page >= totalPages && styles.pageBtnTextDisabled,
                ]}
              >
                »
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductsPagination;
