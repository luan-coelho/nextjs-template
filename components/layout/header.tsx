import { Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed left-[260px] right-0 top-0 z-10 min-h-11 bg-white px-6 py-4 shadow-sm">
      <div>
        <Menu size={20} />
      </div>
    </header>
  )
}
