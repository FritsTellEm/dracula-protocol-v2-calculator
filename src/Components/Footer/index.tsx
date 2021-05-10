import { Typography } from 'antd'
import React from 'react'

import './index.less'

const { Text } = Typography

export default function Footer() {
  return (
    <footer>
      <Text type="warning">
        <span role="img" aria-label="bat">
          🦇
        </span>{' '}
        This is a community contribution. Use at your own discretion!{' '}
        <span role="img" aria-label="bat">
          🦇
        </span>
      </Text>
    </footer>
  )
}
