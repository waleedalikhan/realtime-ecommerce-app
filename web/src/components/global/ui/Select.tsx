import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[] | string[];
  ariaLabel: string;
};

const Select: React.FC<Props> = ({ value, onChange, options, ariaLabel }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="appearance-none cursor-pointer rounded-xl border border-stone-600 bg-stone-800/60 pl-3 pr-8 py-2 text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
      aria-label={ariaLabel}
    >
      {options.map((opt) => (
        <option
          key={typeof opt === "string" ? opt : opt.value}
          value={typeof opt === "string" ? opt : opt.value}
        >
          {typeof opt === "string" ? opt : opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
