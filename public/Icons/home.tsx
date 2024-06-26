import React from "react";

interface HomeIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const HomeIcon: React.FC<HomeIconProps> = (props) => {
  return (
    <svg
      width={props.width || 16}
      height={props.height || 16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99778 19.3275V14.3275H13.9978V19.3275C13.9978 19.8775 14.4478 20.3275 14.9978 20.3275H17.9978C18.5478 20.3275 18.9978 19.8775 18.9978 19.3275V12.3275H20.6978C21.1578 12.3275 21.3778 11.7575 21.0278 11.4575L12.6678 3.92749C12.2878 3.58749 11.7078 3.58749 11.3278 3.92749L2.96778 11.4575C2.62778 11.7575 2.83778 12.3275 3.29778 12.3275H4.99778V19.3275C4.99778 19.8775 5.44778 20.3275 5.99778 20.3275H8.99778C9.54778 20.3275 9.99778 19.8775 9.99778 19.3275Z"
        fill={props.fill || "#858585"}
      />
    </svg>
  );
};

export default HomeIcon;
