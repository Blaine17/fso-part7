import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetInput = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    resetInput
  }

}

export const useAnotherHook = () => {
  useField
}