import Button from "@/components/global/ui/Button";

type Props = {
  category?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  addToCart?: () => void;
};

const ProductDetails: React.FC<Props> = ({
  category,
  name,
  description,
  price,
  stock,
  addToCart,
}) => {
  return (
    <div className="flex flex-col p-6 sm:p-8 md:justify-center">
      <span className="text-xs font-medium uppercase tracking-wider text-amber-400/90">
        {category}
      </span>
      <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{name}</h1>
      <p className="mt-4 text-stone-400 leading-relaxed">
        {description ?? "No description available."}
      </p>

      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <p className="text-2xl font-semibold text-white">
          ${Number(price).toFixed(2)}
        </p>
        {stock !== undefined && (
          <p className="text-sm text-stone-500">
            {stock > 0 ? (
              <span className="text-stone-400">{stock} in stock</span>
            ) : (
              "Out of stock"
            )}
          </p>
        )}
      </div>

      <div>
        <Button
          onClick={addToCart}
          disabled={stock === 0}
          variant="primary"
          className="mt-8 w-full sm:w-auto"
          ariaLabel="Add to cart"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
