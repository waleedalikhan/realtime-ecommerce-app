import useProducts from "@/hooks/useProducts";
import ProductCard from "@/components/pages/products/ProductCard";

const ProductsGrid: React.FC = () => {
  const { data, productImageUrl } = useProducts();
  return (
    <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {(data?.data ?? []).map((p) => (
        <ProductCard key={p.id} product={p} productImageUrl={productImageUrl} />
      ))}
    </ul>
  );
};

export default ProductsGrid;
