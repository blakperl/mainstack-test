import { JSX, useState } from 'react'

function ModalState(props: {
  children: (isVisible: boolean, open: () => void, close: () => void) => JSX.Element
}) {
  const [isVisible, toggleVisibility] = useState(false)

  const open = () => toggleVisibility(true)
  const close = () => toggleVisibility(false)

  return props.children(isVisible, open, close)
}
export default ModalState
