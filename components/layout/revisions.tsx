import React, { Suspense } from "react"
import { Revision, RevisionType } from "@/types"

import { dateUtils } from "@/lib/date-utils"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SpinnerLoading from "@/components/layout/spinner-loading"

type RevisionListProps<T> = {
  revisions: Revision<T>[]
} & React.HTMLAttributes<HTMLDivElement>

export default function Revisions<T>({ revisions, className }: RevisionListProps<T>) {
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
    <Card className={cn("mt-10", className)}>
      <CardHeader className="h-8 py-6">
        <CardTitle>Auditoria</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Suspense fallback={<SpinnerLoading />}>
          <Table>
            <TableHeader className="bg-white">
              <TableRow>
                <TableHead className="w-[100px]">Tipo</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revisions.map(revision => {
                const revisionDetails = getRevisionTypeDetails(revision.revisionType)
                return (
                  <TableRow key={revision.revisionId}>
                    <TableCell className="flex items-center justify-start px-4">
                      <div
                        className={`flex size-6 w-auto items-center justify-center space-x-1 rounded-sm px-1 py-2 ${revisionDetails.color}`}>
                        <LucideIcon size={16} name={revisionDetails.icon} />
                        <span className="text-xs">{revisionDetails.description.toUpperCase()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4">
                      {revision.cpf} - {revision.username}
                    </TableCell>
                    <TableCell className="px-4">{dateUtils.formatDateTime(revision.revisionDate)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Suspense>
      </CardContent>
    </Card>
  )
}
