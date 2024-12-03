import React from "react"
import { Trash } from "lucide-react"

import { cn } from "@/lib/utils"
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

type DeleteEntityDialogProps = {
  title?: string
  open: boolean
  onOpenChange(open: boolean): void
  confirmAction(): void
  confirmActionLabel?: string
  cancelAction?(): void
  cancelActionLabel?: string
  children?: React.ReactNode
}

export default function DeleteEntityDialog({
  title,
  open,
  onOpenChange,
  confirmAction,
  confirmActionLabel,
  cancelAction,
  cancelActionLabel,
  children,
}: DeleteEntityDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger
        className={cn(
          buttonVariants({
            variant: "default",
            size: "icon",
          }),
          "rounded-full bg-red-500 hover:bg-red-600",
        )}>
        <Trash className="w-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Você tem certeza absoluta?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {children || <span>Esta ação não poderá ser desfeita. Isso excluirá permanentemente este registro.</span>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelAction}>{cancelActionLabel || "Cancelar"}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmAction} className="bg-red-500 hover:bg-red-600">
            {confirmActionLabel || "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
