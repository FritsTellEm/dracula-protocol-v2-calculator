import { Typography, Row, Col, Divider } from 'antd'
import React from 'react'
import Draccie from '../../Resources/draccie-grinning.png'

const { Title, Text } = Typography

export default function Considerations() {
  return (
    <Row align="middle" gutter={[12, 0]}>
      <Col xs={0} sm={8}>
        <img
          src={Draccie}
          alt="Draccie grinning"
          style={{ marginBottom: -20, opacity: 0.5, float: 'right' }}
        />
      </Col>
      <Col xs={24} sm={16}>
        <Title level={3}>Considerations</Title>
        <Text>
          Please consider the below points when interpreting the results of this
          calculator. We aim to compare traditional farming strategies with
          Dracula Protocol strategies to give you an idea of the pros and cons.
          However, real-world uncertainties make it impossible to calculate
          exact profit values.
        </Text>
        <Divider />
        <ul>
          <li>
            The <strong>initial principal</strong> remains equal for the
            duration of the analysis. This is not true in reality for multiple
            reasons:
            <ol>
              <li>
                The price volatility of the underlying assets of the liquidity
                pair.
              </li>
              <li>
                The appreciation of the LP tokens because of transaction fees.
              </li>
            </ol>
          </li>
          <li>
            The appreciation of the <strong>victim reward token</strong>{' '}
            compared to Ether ($ETH). The calculator assumes that the victim
            token appreciates equally in value. However, by not claiming rewards
            you are exposed to the price volatility of the victim token: which
            increases risk.
          </li>
          <li>
            <strong>Gas transaction costs</strong> fluctuate. This
            implementation assumes fixed gas price for the entire farming
            duration.
          </li>
          <li>
            With traditional farming in a single pool you will have a single,
            fluctuating, APR. With Dracula Protocol you are exposed to the{' '}
            <strong>weighted average APR of all the pools</strong>. You receive
            rewards based on your part of the total value locked in the
            platform.
          </li>
        </ul>
      </Col>
    </Row>
  )
}
