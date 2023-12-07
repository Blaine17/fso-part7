import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''  }
  const showWhenVisble = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className='m-1 p-2 rounded-lg bg-purple-600 hover:bg-purple-400' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisble}>
        {props.children}
        <button className='m-1 p-2 rounded-lg bg-purple-600 hover:bg-purple-400' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable