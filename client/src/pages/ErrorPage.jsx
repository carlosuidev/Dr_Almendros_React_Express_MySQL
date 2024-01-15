import React from 'react'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <div className='min-h-screen flex flex-col w-full justify-center items-center'>
      <img src="/error404.png" alt="Error 404" width={300}/>
      <p className='mt-5 mb-10'>Al parecer lo que estabas buscando no existe :(</p>
      <Link to='/' className='inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-sky-500 hover:bg-sky-600 focus:bg-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none'>Volver</Link>
    </div>
  )
}
