import { useEffect, useState } from 'react'
import icons from '@/data/lucide-icons-tags.json'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { LucideIcon } from '@/components/ui/lucide-icon'
import { ScrollArea } from '@/components/ui/scroll-area'

type IconSelectorProps = {
    name: string
    value?: string
    onSelect: (icon: string) => void
}

export default function IconSelector({ name, value, onSelect }: IconSelectorProps) {
    const {
        formState: { errors },
    } = useFormContext()
    const [search, setSearch] = useState<string>(value || '')
    const [selectedIcon, setSelectedIcon] = useState<string | null>(value || null)

    const filteredIcons = icons.filter(icon => icon.includes(search))

    function handleSelect(icon: string) {
        onSelect(icon)
        setSelectedIcon(icon)
    }

    useEffect(() => {
        if (value) {
            setSelectedIcon(value)
        }
    }, [value])

    return (
        <div className="space-y-4">
            <div className={`${errors[name] ? 'border-red-500' : 'border-zinc-300'} space-y-3 rounded-sm border p-4`}>
                <Input
                    className="rounded-none"
                    placeholder="Pesquisar ícone (ex: arrow-left)"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <ScrollArea className="grid max-h-[300px] gap-4">
                    <div className="grid max-h-96 grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        {filteredIcons.map(name => (
                            <button
                                type="button"
                                key={name}
                                className={cn(
                                    selectedIcon === name ? 'bg-primary text-white' : 'hover:bg-gray-100',
                                    'flex flex-col items-center rounded p-2',
                                )}
                                onClick={() => handleSelect(name)}>
                                <LucideIcon name={name} size={24} />
                                <span className="text-xs">{name}</span>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
                {selectedIcon && (
                    <div className="rounded border border-primary bg-blue-100 p-4 text-primary">
                        <div className="flex items-center justify-center space-x-2">
                            <LucideIcon name={selectedIcon} size={36} />
                            <span>{selectedIcon}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
