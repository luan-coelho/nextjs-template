import React, { useState } from 'react'
import { Trash } from 'lucide-react'

import { actionButtoncolorClasses } from '@/components/ui/action-button'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/date-picker/date-picker'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface FilterOption {
    field: string
    label: string
    type: 'string' | 'select' | 'date' | 'number'
    operations: { value: 'eq' | 'like' | 'ilike' | 'gt' | 'lt'; label: string }[]
    options?: { value: string; label: string }[]
}

export enum FilterOperationLabel {
    EQUALS = 'Igual',
    LIKE = 'Contém',
    ILIKE = 'Contém (sem distinção entre maiúsculas e minúsculas)',
    GREATER_THAN = 'Maior que',
    LESS_THAN = 'Menor que',
}

export interface FilterConfig {
    options: FilterOption[]
}

interface FilterComponentProps {
    config: FilterConfig
    onApplyFilters: (filters: { field: string; operation: string; value: string }[]) => void
}

export default function FilterComponent({ config, onApplyFilters }: FilterComponentProps) {
    const [filters, setFilters] = useState<{ field: string; operation: string; value: string }[]>([])

    const addFilter = () => {
        setFilters(prev => [...prev, { field: '', operation: '', value: '' }])
    }

    const updateFilter = (index: number, key: 'field' | 'operation' | 'value', value: string) => {
        setFilters(prev => {
            const newFilters = [...prev]
            newFilters[index][key] = value
            return newFilters
        })
    }

    const removeFilter = (index: number) => {
        setFilters(prev => prev.filter((_, i) => i !== index))
    }

    const applyFilters = () => {
        onApplyFilters(filters)
    }

    const renderInput = (filter: { field: string; operation: string; value: string }, index: number) => {
        const fieldConfig = config.options.find(option => option.field === filter.field)

        if (!fieldConfig) return null

        switch (fieldConfig.type) {
            case 'string':
            case 'number':
                return (
                    <Input
                        type={fieldConfig.type === 'number' ? 'number' : 'text'}
                        value={filter.value}
                        onChange={e => updateFilter(index, 'value', e.target.value)}
                        placeholder="Informar valor"
                        disabled={!filter.field || !filter.operation}
                    />
                )
            case 'select':
                return (
                    <Select
                        value={filter.value}
                        onValueChange={value => updateFilter(index, 'value', value)}
                        disabled={!filter.field || !filter.operation}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione uma operação" />
                        </SelectTrigger>
                        <SelectContent>
                            {fieldConfig.options?.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )
            case 'date':
                return (
                    <DatePicker
                        onDateChange={date => updateFilter(index, 'value', date?.toISOString() || '')}
                        disabled={!filter.field || !filter.operation}
                    />
                )
            default:
                return null
        }
    }

    return (
        <div className="space-y-4 rounded bg-white p-4 shadow">
            {filters.map((filter, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <Select value={filter.field} onValueChange={value => updateFilter(index, 'field', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione uma operação" />
                        </SelectTrigger>
                        <SelectContent>
                            {config.options.map(option => (
                                <SelectItem key={option.field} value={option.field}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filter.operation}
                        onValueChange={value => updateFilter(index, 'operation', value)}
                        disabled={!filter.field}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione uma operação" />
                        </SelectTrigger>
                        <SelectContent>
                            {config.options
                                .find(option => option.field === filter.field)
                                ?.operations.map(operation => (
                                    <SelectItem key={operation.value} value={operation.value}>
                                        {operation.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>

                    {/* Valor */}
                    {renderInput(filter, index)}

                    {/* Remover filtro */}
                    <Button className={actionButtoncolorClasses.red} onClick={() => removeFilter(index)}>
                        <Trash />
                    </Button>
                </div>
            ))}

            <div className="flex items-center justify-end gap-2">
                <Button size="sm" onClick={addFilter} color="green">
                    Adicionar Filtro
                </Button>
                <Button size="sm" onClick={applyFilters}>
                    Aplicar Filtros
                </Button>
            </div>
        </div>
    )
}
