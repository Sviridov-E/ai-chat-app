import type { ButtonHTMLAttributes } from "react";
import "./button.scss";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";

export const Button = ({
	loading,
	className,
	children,
	disabled,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => (
	<button
		disabled={disabled || loading}
		className={clsx(
			"ui-button",
			className,
			(disabled || loading) && "button__button_disabled",
		)}
		{...props}
	>
		{loading ? <LoaderCircle className="button__loader" /> : children}
	</button>
);
