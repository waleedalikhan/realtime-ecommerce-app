"use client";
import AuthWall from "@/components/global/AuthWall";
import CartEmpty from "@/components/pages/cart/CartEmpty";
import CartList from "@/components/pages/cart/CartList";
import CartActions from "@/components/pages/cart/CartActions";
import useCart from "@/hooks/useCart";

type Props = {
  token: string | null;
  cart: Cart | undefined;
  isLoading: boolean;
  removeMutation: {
    mutate: (id: string) => void;
    isPending: boolean;
  };
  updateMutation: {
    mutate: (args: { itemId: string; quantity: number }) => void;
    isPending: boolean;
  };
  layout?: "page" | "sidebar";
};

export const CartContent: React.FC<Props> = ({
  token,
  cart,
  isLoading,
  removeMutation,
  updateMutation,
  layout = "page",
}) => {
  if (!token) {
    return <AuthWall message="Please log in to view your cart." />;
  }

  if (isLoading) {
    return (
      <div
        className={
          layout === "page"
            ? "mx-auto max-w-2xl px-6"
            : "px-4 py-6 sm:px-6 lg:px-8"
        }
      >
        <p className="text-stone-400">Loading cart...</p>
      </div>
    );
  }

  const hasItems = !!cart?.items.length;

  const wrapperClassName =
    layout === "page"
      ? "mx-auto max-w-2xl px-6"
      : "flex h-full flex-col px-4 py-6 sm:px-6 lg:px-8";

  return (
    <div className={wrapperClassName}>
      <div>
        <h1 className="text-2xl font-bold text-white">
          {layout === "page" ? "Cart" : "Your cart"}
        </h1>
        <p className="mt-1 text-stone-400">
          Review your items before checkout.
        </p>
      </div>

      {!hasItems ? (
        <div className={layout === "page" ? "" : "mt-6 flex-1"}>
          <CartEmpty />
        </div>
      ) : (
        <>
          <div
            className={
              layout === "page"
                ? ""
                : "mt-6 flex-1 overflow-y-auto pr-1 sm:pr-2"
            }
          >
            <CartList
              cart={cart}
              onRemove={(id: string) => removeMutation.mutate(id)}
              onUpdateQuantity={(itemId, quantity) =>
                updateMutation.mutate({ itemId, quantity })
              }
              isUpdating={updateMutation.isPending}
            />
          </div>
          <div className={layout === "page" ? "" : "mt-6"}>
            <CartActions />
          </div>
        </>
      )}
    </div>
  );
};

const Cart: React.FC = () => {
  const { token, cart, isLoading, removeMutation, updateMutation } = useCart();

  return (
    <CartContent
      token={token}
      cart={cart}
      isLoading={isLoading}
      removeMutation={removeMutation}
      updateMutation={updateMutation}
      layout="page"
    />
  );
};

export default Cart;
