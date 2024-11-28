import { createContext, ReactNode, useContext, useState } from "react"

import { changeCurrentModuleCookie } from "@/app/dashboard/_sidebar/actions"

type SidebarContextType = {
  isSidebarExpanded: boolean
  toggleSidebar: () => void
  changeCurrentModule: (module: Module) => void
  currentModule: Module
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const [currentModule, setCurrentModule] = useState<Module>({} as Module)

  function toggleSidebar() {
    setIsSidebarExpanded(prev => !prev)
  }

  async function changeCurrentModule(module: Module) {
    await changeCurrentModuleCookie(module)
    setCurrentModule(module)
  }

  return (
    <SidebarContext.Provider value={{ isSidebarExpanded, toggleSidebar, currentModule, changeCurrentModule }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar deve ser usado dentro de um SidebarProvider")
  }
  return context
}
