"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

export function FullscreenDialog({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}

FullscreenDialog.Trigger = function Trigger({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  )
}

FullscreenDialog.Content = function Content({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative flex size-full flex-col bg-white">
            <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-gray-800 p-2 text-white">
              <X size={24} />
            </button>
            <div className="flex-1 p-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
