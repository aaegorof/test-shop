import React from "react";

const Input = ({
    name,
  className,
  value = null,
  onChange,
  placeholder,
  validator,
  disabled = false
}) => {


  const changeVal = (e) =>  {
    onChange(e.target.value)
  }

  return (
    <label className="input-wrap">
      <span>{name} :</span>
      <input
        type="text"
        className={className}
        onChange={changeVal}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
      />
    </label>
  );
};

export default Input;
