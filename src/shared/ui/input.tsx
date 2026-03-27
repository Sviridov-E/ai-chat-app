import { type HTMLProps } from 'react'
import './input.scss'
import clsx from 'clsx'

export const Input = ({
  label,
  error,
  ...props
}: HTMLProps<HTMLInputElement> & { label: string; error?: string }) => {
  const isError = !!error?.trim()
  return (
    <label className={clsx('input__label', isError && 'input__label_error')}>
      <span>{label}</span>
      <input {...props} />
      {isError && <span className="input__error">{error}</span>}
    </label>
  )
}
