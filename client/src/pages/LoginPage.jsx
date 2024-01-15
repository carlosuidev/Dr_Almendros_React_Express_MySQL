import React from 'react'
import { LoginForm } from "../components/forms/LoginForm"

export const LoginPage = () => {
  return (
    <main 
    style={{
      backgroundImage: 'url(bg_login.png)',
      backgroundRepeat: 'repeat'
    }}
    className='w-full min-h-screen flex justify-center items-center p-2'>
      <div className='shadow-xl rounded-lg bg-white'>
        <section className='bg-white rounded lg:p-16 md:p-8 p-4'>
          <img src="icon.svg" className='w-10 mb-3 ' />
          <h2 className='font-bold text-2xl mb-1'>Iniciar sesión</h2>
          <p className='mb-6 text-sm'>Entra para poder gestionar citas y servicios</p>
          <LoginForm></LoginForm>
        </section>
      </div>
    </main>
  )
}
