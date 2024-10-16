"use client"

import React from "react"
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardHome() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link className="text-[var(--breadcrumb-link)] transition-colors hover:text-foreground" href="/">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Criando template para Next.js</CardTitle>
            <CardDescription>Template padrão que será usado em outros projetos.</CardDescription>
          </CardHeader>
          <CardContent>
            <span>Teste</span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
