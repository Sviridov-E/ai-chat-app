import { authActions } from '@/pages/login-page'
import { useAppDispatch } from '@/shared/redux'
import clsx from 'clsx'
import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import './main-layout.scss'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const routes = [
  {
    name: 'Чат',
    path: '/chat',
  },
  {
    name: 'Личный кабинет',
    path: '/',
  },
]

export function MainLayout() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="main-layout">
      <nav className="main-layout__navbar">
        <div
          className={clsx(
            'main-layout__navbar-actions',
            isMenuOpen && 'main-layout__navbar-actions_active'
          )}
        >
          <div className="main-layout__navbar-routes">
            {routes.map(({ name, path }) => (
              <Link
                to={path}
                key={path}
                className={clsx(
                  'main-layout__navbar-route',
                  location.pathname === path &&
                    'main-layout__navbar-route_active'
                )}
                onClick={() => {
                  setIsMenuOpen(false)
                }}
              >
                {name}
              </Link>
            ))}
          </div>
          <button
            onClick={() => {
              dispatch(authActions.removeTokens())
              navigate('/login')
              setIsMenuOpen(false)
            }}
            className="main-layout__navbar-route main-layout__exit-button"
          >
            Выйти
          </button>
        </div>

        <button
          onClick={() => {
            setIsMenuOpen((value) => !value)
          }}
          className="main-layout__navbar-burget-btn"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      <div className="main-layout__container">
        <Outlet />
      </div>
    </div>
  )
}
