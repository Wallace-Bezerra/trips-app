import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

function Button({ className, ...props }: ComponentPropsWithoutRef<'button'>) {
  const _className = twMerge(
    'appearance-none rounded-lg bg-primaryLighter w-full p-2 text-sm font-medium text-[#fff] shadow transition-all hover:opacity-[0.8]',
    className,
  )

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  )
}

export default Button
