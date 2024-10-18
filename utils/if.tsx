import React, { ReactNode } from "react"

interface IfProps {
  condition: boolean
  children: ReactNode
}

interface ThenElseProps {
  children: ReactNode
}

const If: React.FC<IfProps> = ({ condition, children }) => {
  const [Then, Else] = React.Children.toArray(children)
  return condition ? (Then as React.ReactElement) : Else ? (Else as React.ReactElement) : null
}

const Then: React.FC<ThenElseProps> = ({ children }) => <>{children}</>

const Else: React.FC<ThenElseProps> = ({ children }) => <>{children}</>

export { If, Then, Else }
