import { authActions } from "@/pages/login-page";
import { useAppDispatch } from "@/shared/redux";
import clsx from "clsx";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import "./main-layout.scss";

const routes = [
	{
		name: "Чат",
		path: "/chat",
	},
	{
		name: "Личный кабинет",
		path: "/",
	},
];

export function MainLayout() {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (
		<div className="main-layout">
			<nav className="main-layout__navbar">
				<div className="main-layout__navbar-routes">
					{routes.map(({ name, path }) => (
						<Link
							to={path}
							key={path}
							className={clsx(
								"main-layout__navbar-route",
								location.pathname === path &&
									"main-layout__navbar-route_active",
							)}
						>
							{name}
						</Link>
					))}
				</div>
				<button
					onClick={() => {
						dispatch(authActions.removeTokens());
						navigate("/login");
					}}
					className="main-layout__navbar-route"
				>
					Выйти
				</button>
			</nav>
			<div className="main-layout__container">
				<Outlet />
			</div>
		</div>
	);
}
