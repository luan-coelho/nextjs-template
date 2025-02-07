import React, { Suspense } from "react"
import moduleService from "@/services/module-service"
import { Revision, RevisionType } from "@/types"
import { MoveRight } from "lucide-react"

import { BaseEntity } from "@/types/model-types"
import { dateUtils } from "@/lib/date-utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import SpinnerLoading from "@/components/layout/spinner-loading"

export default async function RevisionItem<T extends BaseEntity>({ revision }: { revision: Revision<T> }) {
  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex h-12 justify-between justify-items-center rounded-none border-none bg-card px-6 py-8 text-card-foreground">
          <div className="flex gap-2">
            <span>{revisionDetails.description}</span>
            <span className="text-sm text-gray-500">
              Realizada em {dateUtils.formatDateTime(revision.revisionDate)}
            </span>
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </Accordion>
  )
}
