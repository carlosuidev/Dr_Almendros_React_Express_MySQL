import React from 'react'

export const NoResults = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center min-h-[300px]'>
      <img src="/no-hay-resultados.png" alt="Sin resultados" className='w-[150px]' />
      <p className='mt-10'>No se han encontrado datos</p>
    </div>
  )
}
