import React from "react";

const Input = ({
    text,
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
      {text && <span>{text}:</span>}
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
