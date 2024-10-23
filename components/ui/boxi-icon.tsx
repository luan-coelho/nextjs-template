import React from "react"
import { IconName } from "boxicons"

interface BoxiIconProps {
  name: IconName
  size?: string
  color?: string
}

export default function BoxIcon({ name, size = "24px", color = "" }: BoxiIconProps) {
  // eslint-disable-next-line tailwindcss/no-custom-classname
  return <i className={`bx ${name}`} style={{ fontSize: size, color }} />
}
