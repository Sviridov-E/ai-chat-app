import { useAppDispatch, useAppSelector } from "@/shared/redux";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { authActions } from "../model/auth-slice";
import "./login-page.scss";

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
				<Button disabled={loading} loading={loading}>
					Войти
				</Button>
			</form>
		</div>
	);
};
