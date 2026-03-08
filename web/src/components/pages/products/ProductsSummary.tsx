import useProducts from "@/hooks/useProducts";

const ProductsSummary: React.FC = () => {
  const { total, from, to } = useProducts();
  return (
    <p className="mt-4 text-sm text-stone-500">
      {total === 0
        ? "No products match your filters."
        : `Showing ${from}–${to} of ${total} products`}
    </p>
  );
};

export default ProductsSummary;
