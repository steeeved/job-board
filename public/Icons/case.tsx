import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  return (
    <svg
      width={props.width || 16}
      height={props.height || 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.6667 4.33335H13.3333C14.0733 4.33335 14.6667 4.92669 14.6667 5.66669V13C14.6667 13.74 14.0733 14.3334 13.3333 14.3334H2.66666C1.92666 14.3334 1.33333 13.74 1.33333 13L1.33999 5.66669C1.33999 4.92669 1.92666 4.33335 2.66666 4.33335H5.33333V3.00002C5.33333 2.26002 5.92666 1.66669 6.66666 1.66669H9.33333C10.0733 1.66669 10.6667 2.26002 10.6667 3.00002V4.33335ZM6.66666 4.33335H9.33333V3.00002H6.66666V4.33335Z"
        fill={props.fill || "#858585"}
      />
    </svg>
  );
};

export default Icon;
