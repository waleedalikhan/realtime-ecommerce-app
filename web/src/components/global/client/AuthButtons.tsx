"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/useAuth";
import { clearAuth, getToken, setAuth } from "@/store/authSlice";
import { useLayoutEffect } from "react";

const AuthButtons: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const token = getToken("accessToken") || getToken("refreshToken");

    dispatch(setAuth({ token: token, refreshToken: token, user: null }));
  }, []);

  if (isLoggedIn)
    return (
      <button
        type="button"
        onClick={() => dispatch(clearAuth())}
        className="rounded-lg px-4 py-2 text-sm font-medium text-stone-400 transition hover:bg-stone-800/60 hover:text-white cursor-pointer"
      >
        Log out
      </button>
    );
  else
    return (
      <>
        <Link
          href="/login"
          className="rounded-lg px-4 py-2 text-sm font-medium text-stone-400 transition hover:bg-stone-800/60 hover:text-white"
        >
          Log in
        </Link>
        <span className="mx-2 h-4 w-px bg-stone-700 md:hidden inline" />
        <Link
          href="/register"
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
        >
          Sign up
        </Link>
      </>
    );
};

export default AuthButtons;
