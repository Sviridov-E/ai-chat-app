import { Input } from "@/shared/ui/input";
import "./login-page.scss";
import { useForm } from "react-hook-form";
import { authActions } from "../model/auth-slice";
import { useAppDispatch, useAppSelector } from "@/shared/redux";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router";

interface FormFields {
	username: string;
	password: string;
}

export const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>();

	const dispatch = useAppDispatch();

	const loading = useAppSelector((state) => state.auth.isLoading);

	const navigate = useNavigate();

	return (
		<div className="login-page__container">
			<form
				className="login-page__card"
				onSubmit={handleSubmit(async (values) => {
					try {
						await dispatch(authActions.loginUser(values)).unwrap();
						navigate("/");
					} catch (error) {
						if (typeof error === "string") {
							toast.error(error);
						}
					}
				})}
			>
				<h2>Вход</h2>
				<div className="login-page__inputs">
					<Input
						label="Логин"
						{...register("username", {
							required: { value: true, message: "Обязательное поле" },
						})}
						error={errors.username?.message}
					/>
					<Input
						label="Пароль"
						type="password"
						{...register("password", {
							required: { value: true, message: "Обязательное поле" },
						})}
						error={errors.password?.message}
					/>
				</div>
				<button
					disabled={loading}
					className={clsx(loading && "button__button_disabled")}
				>
					{loading ? <LoaderCircle className="button__loader" /> : "Войти"}
				</button>
			</form>
		</div>
	);
};
