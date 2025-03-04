import {FC} from "react";
import {IconProps} from "@/styles/tsx-icons/form-icons/eyeClosed.icon";

export const CopyIcon: FC<IconProps> = ({ width = 20, height = 20, color = "#4238c9" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 1792 1792"  // ✅ Fixes scaling issues
            fill={color}  // ✅ Allows color customization
        >
            <path
                d="M1696 384q40 0 68 28t28 68v1216q0 40-28 68t-68 28H736q-40 0-68-28t-28-68v-288H96q-40 0-68-28t-28-68V640q0-40 20-88t48-76L476 68q28-28 76-48t88-20h416q40 0 68 28t28 68v328q68-40 128-40h416zm-544 213L853 896h299V597zM512 213 213 512h299V213zm196 647 316-316V128H640v416q0 40-28 68t-68 28H128v640h512v-256q0-40 20-88t48-76zm956 804V512h-384v416q0 40-28 68t-68 28H768v640h896z"
            ></path>
        </svg>
    );
};
