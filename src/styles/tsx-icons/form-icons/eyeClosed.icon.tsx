import {FC} from "react";

export const EyeClosedIcon: FC<IconProps> = ({width=20, height=20, color})=>{
    return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     width={width}
                     height={height}>
                    <path fill="none" fillRule="evenodd" stroke={color ? color : '#727272'} strokeLinecap="round"
                          strokeLinejoin="round" strokeWidth="2"
                          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"
                          className="colorStroke000 svgStroke"></path>
                </svg>
    )
}

export type IconProps ={
    width?: number,
    height?: number,
    color?: string
}