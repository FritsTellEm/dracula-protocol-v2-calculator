import { Divider, Button, Typography, Row } from 'antd'
import React from 'react'

import Logo from '../Logo'
import './index.less'

const { Title } = Typography

const APP_URL = 'https://v2.dracula.sucks/'

export default function Header() {
  return (
    <div className="header">
      <Row align="middle">
        <Logo />
        <Divider type="vertical" />
        <Title
          style={{
            margin: 0,
          }}
        >
          Dracula Protocol V2 - Calculator
        </Title>
      </Row>
      <Button type="primary" href={APP_URL} target="_blank">
        Visit App
      </Button>
    </div>
  )
}
