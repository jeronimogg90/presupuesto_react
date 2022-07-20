import React from 'react'
import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPreusupuesto = ({
    presupuesto, 
    setPresupuesto, 
    gastos, 
    setGastos,
    setIsValidPresupuesto
}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100)
            .toFixed(2);

        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setTimeout( () => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500)
    }, [gastos])

    const formatearCantidad = (Cantidad) => {
        return Cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm("¿Desea reiniciar presupuesto oy gastos?")
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }


  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
          <CircularProgressbar
                styles = { buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                    trailColor : '#f5f5f5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                    
                })}
                value = {porcentaje}
                text = {`${porcentaje}% Gastado`}
          />
      </div>
      <div className='contenido-presupuesto'>
          <button 
            className='reset-app' 
            type="button"
            onClick={handleResetApp}
            >
              Resetear App
          </button>
          <p>
              <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
          </p>

          <p className={`${disponible < 0 ? 'negativo' : '' }`}>
              <span>Disponible: </span> {formatearCantidad(disponible)}
          </p>

          <p>
              <span>Gastado: </span> {formatearCantidad(gastado)}
          </p>
      </div>
    </div>
  )
}

export default ControlPreusupuesto
