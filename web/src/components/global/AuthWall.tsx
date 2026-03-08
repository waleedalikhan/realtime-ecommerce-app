import Link from "next/link";

type Props = {
  message?: string;
};

const AuthWall: React.FC<Props> = ({ message }) => {
  return (
    <div className="mx-auto max-w-2xl px-6">
      <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8 text-center">
        <p className="text-stone-400">
          {message || "Please log in to proceed."}
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block rounded-xl bg-amber-500 px-6 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default AuthWall;
