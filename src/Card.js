import React, { Component } from 'react'
import './Card.scss'

class Card extends Component {
    componentDidMount() {
        let angle = ~~(Math.random() * 90 - 45)
        let xPos = ~~(Math.random() * 40 - 20)
        let yPos = ~~(Math.random() * 40 - 20)
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`
    }
    render() {
        return (
            <img style={{transform: this._transform}} className="Card" src={this.props.imgUrl} alt={this.props.altTag} />
        )
    }
}

export default Card