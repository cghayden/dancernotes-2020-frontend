import React, { Component } from 'react'
import Card from '../../styles/Card'

export default class SoloDuoTrioSubscribe extends Component {
  render() {
    const { dancer, dance } = this.props
    return (
      <Card>
        <p>
          {dancer.firstName} is enrolled in a {dance.size} named {dance.name}
        </p>
        <p>Would you like to subscribe to this dance?</p>
        <button>Yes</button>
        <button>Not Right Now</button>
      </Card>
    )
  }
}
