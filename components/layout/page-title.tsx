import React from "react"

export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">{children}</h1>
    </div>
  )
}
