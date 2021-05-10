import React from 'react'

import logo from '../../Resources/dracula-protocol-logo.webp'

interface Props {
  size?: number
}

export default function Logo({ size = 50 }: Props) {
  return (
    <img
      src={logo}
      alt="Dracula Protocol Logo"
      style={{
        width: size,
        height: size,
      }}
    />
  )
}
