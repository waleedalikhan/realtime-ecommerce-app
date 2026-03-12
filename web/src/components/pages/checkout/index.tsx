"use client";
import React from "react";
import AuthWall from "@/components/global/AuthWall";
import InputField from "@/components/global/ui/Input";
import useCheckout from "@/hooks/useCheckout";
import Button from "@/components/global/ui/Button";
import { IconLoader } from "@/components/icons";

const Checkout: React.FC = () => {
  const { token, reg, handleSubmit, errors, onSubmit, loading } = useCheckout();

  if (!token) {
    return <AuthWall message="Please log in to checkout." />;
  }

  return (
    <div className="mx-auto max-w-md px-6">
      <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8">
        <h1 className="text-2xl font-bold text-white">Checkout</h1>
        <p className="mt-2 text-stone-400">
          Enter shipping and contact details.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <InputField
            label="Shipping address"
            id="shippingAddress"
            type="text"
            placeholder="Street, city, postal code"
            reg={reg}
            error={errors.shippingAddress || null}
          />
          <InputField
            label="Contact email"
            id="contactEmail"
            type="email"
            placeholder="you@example.com"
            reg={reg}
            error={errors.contactEmail || null}
          />
          <InputField
            label="Contact phone (optional)"
            id="contactPhone"
            type="tel"
            placeholder="+1 234 567 8900"
            reg={reg}
            error={errors.contactPhone || null}
          />
          {errors.root && (
            <p className="text-sm text-red-400">{errors.root.message}</p>
          )}
          <Button type="submit" size="sm" className="w-full justify-center">
            {loading ? <IconLoader /> : "Place order"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
