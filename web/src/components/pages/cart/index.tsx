"use client";
import AuthWall from "@/components/global/AuthWall";
import CartEmpty from "@/components/pages/cart/CartEmpty";
import CartList from "@/components/pages/cart/CartList";
import CartActions from "@/components/pages/cart/CartActions";
import useCart from "@/hooks/useCart";

const Cart: React.FC = () => {
  const { token, cart, isLoading, removeMutation, updateMutation } = useCart();

  if (!token) return <AuthWall message="Please log in to view your cart." />;
  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-stone-400">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6">
      <h1 className="text-2xl font-bold text-white">Cart</h1>
      <p className="mt-1 text-stone-400">Review your items before checkout.</p>
      {!cart?.items.length ? (
        <CartEmpty />
      ) : (
        <>
          <CartList
            cart={cart}
            onRemove={(id: string) => removeMutation.mutate(id)}
            onUpdateQuantity={(itemId, quantity) =>
              updateMutation.mutate({ itemId, quantity })
            }
            isUpdating={updateMutation.isPending}
          />
          <CartActions />
        </>
      )}
    </div>
  );
};

export default Cart;
