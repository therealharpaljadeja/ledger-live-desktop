import * as React from "react";
type Props = {
  size?: number | string;
  color?: string;
};

function CircledCheckSolidThin({ size = 16, color = "currentColor" }: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0001 20.88C16.9681 20.88 20.8801 16.848 20.8801 12C20.8801 7.032 16.9681 3.12 12.0001 3.12C7.03212 3.12 3.12012 7.032 3.12012 12C3.12012 16.968 7.03212 20.88 12.0001 20.88ZM7.34412 11.232L7.68012 10.896L11.1841 14.4L17.0161 8.568L17.3521 8.904L11.1841 15.072L7.34412 11.232Z"
        fill={color}
      />
    </svg>
  );
}

export default CircledCheckSolidThin;