import React, { useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'

type PortalPropTypes = {
  parent?: HTMLElement
  children?: React.ReactNode
  className?: string
}

const Portal: React.FC<PortalPropTypes> = ({ children, parent, className }) => {
  const element = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    const target = parent ? parent : document.body

    const classNames = []
    className && classNames.push(className)

    element.classList.add(...classNames)
    target.appendChild(element)

    return () => {
      target.removeChild(element)
    }
  }, [element, parent, className])

  return ReactDOM.createPortal(children, element)
}

Portal.defaultProps = {
  className: '',
}

export default Portal
