import React from "react";
import EditorZone from "./EditorZone";
import EditorPicker from "./EditorPicker";


const EditorComponent = (props) => {
  return (
    <div className="h-screen w-[100%] flex">
      <div className='grow h-full overflow-auto mt-20'>
        <EditorZone />
      </div>
      <div className='grow-0 w-[20rem] h-full'>
        <EditorPicker />
      </div>
    </div>
  );
};

export default EditorComponent;
