import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  errorClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, errorClassName, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 justify-center items-start w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-3xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {
          error ?
            <span className={errorClassName}>{error}</span> :
            null
        }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
