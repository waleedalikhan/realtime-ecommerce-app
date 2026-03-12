import React from "react";
import { Metadata, NextPage } from "next";
import Checkout from "@/components/pages/checkout";

export const metadata: Metadata = {
  title: "Realtime Commerce | Checkout",
  description: "Enter shipping and contact details.",
};

const CheckoutPage: NextPage = () => {
  return <Checkout />;
};

export default CheckoutPage;
