import React from "react"
import Image from "next/image"
import noDataImg from "@/public/images/no-data.svg"

type EmptyDataProps = {
  children?: React.ReactNode
}

export default function EmptyData({ children }: EmptyDataProps) {
  return (
    <div className="flex flex-col items-center justify-end gap-5 p-5 px-2">
      <Image src={noDataImg} alt="Nenhum registro encontrado" width={100} height={100} />
      <div className="flex-1 text-center text-sm text-muted-foreground">{children || "Nada por aqui ainda"}</div>
    </div>
  )
}
