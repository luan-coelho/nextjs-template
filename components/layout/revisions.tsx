import React, { Suspense } from "react"
import { RevisionComparison, RevisionType } from "@/types"
import { MoveRight } from "lucide-react"

import { BaseEntity } from "@/types/model-types"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import SpinnerLoading from "@/components/layout/spinner-loading"

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
    icon: string
  } {
    const details = {
      [RevisionType.ADD]: {
        description: "Cadastro",
        color: "bg-green-200 text-green-600",
        icon: "badge-plus",
      },
      [RevisionType.MOD]: {
        description: "Modificação",
        color: "bg-yellow-200 text-yellow-600",
        icon: "pencil",
      },
      [RevisionType.DEL]: {
        description: "Exclusão",
        color: "bg-red-200 text-red-600",
        icon: "trash",
      },
    }

    return (
      details[revisionType] || {
        description: "Desconhecido",
        color: "bg-gray-200 text-gray-600",
        icon: "x",
      }
    )
  }

  return (
    <Accordion type="single" collapsible className={cn("mt-3", className)}>
      <AccordionItem value="item-root">
        <AccordionTrigger className="flex h-12 justify-between justify-items-center rounded-none border bg-card px-6 py-8 text-card-foreground">
          Auditoria
        </AccordionTrigger>
        <AccordionContent className="rounded-none border-none bg-card p-0 text-card-foreground">
          <Suspense fallback={<SpinnerLoading />}>
            <Accordion type="single" collapsible>
              {revisionsComparasion.map((comparison, index) => {
                const comparisonDetails = getRevisionTypeDetails(comparison.revision.revisionType)
                return (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    disabled={comparison.revision.revisionType !== RevisionType.MOD}>
                    <AccordionTrigger
                      className={`${comparisonDetails.color} flex justify-between justify-items-center rounded-none border border-y-0 bg-card px-6 py-4 text-xs font-normal uppercase`}>
                      {comparisonDetails.description}
                    </AccordionTrigger>
                    <AccordionContent className="rounded-none border bg-card px-8 py-2 text-card-foreground">
                      <React.Fragment>
                        <div className="flex items-center justify-between py-4">
                          <div className="flex flex-col items-start">
                            Responsável
                            <div className="text-sm text-gray-500">
                              {comparison.revision.cpf} - {comparison.revision.username}
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex flex-row items-center justify-between py-4">
                          <span>O que mudou?</span>
                          <div className={"mt-2 flex gap-4 text-sm text-gray-500"}>
                            <div className="flex items-center gap-2">
                              <div className="size-4 rounded bg-red-500 p-2"></div>
                              <span>Valor anterior</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="size-4 rounded bg-green-500 p-2"></div>
                              <span>Novo valor</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          {comparison?.fieldChanges.map(fieldChange => (
                            <div key={fieldChange.label}>
                              <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium">{fieldChange.label}</div>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                  <span className={"text-red-500"}>{fieldChange.oldValue}</span>
                                  <MoveRight />
                                  <span className={"text-green-500"}>{fieldChange.newValue}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </React.Fragment>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </Suspense>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
