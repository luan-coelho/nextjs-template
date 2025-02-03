"use client"

import React from "react"
import { Revision, RevisionType } from "@/types"
import { Eye } from "lucide-react"

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

export default function RevisionDetail<T>({ revision }: { revision: Revision<T> }) {
  const revisionDetails = getRevisionTypeDetails(revision.revisionType)

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
      <DialogContent className="min-w-[1000px]">
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
      </DialogContent>
    </Dialog>
  )
}
