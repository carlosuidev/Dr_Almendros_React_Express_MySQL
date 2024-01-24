import React, { useState } from 'react'

export const Componente = () => {
  const [contador, setContador] = useState(0)
  return (
    <div>{contador}</div>
  )
}
