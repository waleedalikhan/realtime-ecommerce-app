"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeDrawer } from "@/store/cartUiSlice";
import useCart from "@/hooks/useCart";
import { CartContent } from "@/components/pages/cart";
import CartSkeleton from "@/components/global/skeletons/CartSkeleton";

const ANIMATION_DURATION_MS = 220;

const focusableSelectors =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const CartSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((s: RootState) => s.cartUi.drawerOpen);
  const { token, cart, isLoading, removeMutation, updateMutation } = useCart();

  const [isMounted, setIsMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (drawerOpen) {
      setIsMounted(true);
      requestAnimationFrame(() => setAnimateIn(true));
      previouslyFocusedElementRef.current =
        (document.activeElement as HTMLElement | null) ?? null;
    } else if (isMounted) {
      setAnimateIn(false);
      const timeout = setTimeout(
        () => setIsMounted(false),
        ANIMATION_DURATION_MS
      );
      return () => clearTimeout(timeout);
    }
  }, [drawerOpen, isMounted]);

  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawerNode = drawerRef.current;
    if (drawerNode) {
      const focusable =
        drawerNode.querySelectorAll<HTMLElement>(focusableSelectors);
      if (focusable.length) {
        focusable[0].focus();
      } else {
        drawerNode.focus();
      }
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        dispatch(closeDrawer());
        return;
      }

      if (event.key === "Tab" && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
        ).filter((el) => !el.hasAttribute("disabled"));

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, isMounted]);

  if (!isMounted) return null;

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-stretch justify-end"
      aria-hidden={!drawerOpen}
    >
      <button
        type="button"
        aria-label="Close cart overlay"
        className={`absolute inset-0 bg-black/50 transition-opacity duration-150 ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-sidebar-title"
        tabIndex={-1}
        className={`relative flex h-full w-full max-w-md flex-col border-l border-stone-800 bg-[#0c0c0f] shadow-2xl outline-none transition-transform duration-200 ease-out ${
          animateIn ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-800 px-4 py-4 sm:px-6">
          <h2
            id="cart-sidebar-title"
            className="text-lg font-semibold text-white"
          >
            Your cart
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full px-2 text-stone-400 hover:bg-stone-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0f]"
            aria-label="Close cart"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="h-full px-4 py-4 sm:px-6 sm:py-6">
              <CartSkeleton />
            </div>
          ) : (
            <CartContent
              token={token}
              cart={cart}
              isLoading={false}
              removeMutation={removeMutation}
              updateMutation={updateMutation}
              layout="sidebar"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
