import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[#10b981] text-white hover:bg-[#059669] focus-visible:ring-[#10b981] shadow-lg shadow-emerald-500/25',
        navy:
          'bg-[#0f1f6b] text-white hover:bg-[#172b88] focus-visible:ring-[#0f1f6b]',
        outline:
          'border border-[#0f1f6b]/20 text-[#0f1f6b] hover:bg-[#0f1f6b]/5',
        ghost:
          'text-[#0f1f6b] hover:bg-[#0f1f6b]/5',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export const Button = ({ className, variant, size, children, ...props }) => (
  <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
    {children}
  </button>
)
