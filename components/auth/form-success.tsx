import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

interface Props{
    message?: string
}

const FormSuccess = ({message}: Props) => {
  if (!message) return null;

  return (
    <div className='bg-emerald-200 p-3 rounded-md flex item-center gap-x-3 text-sm text-emerald-500'>
        <FaCheckCircle className='h-4 w-4'/>
        <p>{message}</p>
    </div>
  )
}

export default FormSuccess
