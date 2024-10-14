import * as React from "react"
import { UsersRound } from "lucide-react"

import { Menu } from "@/components/layout/menu"

export default function Drawer() {
  return (
    <aside className="fixed inset-y-0 left-0 w-[260px] bg-gray-800 text-white">
      <div className="h-11 p-6">
        <h1>Drawer</h1>
      </div>
      <Menu.Root>
        <Menu.Label>Menu</Menu.Label>
        <Menu.List>
          <Menu.Item href="#">
            <UsersRound size={20} /> Item 1
          </Menu.Item>
          <Menu.Item href="#">Item 2</Menu.Item>
          <Menu.Item href="#">Item 3</Menu.Item>
        </Menu.List>
      </Menu.Root>
    </aside>
  )
}
