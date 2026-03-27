import { useAppSelector } from '@/shared/redux'
import './personal-page.scss'

export const PersonalPage = () => {
  const username = useAppSelector((store) => store.auth.username)
  return (
    <div className="personal-page">
      <h1>Добро пожаловать, {username}</h1>
    </div>
  )
}
