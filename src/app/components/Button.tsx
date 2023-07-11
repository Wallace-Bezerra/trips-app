import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: 'primary' | 'outlined' | 'canceled'
}
function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary:
      'bg-primaryLighter font-medium text-[#fff] shadow transition-all hover:opacity-[0.8]',
    outlined:
      'mt-7 border border-primaryLighter bg-transparent text-sm font-semibold text-primaryLighter transition-all duration-500 hover:bg-primaryLighter hover:text-white',
    canceled:
      'mt-7 border border-redPrimary bg-transparent text-sm font-semibold text-redPrimary transition-all duration-500 hover:bg-redPrimary hover:text-white',
  }
  const _className = twMerge(
    variants[variant],
    'appearance-none rounded-lg  w-full p-2 text-sm',
    className,
  )

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  )
}

export default Button
