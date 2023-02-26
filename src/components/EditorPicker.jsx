import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { EDITOR_PICKER } from "./EditorConstant";
import { FiType, FiBold, FiMenu, FiColumns } from "react-icons/fi";


const EditorPicker = () => {
  const [searchText, setSearchText] = useState("");

  const onHandleChangeComponent = (value = "") => {
    setSearchText(value);
  };

  const filteredComponentItems = useMemo(() => {
    const filteredList = [];
    EDITOR_PICKER.forEach((component) => {
      if (component?.label?.toLowerCase().includes(searchText.toLowerCase())) {
        filteredList.push(component);
      }
    });
    return filteredList;
  }, [searchText]);


  const renderIcons = (iconType = "FiType") => {
    switch (iconType) {
      case "INPUT":
        return <FiType />;
      case "BUTTON":
        return <FiBold />;
      case "DROPDOWN":
        return <FiMenu />;
      case "TABLE":
        return <FiColumns />;
      default:
        return <FiType />;
    }
  };

  const handleDragStart = (evt) => {
    const target = evt.target;
    var dataTransfer = evt.dataTransfer;
    if (dataTransfer == null) {
      return;
    }
    console.log('start',target?.id)
    dataTransfer.setData("componentType", target?.id || '');
  };

  return (
    <div className="w-40 bg-white py-5 flex flex-col space-y-3">
      <div className="h-[3.25rem] flex items-center justify-start ml-2 font-medium w-full my-1">
        <div className=" relative rounded-md  border-[1px] border-gray-400 ml-2">
          <button
            type="submit"
            className="absolute inset-y-0 pl-3 flex items-center pointer-events-none "
          >
            <FiSearch />
          </button>
          <input
            className="block bg-gray-50 w-[18rem] h-12 pl-10 pr-3 sm:text-sm border-gray-300 rounded-md focus:border-blue-600"
            type="search"
            name="search"
            value={searchText}
            onChange={(event) => onHandleChangeComponent(event?.target?.value)}
            placeholder="Search Components"
          />
        </div>
      </div>
      <div className="flex px-3 w-full flex-col space-y-2">
        <div className="font-medium text-gray-600">Components</div>
        <div className="w-full">
            {console.log('filteredComponentItems',filteredComponentItems)}
          {filteredComponentItems?.map((item, index) => {
            return (
              <div
                key={index}
                id={item.type}
                className="flex items-center cursor-grab   w-[18rem] h-[6rem] bg-gray-100 my-3"
                draggable={true}
                onDragStart={handleDragStart}
              >
                <div className="w-[4rem] h-[4rem] my-2 mx-4  bg-white drop-shadow-2xl flex items-center justify-center ">
                  {renderIcons(item?.type)}
                </div>
                <div classNamae="flex flex-col items-center space-between-2">
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="font-normal text-gray-500">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditorPicker;
