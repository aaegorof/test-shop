import React, { useState, useRef } from "react";
import MaskedInput from "react-text-mask";
import "./style.scss";

const Input = ({
  text,
  className,
  type,
  value = null,
  onChange,
  placeholder,
  mask,
  validator,
  disabled = false,
  style
}) => {
  const innerRef = useRef(null);
  const [initPlaceholder, setInitPlaceholder] = useState(placeholder);

  const _onChange = e => {
    const validated =
      (validator && validator(e.target.value)) || e.target.value === "";
    if (validator && !validated) {
      return false;
    }
    onChange(e.target.value);
  };
  const onClear = () => onChange("");

  return (
    <div className="input-wrap">
      {text && <div>{text}:</div>}
      {mask && (
        <MaskedInput
          type="text"
          placeholder={placeholder}
          name={text}
          value={value}
          mask={mask}
          placeholderChar={"\u2000"}
          onChange={_onChange}
          disabled={disabled}
          className={className}
        />
      )}

      {!mask && (
        <label className="input-label">
          <input
            value={value}
            disabled={disabled}
            onChange={_onChange}
            onFocus={() => setInitPlaceholder("")}
            onBlur={() => setInitPlaceholder(placeholder)}
            ref={innerRef}
            placeholder={initPlaceholder}
            type={type || "text"}
            style={{ width: "100%" }}
          />
          {value && (
            <button className="clear" onClick={onClear}>
              x
            </button>
          )}
        </label>
      )}
    </div>
  );
};

export default Input;
