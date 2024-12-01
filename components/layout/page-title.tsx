import React from "react"

export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>{children}</title>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{children}</h1>
      </div>
    </>
  )
}
