import React from 'react'

import './index.less'

interface Props {
  children: React.ReactNode
}

export default function PageWindow({ children }: Props) {
  return <div className="page-window">{children}</div>
}
