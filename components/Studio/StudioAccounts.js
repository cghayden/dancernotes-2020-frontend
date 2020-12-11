import React from 'react'
import Card from '../styles/Card'
function StudioAccounts({ parents }) {
  return (
    <div>
      {parents.map((parent) => (
        <Card key={parent.id}>
          <h3>
            {parent.firstName} {parent.lastName}
          </h3>
          <h4>Dancers:</h4>
          {parent.dancers.map((dancer) => (
            <p key={dancer.firstName}>{dancer.firstName}</p>
          ))}
        </Card>
      ))}
    </div>
  )
}

export default StudioAccounts
