import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import ButtonComponent from "./widgetComponents/buttonComponent";
import DropdownComponent from "./widgetComponents/dropdownComponent";
import InputComponent from "./widgetComponents/inputComponent";
import TableComponent from "./widgetComponents/tableComponent";
import CanvasComponent from "./widgetComponents/canvasComponent";
import { FiX } from "react-icons/fi";
import { Rnd } from "react-rnd";

const EditorZone = () => {
  const [componentData, setComponentData] = useState([]);
  console.log("componentData", componentData);

  useEffect(() => {
    const layoutData = localStorage.getItem("rgl-7");
    let componentData = JSON.parse(layoutData)?.allData?.componentData;
    if (typeof componentData !== "undefined" && Array.isArray(componentData)) {
      setComponentData(componentData);
    }
  }, []);

  const allowDrag = (evt) => {
    evt.preventDefault();
  };

  const onRemoveComponent = (id) => {
    const componentFilteredData = componentData?.filter(
      (item) => item.id !== id
    );
    setComponentData(componentFilteredData);
    saveToLS("allData", {
      componentData: componentFilteredData,
    });
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
    saveToLS("allData", {
      // layout: data,
      componentData: [...componentData, data],
    });
  };

  const onDragWidget = (id = "", x = 0, y = 0) => {
    let components = componentData?.map((item) => {
      if (item.id === id) {
        item.currentPosition.x = x;
        item.currentPosition.y = y;
      }
      return item;
    });
    setComponentData([...components]);
    saveToLS("allData", {
      componentData: [...componentData],
    });
  };

  const onResizeWidget = (id = "", width = 0, height = 0) => {
    let components = componentData?.map((item) => {
      if (item.id === id) {
        item.currentPosition.width = width;
        item.currentPosition.height = height;
      }
      return item;
    });
    setComponentData([...components]);
    saveToLS("allData", {
      componentData: [...componentData],
    });
  };
  return (
    <div
      className="bg-gray-100 w-full h-full overflow-y-auto"
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
              size={{
                width: component?.currentPosition?.width,
                height: component?.currentPosition?.height,
              }}
              onDragStop={(_, d) => onDragWidget(component.id, d.x, d.y)}
              onResizeStop={(e, direction, ref, delta, position) => {
                console.log("position", position);
                console.log("fional", delta);
                console.log("ref", ref.style.width, ref.style.height);
                console.log("e", e);
                let height = parseInt(ref.style.height) || 0;
                let width = parseInt(ref.style.width) || 0;
                onResizeWidget(component.id, height, width);
              }}
              position={{
                x: component?.currentPosition?.x,
                y: component?.currentPosition?.y,
              }}
              bounds="window"
              dragAxis="both"
            >
              <div className="bg-white   z-0 flex items-center flex flex-col justify-center cursor-grab">
                <div className="flex w-full justify-end px-2 cursor-pointer">
                  <div
                    className="w-5 h-5"
                    onClick={() => onRemoveComponent(component.id)}
                  >
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
