import { LabelHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

import { Label as LabelPrimitive } from "@/components/ui/label"

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <LabelPrimitive
      className={`${errors[props!.htmlFor!] ? "text-red-500" : "text-zinc-700"} flex items-center justify-between text-sm`}
      {...props}
    />
  )
}
