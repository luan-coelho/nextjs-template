"use client"

import React from "react"
import { useSidebar } from "@/contexts/sidebar-context"
import { Menu } from "lucide-react"

import { useModules } from "@/hooks/use-users"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export default function Header() {
  const { toggleSidebar, changeCurrentModule } = useSidebar()
  const { modules, isLoading, error } = useModules()

  if (!isLoading && modules) {
    changeCurrentModule(modules[0])
  }

  function handleModuleChange(value: string) {
    const modulez: Module = modules!.find(module => module.id == value)!
    changeCurrentModule(modulez)
  }

  return (
    <header
      className={`flex min-h-11 items-center justify-between bg-white px-4 py-3 shadow-sm transition-all duration-300`}>
      <div onClick={toggleSidebar} className="cursor-pointer rounded p-2 hover:bg-[#f5f5f5]">
        <Menu size={18} />
      </div>
      <Select onValueChange={value => handleModuleChange(value)}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Módulo" />
        </SelectTrigger>
        {isLoading && (
          <SelectContent>
            <Skeleton className="h-[10px] w-auto" />
          </SelectContent>
        )}
        {error && <SelectContent>Erro ao carregar</SelectContent>}
        {modules && (
          <SelectContent>
            {modules.map(module => (
              <SelectItem key={module.id} value={module.id}>
                {module.name}
              </SelectItem>
            ))}
          </SelectContent>
        )}
      </Select>
    </header>
  )
}
