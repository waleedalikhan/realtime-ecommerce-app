import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import useProducts from "@/hooks/useProducts";
import Select from "@/components/global/ui/Select";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const ProductsPagination: React.FC = () => {
  const {
    total,
    from,
    to,
    page,
    totalPages,
    limit,
    updateFilters,
    buildQueryString,
    category,
    sort,
    search,
  } = useProducts();

  if (total === 0) return null;

  const q = (p: number) =>
    buildQueryString({
      page: p,
      limit,
      category: category ?? "all",
      sort: sort ?? "price_asc",
      search: search ?? "",
    });

  return (
    <View style={styles.nav}>
      <Text style={styles.summary}>
        Showing {from} to {to} of {total} · Page {page} of {totalPages}
      </Text>
      <View style={styles.controls}>
        <Select
          value={String(limit)}
          onValueChange={(v) =>
            updateFilters({ limit: Number(v), page: 1 })
          }
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
              <Text style={[styles.pageBtnText, page <= 1 && styles.pageBtnTextDisabled]}>«</Text>
            </Pressable>
            <Pressable
              onPress={() => updateFilters({ page: page - 1 })}
              disabled={page <= 1}
              style={[styles.pageBtn, page <= 1 && styles.pageBtnDisabled]}
            >
              <Text style={[styles.pageBtnText, page <= 1 && styles.pageBtnTextDisabled]}>‹</Text>
            </Pressable>
            <Pressable
              onPress={() => updateFilters({ page: page + 1 })}
              disabled={page >= totalPages}
              style={[styles.pageBtn, page >= totalPages && styles.pageBtnDisabled]}
            >
              <Text style={[styles.pageBtnText, page >= totalPages && styles.pageBtnTextDisabled]}>›</Text>
            </Pressable>
            <Pressable
              onPress={() => updateFilters({ page: totalPages })}
              disabled={page >= totalPages}
              style={[styles.pageBtn, page >= totalPages && styles.pageBtnDisabled]}
            >
              <Text style={[styles.pageBtnText, page >= totalPages && styles.pageBtnTextDisabled]}>»</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    marginTop: spacing.gap[2],
    paddingVertical: spacing.gap[2],
    paddingHorizontal: spacing.gap[4],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(68,64,60,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.gap[4],
  },
  summary: {
    ...typography.sm,
    color: colors.stone[500],
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.gap[2],
  },
  buttons: { flexDirection: "row", gap: 4 },
  pageBtn: {
    minWidth: 36,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pageBtnDisabled: { opacity: 0.5 },
  pageBtnText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
  },
  pageBtnTextDisabled: { color: colors.stone[600] },
});

export default ProductsPagination;
