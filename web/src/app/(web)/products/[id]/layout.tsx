import type { Metadata } from "next";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type ProductMeta = {
  name: string;
  description: string | null;
};

const getProduct = async (id: string): Promise<ProductMeta | null> => {
  try {
    const res = await fetch(`${BASE}/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ProductMeta;
    return data;
  } catch {
    return null;
  }
};

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | Realtime Commerce",
      description: "The requested product could not be found.",
    };
  }

  const title = `${product.name} | Realtime Commerce`;
  const description =
    product.description?.slice(0, 160)?.trim() ||
    `Shop ${product.name} at Realtime Commerce.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
};

const ProductDetailLayout = ({ children }: Props) => children;

export default ProductDetailLayout;
