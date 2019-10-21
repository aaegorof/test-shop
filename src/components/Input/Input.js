import React, {useState} from "react";

const Input = ({
    name,
  className,
  value,
  onChange,
  placeholder,
  validator,
  disabled = false
}) => {

  const [val, updateVal] = useState(value)

  const changeVal = (e) =>  {
    updateVal(e.target.value)
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
