/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type ThemeInputProps = {
  label: string;
  id: string;
  name?: string;
  type?: string;
  [key: string]: any;
};

const ThemeInput = ({
  label,
  id,
  name,
  type = "text",
  ...props
}: ThemeInputProps) => (
  <div className="space-y-2 group">
    <label
      htmlFor={id}
      className="text-sm font-bold uppercase tracking-wider text-black group-focus-within:text-[#bce201] transition-colors"
    >
      {label}
    </label>
    <input
      id={id}
      name={name || id}
      type={type}
      className="w-full px-4 py-3 rounded-lg border-2 border-black bg-white text-black font-bold text-base focus:outline-none focus:border-[#bce201] transition-colors"
      {...props}
    />
  </div>
);

export default ThemeInput;
