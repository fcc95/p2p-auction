import { type FieldProps } from "formik";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  field: FieldProps["field"];
  form: FieldProps["form"];
}

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  className = "",
  field,
  form,
}: InputProps) => {
  const { value, onChange, onBlur } = field;
  const { errors } = form;

  const showError = Boolean(errors[name] && [name]);
  const errorMessage = typeof errors[name] === "string" ? errors[name] : "";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-800 w-max">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-md border text-gray-900 placeholder-gray-400 transition
       ${
         showError
           ? "border-red-400 focus:border-red-500"
           : "border-gray-300 focus:border-blue-500"
       }


       ${className}`}
      />

      {showError && (
        <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
