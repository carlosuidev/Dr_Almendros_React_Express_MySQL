import React from "react"

export const SuccessAlert = ({ msg }) => {
  return (
    <>
      {/*<!-- Component: Simple Success Alert --> */}
      <div
        className="w-full px-4 py-3 text-sm border rounded border-emerald-100 bg-emerald-50 text-emerald-500"
        role="alert"
      >
        <p>{msg}</p>
      </div>
    </>
  )
}
