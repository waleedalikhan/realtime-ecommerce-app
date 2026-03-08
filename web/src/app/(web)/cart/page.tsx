import { Metadata, NextPage } from "next";
import Cart from "@/components/pages/cart";

export const metadata: Metadata = {
  title: "Realtime Commerce | Cart",
  description: "Review your items before checkout.",
};

const CartPage: NextPage = () => {
  return <Cart />;
};

export default CartPage;
