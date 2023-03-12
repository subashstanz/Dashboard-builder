import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import uuid from "react-uuid";
import ButtonComponent from "./widgetComponents/buttonComponent";
import DropdownComponent from "./widgetComponents/dropdownComponent";
import InputComponent from "./widgetComponents/inputComponent";
import TableComponent from "./widgetComponents/tableComponent";
import CanvasComponent from "./widgetComponents/canvasComponent";
import { FiX } from "react-icons/fi";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { render } from "react-dom";
import { Rnd } from "react-rnd";

const ResponsiveGridLayout = WidthProvider(Responsive);

const EditorZone = (props) => {
  // const [layout, setLayout] = useState([]);
  const [componentData, setComponentData] = useState([]);
  console.log("componentData", componentData);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  //   const layoutData = localStorage.getItem("rgl-7");
  //   let layout = JSON.parse(layoutData)?.allData?.layout;
  //   let componentData = JSON.parse(layoutData)?.allData?.componentData;
  //   if (typeof layout !== "undefined" && Array.isArray(layout)) {
  //     setLayout(layout);
  //   }
  //   if (typeof componentData !== "undefined" && Array.isArray(componentData)) {
  //     setComponentData(componentData);
  //   }
  // }, []);

  const allowDrag = (evt) => {
    evt.preventDefault();
  };

  // const updateLayout = (layoutStack) => {
  //   if (layoutStack?.length) {
  //     setLayout(layoutStack);
  //     saveToLS("allData", {
  //       layout: layoutStack,
  //       componentData: componentData,
  //     });
  //   }
  // };

  const onRemoveComponent = (id) => {
    // const data = layout?.filter((item) => item.i !== id);
    // setLayout(data);
    const componentFilteredData = componentData?.filter(
      (item) => item.id !== id
    );
    setComponentData(componentFilteredData);
    // saveToLS("allData", {
    //   layout: data,
    //   componentData: componentFilteredData,
    // });
  };

  function saveToLS(key, value) {
    localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value,
      })
    );
  }

  const renderLayoutWidth = (type) => {
    switch (type) {
      case "INPUT":
        return {
          x: 150,
          y: 205,
          width: 500,
          height: 190,
        };
      case "TABLE":
        return {
          x: 150,
          y: 205,
          width: 500,
          height: 500,
        };
      case "DROPDOWN":
        return {
          x: 150,
          y: 205,
          width: 500,
          height: 190,
        };
      case "BUTTON":
        return {
          x: 150,
          y: 205,
          width: 200,
          height: 50,
        };
      case "CANVAS":
        return {
          x: 150,
          y: 205,
          width: 500,
          height: 190,
        };
      default:
        return {
          x: 150,
          y: 205,
          width: 200,
          height: 100,
        };
    }
  };

  const onRenderLayout = (type) => {
    switch (type) {
      case "INPUT":
        return <InputComponent />;
      case "TABLE":
        return <TableComponent />;
      case "BUTTON":
        return <ButtonComponent />;
      case "DROPDOWN":
        return <DropdownComponent />;
      case "CANVAS":
        return <CanvasComponent />;
      default:
        return <InputComponent />;
    }
  };

  const onDrop = (event) => {
    var componentType = event.dataTransfer.getData("componentType");
    const itemId = uuid();
    const renderTypeProperties = renderLayoutWidth(componentType);
    const data = {
      id: itemId,
      currentPosition: {
        ...renderTypeProperties,
      },
      type: componentType,
    };
    console.log("data", data);
    setComponentData([...componentData, data]);
  };
  return (
    <div
      className="bg-gray-900 w-full h-full overflow-y-auto"
      onDrop={onDrop}
      onDragOver={allowDrag}
    >
      {componentData?.map((component) => {
        return (
          <div key={component.id}>
            <Rnd
              default={component?.currentPosition}
              minWidth={component?.currentPosition?.width}
              minHeight={component?.currentPosition?.height}
              bounds="window"
              dragAxis='both'
            >
              <div className="bg-white   z-0 flex items-center flex flex-col justify-center cursor-grab">
                <div className="flex w-full justify-end px-2 cursor-pointer">
                  <div className="w-5 h-5" onClick={() => onRemoveComponent(component.id)}>
                    <FiX />
                  </div>
                </div>
                {onRenderLayout(component.type)}
              </div>
            </Rnd>
          </div>
        );
      })}
    </div>
  );
};

export default EditorZone;
