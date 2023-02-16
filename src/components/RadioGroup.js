import React, { useState } from "react";
import { useEffect } from "react";


export const RadioGroupContext = React.createContext({});
/**
 * This function is for radio buttons in the instrument edit page
 * Creating the keyboard 
 * Works together with radio.js
 * @param {*} { children, initialValue = {}, multiple, onChange }
 * @returns the container for the radio buttons including child elements
 */
const RadioGroup = ({ children, initialValue = {}, multiple, onChange }) => {
  const [values, setValues] = useState(initialValue);
  return (
    <RadioGroupContext.Provider
      value={{
        onChange(value, checked) {
          if (multiple) {
            const newValues = Object.assign({}, values);
            newValues[value] = checked;
            setValues(newValues);
            onChange && onChange(newValues);
          } else {
            setValues(value);
            onChange && onChange(value);
          }
        },
        isChecked(value) {
          if (multiple) {
            return values[value];
          } else {
            return values === value;
          }
        }}}>
      <div className="container">
        { children }
      </div>
    </RadioGroupContext.Provider>
  );
}

export default RadioGroup;
