import React from 'react'
import styled from 'styled-components'
import Card from '../styles/Card'
import Signout from '../Signout'

const SignoutDiv = styled.div`
  margin-top: 2rem;
  border-radius: 5px;
`

function MyStudioCard({ studio }) {
  return (
    <Card>
      <h2>My Studio</h2>
      <p>{studio.studioName}</p>
      <SignoutDiv>
        <Signout />
      </SignoutDiv>
    </Card>
  )
}

export default MyStudioCard
