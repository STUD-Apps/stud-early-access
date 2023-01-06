import React from "react";
import { ImSpinner8 } from "react-icons/im";

const Button: React.FunctionComponent<{
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: any;
  loading?: boolean;
  disabled?: boolean;
}> = ({ onClick, label, type, loading, disabled }) => {
  return (
    <button
      className="w-full text-center rounded-xl hover:bg-[#6c6cbd]/80 transition-all py-4 bg-[#6c6cbd] font-gotham_bold text-base text-white"
      disabled={disabled || loading}
      type={type}
      onClick={() => {
        onClick();
      }}
    >
      {loading ? (
        <ImSpinner8 className="animate-spin inline" />
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};

export default Button;
