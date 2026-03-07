import { UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/clx";

type Props = {
  label: string;
  id: string;
  reg: UseFormRegister<any>;
  type: string;
  placeholder: string;
  error?: any;
  className?: string;
};

const InputField: React.FC<Props> = ({
  label,
  id,
  type,
  placeholder,
  reg,
  error,
  className,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...reg(id)}
        className={cn(
          "mt-1 block w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50",
          className
        )}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error.message}</p>}
    </div>
  );
};

export default InputField;
