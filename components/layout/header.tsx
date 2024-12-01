"use client"

import React from "react"
import { useSidebar } from "@/contexts/sidebar-context"
import { Menu } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Header() {
  const { toggleSidebar, changeCurrentModule, modules, currentModule } = useSidebar()

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
      <Select value={currentModule.id} onValueChange={value => handleModuleChange(value)}>
        <SelectTrigger className="w-auto" disabled={!modules || modules.length == 0}>
          <SelectValue placeholder={modules && modules.length > 0 ? "Módulo" : "Nenhum módulo vinculado"} />
        </SelectTrigger>
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
