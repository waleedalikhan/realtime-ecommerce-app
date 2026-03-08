import Image from "next/image";

type Props = {
  imageUrl?: string;
  productName?: string;
  productStock?: number;
};

const ProductImage: React.FC<Props> = ({
  imageUrl,
  productName,
  productStock,
}) => {
  return (
    <div className="relative aspect-4/3 w-full bg-stone-800 md:aspect-square">
      <Image
        src={imageUrl ?? ""}
        alt={productName ?? ""}
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        width={800}
        height={600}
      />
      {productStock === 0 && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-medium text-white backdrop-blur-[2px]">
          Out of stock
        </span>
      )}
    </div>
  );
};

export default ProductImage;
