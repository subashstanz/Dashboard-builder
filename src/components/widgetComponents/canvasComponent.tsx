import React, { useState } from "react";

type Props = {};

const COLOR_LIST = ["bg-white", "bg-black", "bg-red-700", "bg-blue-600"];

export default function CanvasComponent({}: Props) {
  const [colorState, setColorState] = useState("bg-red-300");
  const [openPicker, setopenPicker] = useState(false);
  return (
    <div
      onClick={() => setopenPicker(!openPicker)}
      className={`w-full h-full flex item-center justify-center ${colorState}`}
    >
      <div>
        <div>Canvas</div>
        <div>
          {openPicker && (
            <div className="flex flex-wrap">
              {COLOR_LIST?.map((item) => {
                return (
                  <div
                    onClick={() => setColorState(item)}
                    className={`w-5 h-5 rounded ${item} `}
                  ></div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
