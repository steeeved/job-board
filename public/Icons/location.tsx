import React from "react";

interface LocationIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const LocationIcon: React.FC<LocationIconProps> = (props) => {
  return (
    <svg
      width={props.width || 16}
      height={props.height || 16}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.31842 8.4929C5.31842 4.9454 8.12718 2.07623 11.6 2.07623C15.0728 2.07623 17.8816 4.9454 17.8816 8.4929C17.8816 12.3154 13.9152 17.5862 12.291 19.5937C11.932 20.0337 11.2769 20.0337 10.918 19.5937C9.28479 17.5862 5.31842 12.3154 5.31842 8.4929ZM9.35658 8.4929C9.35658 9.7579 10.3616 10.7846 11.6 10.7846C12.8384 10.7846 13.8434 9.7579 13.8434 8.4929C13.8434 7.2279 12.8384 6.20123 11.6 6.20123C10.3616 6.20123 9.35658 7.2279 9.35658 8.4929Z"
        fill={props.fill || "#2A9EF4"}
      />
    </svg>
  );
};

export default LocationIcon;
