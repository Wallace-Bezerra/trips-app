import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: 'primary' | 'outlined' | 'canceled'
  isLoading?: boolean
}
function Button({
  className,
  variant = 'primary',
  isLoading,
  ...props
}: ButtonProps) {
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
    'appearance-none rounded-lg w-full p-2 text-sm flex justify-center disabled:hover:opacity-[1] disabled:bg-gray-400 transition-all ',
    className,
  )

  return (
    <button disabled={isLoading} className={_className} {...props}>
      {!isLoading ? (
        props.children
      ) : (
        <div className="h-5 w-5  animate-spin rounded-full border-2  border-solid border-transparent border-l-white border-t-white"></div>
      )}
    </button>
  )
}

export default Button
