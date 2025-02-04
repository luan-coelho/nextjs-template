import React from "react"
import { Service } from "@/services/service"
import { Revision, RevisionType } from "@/types"
import { Eye, MoveRight } from "lucide-react"

import { BaseEntity } from "@/types/model-types"
import { dateUtils } from "@/lib/date-utils"
import { actionButtoncolorClasses } from "@/components/ui/action-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import ToolTipButton from "@/components/ui/tool-tip-button"

type RevisionDetailProps<T extends BaseEntity> = {
  revision: Revision<T>
  service: Service<T>
}

export default async function RevisionDetail<T extends BaseEntity>({ revision, service }: RevisionDetailProps<T>) {
  const revisionDetails = getRevisionTypeDetails(revision.revisionType)
  const revisionComparison = await service.fetchCompareRevisions(revision.entity.id, revision.revisionId)

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
    <Dialog>
      <DialogTrigger asChild={true}>
        <ToolTipButton className={actionButtoncolorClasses.blue} tooltipText="Visualizar">
          <Eye className="w-5" />
        </ToolTipButton>
      </DialogTrigger>
      <DialogContent className="h-screen max-w-screen-2xl md:h-auto md:min-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Auditoria</DialogTitle>
          <DialogDescription>Informações sobre a revisão</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex items-center justify-between py-4">
          <div className="flex flex-col items-start">
            {revisionDetails.description}
            <div className="flex flex-col">
              <div className="text-sm text-gray-500">
                Realizada em {dateUtils.formatDateTime(revision.revisionDate)}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            Responsável
            <div className="text-sm text-gray-500">
              {revision.cpf} - {revision.username}
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
          {revisionComparison.fieldChanges.map(fieldChange => (
            <div key={fieldChange.label}>
              <div className="flex items-center justify-between">
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
      </DialogContent>
    </Dialog>
  )
}
