import React, { useState } from "react"

export const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block">{children}</div>
}

export const DropdownMenuTrigger = ({ children, asChild = false, ...props }) => {
  const Child = asChild ? React.cloneElement(children, props) : <button {...props}>{children}</button>
  return Child
}

export const DropdownMenuContent = ({ children, align = "start" }) => {
  return (
    <div
      className={`
        absolute mt-2 w-40 rounded-md border bg-white shadow-lg
        ${align === "end" ? "right-0" : "left-0"}
      `}
    >
      {children}
    </div>
  )
}

export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </div>
  )
}
