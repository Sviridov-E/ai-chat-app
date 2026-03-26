import { Input } from "@/shared/ui/input";
import "./login-page.scss";

export const LoginPage = () => {
	return (
		<div className="login-page__container">
			<div className="login-page__card">
				<h2>Вход</h2>
				<div className="login-page__inputs">
					<Input label="Логин" name="login" />
					<Input
						label="Пароль"
						name="password"
						type="password"
						error="Неверный пароль"
					/>
				</div>
				<button>Войти</button>
			</div>
		</div>
	);
};
