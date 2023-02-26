import React from "react";
import { FiAlignJustify, FiPlay } from "react-icons/fi";

const HeaderLayout = (props) => {
  return (
    <div className="w-full h-20 bg-white flex justify-between items-center px-4 ">
      <div className="flex space-x-2 items-center">
        <div>
          <FiAlignJustify />
        </div>
        <div>Design Board</div>
      </div>
      <div className="flex space-x-4 items-center">
        <div>81%</div>
        <div>
          <div className="inline-flex items-center gap-2 rounded bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-[#171515] focus:outline-none focus:ring active:opacity-75">
            <FiPlay className={"bg-blue-80"} />
            <p className="text-white">Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
