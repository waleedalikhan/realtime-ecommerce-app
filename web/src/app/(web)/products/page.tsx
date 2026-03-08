import ProductsWithSuspense from "@/components/pages/products/ProductsWithSuspense";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Realtime Commerce | Products",
  description: "Products page",
};

const ProductsPage: NextPage = () => {
  return <ProductsWithSuspense />;
};

export default ProductsPage;
