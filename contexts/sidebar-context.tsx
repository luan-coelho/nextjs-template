import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { changeCurrentModuleCookie, getCurrentModuleCookieId } from "@/actions/actions"
import useSWR from "swr"

import { fetcher } from "@/lib/api-client"

type SidebarContextType = {
  isSidebarExpanded: boolean
  toggleSidebar: () => void
  changeCurrentModule: (module: Module) => void
  currentModule: Module
  modules: Module[]
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const [currentModule, setCurrentModule] = useState<Module>({} as Module)
  const [modules, setModules] = useState<Module[]>([])
  const id = "123e4567-e89b-12d3-a456-426614174001"
  const { data: modulesApi, isLoading } = useSWR<Module[]>(`/users/${id}/modules`, fetcher)

  function toggleSidebar() {
    setIsSidebarExpanded(prev => !prev)
  }

  async function changeCurrentModule(module: Module) {
    setCurrentModule(module)
    await changeCurrentModuleCookie(module)
  }

  useEffect(() => {
    if (!isLoading && modulesApi) {
      getCurrentModuleCookieId().then(cookie => {
        if (cookie) {
          const foundModule = modulesApi.find(module => module.id == cookie.value)
          if (foundModule) {
            setCurrentModule(foundModule)
          }
        } else {
          setCurrentModule(modulesApi[0])
        }
      })
      setModules(modulesApi || [])
    }
  }, [isLoading, modulesApi])

  // noinspection JSUnusedGlobalSymbols
  return (
    <SidebarContext.Provider value={{ isSidebarExpanded, toggleSidebar, currentModule, changeCurrentModule, modules }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarContext(): SidebarContextType {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar deve ser usado dentro de um SidebarProvider")
  }
  return context as SidebarContextType
}
