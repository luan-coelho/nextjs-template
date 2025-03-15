'use client'

import React from 'react'
import { useSidebarContext } from '@/contexts/sidebar-context'
import { Menu } from 'lucide-react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Header() {
    const { toggleSidebar, changeCurrentModule, modules, currentModule } = useSidebarContext()

    function handleModuleChange(value: string) {
        const modulez = modules!.find(module => module.id == value)!
        changeCurrentModule(modulez)
    }

    return (
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-white px-4 shadow-sm">
            <div onClick={toggleSidebar} className="cursor-pointer rounded p-2 hover:bg-[#f5f5f5]">
                <Menu size={18} />
            </div>
            <Select value={currentModule?.id || ''} onValueChange={value => handleModuleChange(value)}>
                <SelectTrigger className="w-auto" disabled={!modules || modules.length == 0}>
                    <SelectValue placeholder={modules && modules.length > 0 ? 'Módulo' : 'Nenhum módulo vinculado'} />
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
