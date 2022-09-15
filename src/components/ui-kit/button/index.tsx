import cn from "classnames";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button
			{...props}
			className={cn(
				"bg-primary rounded-sm w-button h-button flex justify-center items-center text-white text-12",
				props.disabled && "bg-primary-dark",
				props.className
			)}
		/>
	);
};
