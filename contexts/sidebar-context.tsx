import { createContext, ReactNode, useContext, useState } from "react"

type SidebarContextType = {
  isSidebarExpanded: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev)
  }

  return <SidebarContext.Provider value={{ isSidebarExpanded, toggleSidebar }}>{children}</SidebarContext.Provider>
}

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
