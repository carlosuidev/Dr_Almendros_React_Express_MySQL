import React from "react"

export const ErrorAlert = ({ msg }) => {
  return (
    <>
      {/*<!-- Component: Danger Alert With Icon --> */}
      <div
        className="flex w-full items-start gap-4 rounded border border-pink-100 bg-pink-50 px-4 py-3 text-sm text-pink-500"
        role="alert"
      >
        {/*  <!-- Icon --> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          role="graphics-symbol"
          aria-labelledby="title-04 desc-04"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {/*  <!-- Text --> */}
        <p>{msg}</p>
      </div>
      {/*<!-- End Danger Alert With Icon --> */}
    </>
  )
}
