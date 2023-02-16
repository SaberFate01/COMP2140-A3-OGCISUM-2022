import React from "react";
import { RadioGroupContext } from "./RadioGroup";
import './Radio.css'

/**
 * This function is for radio buttons in the instrument edit page
 * Creating the keyboard
 * Works together with radio group
 * @param {*} name - name of button
 * , value - value of button
 * , onChange - What happens when called
 * @returns the html for the radio 
 */
const Radio = ({ name, value, onChange }) => {
  const radioGroup = React.useContext(RadioGroupContext);
  return (
    <label className="container">
      <input
        type="checkbox"
        checked={radioGroup.isChecked(value)}
        onChange={(e) => {
          radioGroup.onChange(value, e.target.checked)
          onChange && onChange(value, e.target.checked);
        }}>
      </input>
      <span className="checkmark">
        {name}
      </span>
    </label>
  );
}

export default Radio;