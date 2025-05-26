import React from "react";

const Input = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder = "" 
}) => {
  return (
    <div className="w-full">
      <p className="text-[#000000] font-semibold text-[22px] self-start pt-8 pb-2">{label}</p>
      <input 
        type={type} 
        id={name} 
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`border-1 border-solid 
          ${error ? 'border-red-500' : 'border-[#000000]'} 
          rounded-[20px] w-full p-4`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;