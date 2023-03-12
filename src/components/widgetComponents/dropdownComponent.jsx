import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const DropdownComponent = (props) => {
  return (
    <div className='bg-white'>
      <Select
        className="w-[30rem] bg-white"
        closeMenuOnSelect={false}
        components={animatedComponents}
        placeholder={"Select the value"}
        isMulti
        options={options}
      />
    </div>
  );
};

export default DropdownComponent;
