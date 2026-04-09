import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={[
          "flex h-10 w-full rounded-xl border border-blue-100 bg-white/70 px-3 py-2 text-sm text-slate-800",
          "placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 focus:bg-white",
          "hover:border-blue-200 transition-all duration-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ].join(" ")}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }