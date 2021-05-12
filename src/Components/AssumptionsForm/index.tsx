import React, { useState } from 'react'
import { Form, InputNumber, Typography, Row, Tabs, Col, Button } from 'antd'
import Title from 'antd/lib/typography/Title'
import { InputAssumptions } from '../../Utils/types'
import InputPercentage from '../InputPercentage'
import InputCurrency from '../InputCurrency'
import DraculaChan from '../../Resources/dracula-chan.png'

const { Item } = Form
const { Text } = Typography
const { TabPane } = Tabs

interface Props {
  assumptions: InputAssumptions
  onChangeAssumptions: (assumptions: InputAssumptions) => void
}

export default function AssumptionsForm({
  assumptions,
  onChangeAssumptions,
}: Props) {
  const [touched, setTouched] = useState(false)

  const onFinish = (formAssumptions: InputAssumptions) => {
    setTouched(false)
    // Because of the Tabs, not all items are registered: we have to spread the initial assumptions.
    onChangeAssumptions({
      ...assumptions,
      ...formAssumptions,
    })
  }

  return (
    <Row align="bottom">
      <Col xs={24} sm={16}>
        <Form
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          onFieldsChange={() => setTouched(true)}
          scrollToFirstError
          initialValues={assumptions}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Basic" key="1">
              <Row>
                <Col
                  xs={24}
                  sm={{
                    span: 12,
                    offset: 12,
                  }}
                >
                  <Title level={3}>Basic Assumptions</Title>
                </Col>
              </Row>
              <Item
                name="initialPrincipal"
                label={<Text strong>Initial Principal</Text>}
                extra="The total value of LP tokens in USD."
                rules={[
                  {
                    required: true,
                    message: 'Initial Principal is required!',
                  },
                ]}
              >
                <InputCurrency />
              </Item>
              <Item
                name="poolAPY"
                label={<Text strong>Victim Pool APY</Text>}
                extra="The annual percentage yield of the pool."
                rules={[
                  {
                    required: true,
                    message: 'Victim Pool APY is required!',
                  },
                ]}
              >
                <InputPercentage />
              </Item>
              <Item
                name="ETHStrategyAPY"
                label={<Text strong>Compound Strategy APY</Text>}
                extra="The annual percentage yield of the reward compound strategy."
                rules={[
                  {
                    required: true,
                    message: 'Compound Strategy APY is required!',
                  },
                ]}
              >
                <InputPercentage />
              </Item>
              <Item
                name="rewardClaimIntervalDays"
                label={<Text strong>Reward Claim Interval</Text>}
                extra="Amount of days between reward claims for traditional farming strategy. Set to zero (0) to never claim rewards."
                rules={[
                  {
                    required: true,
                    message: 'Reward Claim Interval is required!',
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Item>
              <Item
                name="gasTransactionCost"
                label={<Text strong>Gas Transaction Cost</Text>}
                extra="Average cost of a single transaction in USD."
                rules={[
                  {
                    required: true,
                    message: 'Gas Transaction Cost is required!',
                  },
                ]}
              >
                <InputCurrency />
              </Item>
              <Item
                name="daysAmount"
                label={<Text strong>Amount of Days</Text>}
                extra="The timeframe of the analysis in days."
                rules={[
                  {
                    required: true,
                    message: 'Amount of Days is required!',
                  },
                ]}
              >
                <InputNumber min={0} max={365 * 10} style={{ width: '100%' }} />
              </Item>
            </TabPane>
            <TabPane tab="Advanced" key="2">
              <Row>
                <Col
                  xs={24}
                  sm={{
                    span: 12,
                    offset: 12,
                  }}
                >
                  <Title level={3}>Advanced Assumptions</Title>
                </Col>
              </Row>
              <Item
                label={<Text strong>Deposit Transaction Amount</Text>}
                required
                name="depositTransactionAmount"
                extra="The amount of transactions for a deposit of tokens into victim pool or DRC. Considers the approval transaction."
                rules={[
                  {
                    required: true,
                    message: 'Deposit Transaction Amount is required!',
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Item>
              <Item
                label={<Text strong>Reward Claim Transaction Amount</Text>}
                name="rewardClaimTransactionAmount"
                extra=" The amount of transactions for a claim of reward. For reward from victim pool or DRC (ETH/DRC)."
                rules={[
                  {
                    required: true,
                    message: 'Reward Claim Transaction Amount is required!',
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Item>
              <Item
                label={<Text strong>Swap and Stake Transaction Amount</Text>}
                name="swapAndStakeTransactionAmount"
                rules={[
                  {
                    required: true,
                    message: 'Swap and Stake Transaction Amount is required!',
                  },
                ]}
                extra="The amount of transactions for selling the victim token for ETH and deposit into compounding strategy."
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Item>
              <Item
                label={<Text strong>Dracula Protocol Fee</Text>}
                name="DRCFee"
                rules={[
                  {
                    required: true,
                    message: 'Dracula Protocol Fee is required!',
                  },
                ]}
                extra="The protocol performance fee on the yield earned. This is fixed but could be adjusted with community vote."
              >
                <InputPercentage />
              </Item>
            </TabPane>
          </Tabs>
          <Item wrapperCol={{ xs: { span: 24 }, sm: { span: 12, offset: 12 } }}>
            <Button type="primary" htmlType="submit" disabled={!touched}>
              Submit
            </Button>
          </Item>
        </Form>
      </Col>
      <Col xs={0} sm={8}>
        <img
          src={DraculaChan}
          alt="Dracula Chan"
          style={{ marginBottom: -20, opacity: 0.5 }}
        />
      </Col>
    </Row>
  )
}
