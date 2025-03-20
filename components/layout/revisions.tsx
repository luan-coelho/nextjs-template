import React, { Suspense } from 'react'
import { RevisionComparison, RevisionType } from '@/types'
import { AlertCircle, FileEdit, MoveRight, PlusCircle, Trash2 } from 'lucide-react'

import { BaseEntity } from '@/types/model-types'
import { dateUtils } from '@/lib/date-utils'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SpinnerLoading from '@/components/layout/spinner-loading'

export default async function Revisions<T extends BaseEntity>({
    revisionsComparasion,
    className,
}: {
    revisionsComparasion: RevisionComparison<T>[]
    className?: string
}) {
    function getRevisionTypeDetails(revisionType: RevisionType): {
        description: string
        color: string
        icon: React.ReactNode
    } {
        const details = {
            [RevisionType.ADD]: {
                description: 'Cadastro',
                color: 'bg-green-100 text-green-700 border-green-300',
                icon: <PlusCircle className="size-4" />,
            },
            [RevisionType.MOD]: {
                description: 'Modificação',
                color: 'bg-amber-100 text-amber-700 border-amber-300',
                icon: <FileEdit className="size-4" />,
            },
            [RevisionType.DEL]: {
                description: 'Exclusão',
                color: 'bg-red-100 text-red-700 border-red-300',
                icon: <Trash2 className="size-4" />,
            },
        }

        return (
            details[revisionType] || {
                description: 'Desconhecido',
                color: 'bg-gray-100 text-gray-700 border-gray-300',
                icon: <AlertCircle className="size-4" />,
            }
        )
    }

    return (
        <Card className={cn('mt-3 shadow-sm', className)}>
            <CardHeader className="border-b bg-muted/30 px-6 py-4">
                <CardTitle className="text-base font-medium">Histórico de Auditoria</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Suspense fallback={<SpinnerLoading />}>
                    {revisionsComparasion.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                            <AlertCircle className="mb-2 size-8" />
                            <p>Nenhum histórico de revisão encontrado.</p>
                        </div>
                    ) : (
                        <Accordion type="single" collapsible>
                            {revisionsComparasion.map((comparison, index) => {
                                const comparisonDetails = getRevisionTypeDetails(comparison.revision.type)
                                const userInitials = comparison.revision.user?.name
                                    ? comparison.revision.user.name
                                          .split(' ')
                                          .map(n => n[0])
                                          .join('')
                                    : '??'

                                return (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        disabled={comparison.revision.type !== RevisionType.MOD}
                                        className="border-b last:border-b-0">
                                        <AccordionTrigger
                                            className={cn(
                                                'group flex justify-between gap-2 px-6 py-3 text-sm hover:bg-muted/10',
                                                comparison.revision.type !== RevisionType.MOD && 'cursor-default',
                                            )}>
                                            <div className="flex items-center gap-3">
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        comparisonDetails.color,
                                                        'flex items-center gap-1 px-2',
                                                    )}>
                                                    {comparisonDetails.icon}
                                                    <span>{comparisonDetails.description}</span>
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">
                                                    {dateUtils.formatDateTime(comparison.revision.date)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="size-6">
                                                    <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
                                                </Avatar>
                                                <span className="max-w-40 truncate text-xs text-muted-foreground">
                                                    {comparison.revision.user?.name || 'Usuário desconhecido'}
                                                </span>
                                            </div>
                                        </AccordionTrigger>

                                        {comparison.revision.type === RevisionType.MOD && (
                                            <AccordionContent className="border-t bg-card/50 px-6 py-4">
                                                <div className="flex flex-col space-y-4">
                                                    <div className="flex justify-between rounded-md bg-muted/30 p-3">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-medium">Responsável:</span>
                                                            <span className="text-sm text-muted-foreground">
                                                                {comparison.revision.user?.name || 'Não informado'}
                                                            </span>
                                                        </div>
                                                        {comparison.revision.user?.cpf && (
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-medium">CPF:</span>
                                                                <span className="text-sm text-muted-foreground">
                                                                    {comparison.revision.user.cpf}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {comparison.fieldChanges.length > 0 && (
                                                        <div className="space-y-3">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium">Alterações</span>
                                                                <div className="flex gap-3 text-xs">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <div className="size-3 rounded-full bg-red-500"></div>
                                                                        <span>Valor anterior</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5">
                                                                        <div className="size-3 rounded-full bg-green-500"></div>
                                                                        <span>Novo valor</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-3">
                                                                {comparison.fieldChanges.map(fieldChange => (
                                                                    <div
                                                                        key={fieldChange.label}
                                                                        className="rounded-md border p-2 hover:bg-muted/10">
                                                                        <div className="mb-1.5 text-xs font-medium">
                                                                            {fieldChange.label}
                                                                        </div>
                                                                        <div className="flex items-center gap-2 text-sm">
                                                                            <div className="flex-1 break-all rounded border border-red-200 bg-red-50 px-2 py-1 text-red-600">
                                                                                {fieldChange.oldValue || (
                                                                                    <span className="italic text-gray-400">
                                                                                        Vazio
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <MoveRight className="size-4 shrink-0 text-muted-foreground" />
                                                                            <div className="flex-1 break-all rounded border border-green-200 bg-green-50 px-2 py-1 text-green-600">
                                                                                {fieldChange.newValue || (
                                                                                    <span className="italic text-gray-400">
                                                                                        Vazio
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        )}
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    )}
                </Suspense>
            </CardContent>
        </Card>
    )
}
