import React, { Component } from 'react'
import styled from 'styled-components'
import Card from '../styles/Card'
import ConfirmRequest from './ConfirmRequest'

const CardStyle = styled(Card)`
  li {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

const RequestCard = ({ request }) => {
  return (
    <CardStyle>
      <p>
        {request.parent.firstName} requests for {request.dancer.firstName} to be
        enrolled in:
      </p>
      <p>{request.classRequested.name}</p>
      <ConfirmRequest request={request} />
    </CardStyle>
  )
}

export default RequestCard
