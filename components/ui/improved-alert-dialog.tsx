"use client"

import React, { useState } from "react"
import { Trash } from "lucide-react"

import { cn } from "@/lib/utils"
import { actionButtoncolorClasses } from "@/components/ui/action-button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ImprovedAlertDialogProps = {
  title?: string
  confirmAction(): void
  confirmActionLabel?: string
  cancelAction?(): void
  cancelActionLabel?: string
  tooltip?: string
  type?: "delete" | "disable"
  children?: React.ReactNode
  icon?: React.ReactNode
}

export default function ImprovedAlertDialog({
  title,
  confirmAction,
  confirmActionLabel,
  cancelAction,
  cancelActionLabel,
  tooltip = "Deletar",
  type = "delete",
  children,
  icon,
}: ImprovedAlertDialogProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)

  return (
    <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <AlertDialogTrigger>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  buttonVariants(),
                  type === "delete" ? actionButtoncolorClasses.red : actionButtoncolorClasses.gray,
                )}>
                {icon || <Trash />}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-700">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Você tem certeza?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {children || <span>Esta ação não poderá ser desfeita. Isso excluirá permanentemente este registro.</span>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelAction}>{cancelActionLabel || "Cancelar"}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmAction} className="bg-red-500 hover:bg-red-600">
            {confirmActionLabel || "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
