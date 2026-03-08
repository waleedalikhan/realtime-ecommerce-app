"use client";
import Link from "next/link";
import useProduct from "@/hooks/useProduct";
import ProductPageStates from "@/components/pages/products/product/ProductPageStates";
import ProductImage from "@/components/pages/products/product/ProductImage";
import ProductDetails from "@/components/pages/products/product/ProductDetails";

const Product: React.FC = () => {
  const { product, isLoading, error, addToCart, productImageUrl } =
    useProduct();
  const imageUrl = product ? productImageUrl(product) : "";

  if (isLoading) return <ProductPageStates isLoading={isLoading} />;
  if (error || !product)
    return <ProductPageStates error={error} product={product} />;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 transition hover:text-white"
      >
        ← Back to products
      </Link>

      <article className="mt-6 overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900/40 sm:mt-8">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          <ProductImage
            imageUrl={imageUrl}
            productName={product.name}
            productStock={product.stock}
          />
          <ProductDetails
            category={product.category}
            name={product.name}
            description={product.description ?? "No description available."}
            price={product.price}
            stock={product.stock}
            addToCart={addToCart}
          />
        </div>
      </article>
    </div>
  );
};

export default Product;
