import React from "react";
import Link from "next/link";

type Props = {
  product: Product;
  productImageUrl: (p: Product) => string;
};

const ProductCard: React.FC<Props> = ({ product, productImageUrl }) => {
  return (
    <li key={product.id}>
      <Link
        href={`/products/${product.id}`}
        className="group block overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900/40 transition hover:border-stone-600 hover:bg-stone-900/70 hover:shadow-lg hover:shadow-black/20"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-800">
          <img
            src={productImageUrl(product)}
            alt=""
            className="h-full w-full object-cover transition group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {product.stock === 0 && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white">
              Out of stock
            </span>
          )}
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-white group-hover:text-amber-400 transition">
            {product.name}
          </h2>
          <p className="mt-1 text-amber-400 font-medium">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-stone-500">
            {product.category}
            {product.stock > 0 && (
              <span className="ml-2 text-stone-400">
                · {product.stock} in stock
              </span>
            )}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
