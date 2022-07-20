import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPreusupuesto from './ControlPreusupuesto'

const Header = ({ 
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto,
    gastos,
    setGastos 
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

        {isValidPresupuesto ? (
            <ControlPreusupuesto 
                presupuesto = {presupuesto}
                setPresupuesto = {setPresupuesto}
                gastos = {gastos}
                setGastos = {setGastos}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />
        ) : (
            <NuevoPresupuesto 
                presupuesto = {presupuesto}
                setPresupuesto = {setPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />
        )}     
    </header>
  )
}

export default Header
