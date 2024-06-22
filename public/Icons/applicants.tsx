import React from "react";

interface ApplicantsProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Applicants: React.FC<ApplicantsProps> = (props) => {
  return (
    <svg
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19 1.70874H5C3.89 1.70874 3 2.60874 3 3.70874V17.7087C3 18.8087 3.9 19.7087 5 19.7087H9L11.29 21.9987C11.68 22.3887 12.31 22.3887 12.7 21.9987L15 19.7087H19C20.1 19.7087 21 18.8087 21 17.7087V3.70874C21 2.60874 20.1 1.70874 19 1.70874ZM12 5.00874C13.49 5.00874 14.7 6.21874 14.7 7.70874C14.7 9.19874 13.49 10.4087 12 10.4087C10.51 10.4087 9.3 9.19874 9.3 7.70874C9.3 6.21874 10.51 5.00874 12 5.00874ZM6 14.8087V15.7087H18V14.8087C18 12.8087 14 11.7087 12 11.7087C10 11.7087 6 12.8087 6 14.8087Z"
        fill={props.fill || "#858585"}
      />
    </svg>
  );
};

export default Applicants;
