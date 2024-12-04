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
import { Button, buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ImprovedAlertDialogProps = {
  title?: string
  open: boolean
  onOpenChange(open: boolean): void
  confirmAction(): void
  confirmActionLabel?: string
  cancelAction?(): void
  cancelActionLabel?: string
  children?: React.ReactNode
  icon?: React.ReactNode
}

export default function ImprovedAlertDialog({
  title,
  open,
  onOpenChange,
  confirmAction,
  confirmActionLabel,
  cancelAction,
  cancelActionLabel,
  children,
  icon,
}: ImprovedAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "icon",
                  }),
                  "rounded-full bg-red-500 hover:bg-red-600",
                )}
                variant="outline">
                {icon || <Trash />}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-700">
              <p>{confirmActionLabel}</p>
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
            {confirmActionLabel || "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
