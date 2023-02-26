import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import uuid from "react-uuid";
import ButtonComponent from "./widgetComponents/buttonComponent";
import DropdownComponent from "./widgetComponents/dropdownComponent";
import InputComponent from "./widgetComponents/inputComponent";
import TableComponent from "./widgetComponents/tableComponent";
import { FiX } from "react-icons/fi";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const EditorZone = (props) => {
  const [layout, setLayout] = useState([]);
  const [componentData, setComponentData] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const layoutData = localStorage.getItem("rgl-7");
    let layout = JSON.parse(layoutData)?.allData?.layout;
    let componentData = JSON.parse(layoutData)?.allData?.componentData;
    if (typeof layout !== "undefined" && Array.isArray(layout)) {
      setLayout(layout);
    }
    if (typeof componentData !== "undefined" && Array.isArray(componentData)) {
      setComponentData(componentData);
    }
  }, []);

  const allowDrag = (evt) => {
    evt.preventDefault();
  };

  const updateLayout = (layoutStack) => {
    if (layoutStack?.length) {
      setLayout(layoutStack);
      saveToLS("allData", {
        layout: layoutStack,
        componentData: componentData,
      });
    }
  };

  const onRemoveComponent = (id) => {
    const data = layout?.filter((item) => item.i !== id);
    setLayout(data);
    const componentFilteredData = componentData?.filter(
      (item) => item.id !== id
    );
    setComponentData(componentFilteredData);
    saveToLS("allData", {
      layout: data,
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

  const renderLayoutWidth = (itemId, type) => {
    switch (type) {
      case "INPUT":
        return { i: `${itemId}`, x: 0, y: 0, w: 5, h: 3, minH: 3, minW: 6 };
      case "TABLE":
        return { i: `${itemId}`, x: 0, y: 0, w: 10, h: 10, minH: 10, minW: 4 };
      case "DROPDOWN":
        return { i: `${itemId}`, x: 0, y: 0, w: 5, h: 3 };
      case "BUTTON":
        return {
          i: `${itemId}`,
          x: 0,
          y: 0,
          w: 2,
          h: 3,
          minH: 3,
          minW: 2,
          maxH: 3,
          maxW: 4,
        };
      default:
        return { i: `${itemId}`, x: 0, y: 0, w: 2, h: 2 };
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
      default:
        return <InputComponent />;
    }
  };

  const onDrop = (_, __, event) => {
    var componentType = event.dataTransfer.getData("componentType");
    const itemId = uuid();
    const layoutSizeData = renderLayoutWidth(itemId, componentType);
    setLayout([...layout, layoutSizeData]);
    saveToLS("allData", {
      layout: [...layout, layoutSizeData],
      componentData: [...componentData, { id: itemId, type: componentType }],
    });
    setComponentData([...componentData, { id: itemId, type: componentType }]);
  };
  return (
    <div className="bg-gray-900 w-full h-screen" onDragOver={allowDrag}>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        style={{
          background: "#F3F4F6",
          width: `100%`,
          height: `100%`,
          position: "relative",
        }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        margin={[10, 10]}
        rowHeight={20}
        onLayoutChange={(stack) => {
          if (mounted) {
            updateLayout(stack);
          }
        }}
        isResizable={true}
        isDraggable={true}
        isDroppable={true}
        onDrop={onDrop}
        allowOverlap={false}
        useCSSTransforms={true}
      >
        {componentData?.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-white z-0 flex items-center flex flex-col justify-center cursor-grab"
            >
              <div className="flex w-full justify-end px-2 cursor-pointer">
                <div
                  className="w-5 h-5"
                  onClick={() => onRemoveComponent(item.id)}
                >
                  <FiX />
                </div>
              </div>
              {onRenderLayout(item.type)}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default EditorZone;
