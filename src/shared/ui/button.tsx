import type { ButtonHTMLAttributes } from "react";
import "./button.scss";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";

export const Button = ({
	loading,
	className,
	children,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => (
	<button
		disabled={loading}
		className={clsx(
			"ui-button",
			className,
			loading && "button__button_disabled",
		)}
		{...props}
	>
		{loading ? <LoaderCircle className="button__loader" /> : children}
	</button>
);
