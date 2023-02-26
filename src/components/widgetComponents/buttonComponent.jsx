import React from "react";

const ButtonComponent = (props) => {
  return (
    <div
      onClick={() => alert('Hi user')}
      className="inline-flex cursor-pointer items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white "
    >
      <span className="text-sm font-medium"> Download </span>

      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </div>
  );
};

export default ButtonComponent;
