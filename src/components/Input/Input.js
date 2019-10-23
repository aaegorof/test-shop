import React from "react";
import MaskedInput from "react-text-mask";

const Input = ({
  text,
  className,
  value = null,
  onChange,
  placeholder,
  mask,
  validator,
  disabled = false
}) => {
  const changeVal = e => {
    const validated = validator(e.target.value) || e.target.value === ""
    if(validated) {
      onChange(e.target.value)
    }
  };

  return (
    <>
      {text && <span>{text}:</span>}
      {mask && (
        <MaskedInput
          type="text"
          placeholder={placeholder}
          name={text}
          value={value}
          mask={mask}
          placeholderChar={"\u2000"}
          onChange={changeVal}
          disabled={disabled}
        />
      )}

      {!mask && (
        <label className="input-wrap">
          <input
            type="text"
            className={className}
            onChange={changeVal}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
          />
        </label>
      )}
    </>
  );
};

export default Input;
