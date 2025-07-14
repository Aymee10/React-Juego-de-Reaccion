import React from 'react'
import './Boton.css'

const Boton = ({textB,onClick,color='blue'}) => {
    
  return (
   <button className="boton" onClick={onClick} style={{backgroundColor:color}}  > {textB}</button>
  )
}

export default Boton