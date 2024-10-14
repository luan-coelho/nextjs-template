import * as React from "react"
import { UsersRound } from "lucide-react"

import { Menu } from "@/components/layout/menu"

export default function Drawer() {
  return (
    <aside className="fixed inset-y-0 left-0 w-[260px] bg-[#1E1E1E] text-white">
      <div className="inline-flex h-20 w-full items-center justify-start gap-3 p-6 py-5 text-xl font-semibold text-white">
        <h1>Drawer</h1>
      </div>
      <Menu.Root>
        <Menu.Label>Menu</Menu.Label>
        <Menu.List>
          <Menu.Item href="#" icon={<UsersRound size={16} />}>
            Item 1
          </Menu.Item>
        </Menu.List>
      </Menu.Root>
    </aside>
  )
}
