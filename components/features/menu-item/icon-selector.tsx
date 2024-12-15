import { useState } from "react"
import { icons } from "lucide-react"

import { Input } from "@/components/ui/input"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function IconSelector({ onSelect }: { onSelect: (icon: string) => void }) {
  const [search, setSearch] = useState("")
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const filteredIcons = Object.keys(icons).filter(icon => pascalToKebab(icon).includes(search))

  function handleSelect(icon: string) {
    icon = pascalToKebab(icon)
    onSelect(icon)
    setSelectedIcon(icon)
  }

  function pascalToKebab(input: string): string {
    return input
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
      .toLowerCase()
  }

  return (
    <div className="space-y-4">
      {selectedIcon && (
        <div className="rounded border p-4">
          <div className="flex items-center space-x-2">
            <LucideIcon name={selectedIcon} size={36} />
            <span>{selectedIcon}</span>
          </div>
        </div>
      )}
      <div className="space-y-3 border p-4">
        <Input
          className="rounded-none"
          placeholder="Pesquisar ícone (ex: arrow-left)"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ScrollArea className="grid h-[300px] gap-4">
          <div className="grid max-h-96 grid-cols-1 gap-4 p-4 md:grid-cols-4">
            {filteredIcons.map(name => (
              <button
                type="button"
                key={name}
                className="flex flex-col items-center rounded p-2 hover:bg-gray-100"
                onClick={() => handleSelect(name)}>
                <LucideIcon name={name} size={24} />
                <span className="text-xs">{name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
