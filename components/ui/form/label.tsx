import { LabelHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <label
      className={`${errors[props!.htmlFor!] ? "text-red-500" : "text-zinc-600"} flex items-center justify-between text-sm`}
      {...props}
    />
  )
}
