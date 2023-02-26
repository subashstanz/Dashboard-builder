import React from "react";
import "./App.css";
import HeaderLayout from "./components/header";
import EditorComponent from "./components/Editor";


const App = () => {
  return (
    <div className="flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10">
        <HeaderLayout />
      </div>
      <div className="overflow-y-auto ">
        <EditorComponent />
      </div>
    </div>
  );
};

export default App;
