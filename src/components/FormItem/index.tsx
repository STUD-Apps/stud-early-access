import React from "react";
import { Field } from "formik";
import { FaAsterisk } from "react-icons/fa";

const FormItem: React.FunctionComponent<{
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  errorMessage: any;
}> = ({ name, label, placeholder, required, errorMessage }) => {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <label className="font-bold font-gotham text-lg leading-4" htmlFor={name}>
        {required && (
          <FaAsterisk className="inline mr-2 text-[8px] text-red-500 align-top" />
        )}
        {label}
      </label>
      <div className="flex flex-col gap-y-1">
        <Field
          className="p-4 bg-[#F5F5F5] font-gotham rounded-lg focus-within:outline-none focus-visible:outline-none"
          id={name}
          name={name}
          placeholder={placeholder}
        />
        <span className="font-gotham text-xs text-red-500">{errorMessage}</span>
      </div>
    </div>
  );
};

export default FormItem;
