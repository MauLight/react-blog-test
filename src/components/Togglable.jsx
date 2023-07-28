/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

export const Togglable = forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
        <button id='open' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className="togglableContent" style={showWhenVisible}>
        {props.children}
        <button className='mt-5' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}