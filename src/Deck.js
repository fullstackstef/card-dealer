import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import './Deck.scss'
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/'

class Deck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            drawn: [],
            errorMsg: ''
        }
        this.getCard = this.getCard.bind(this)
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`)
        this.setState({ deck: deck.data})
    }
    async getCard() {
        let deckId = this.state.deck.deck_id
        try {
            let cardUrl = `${API_BASE_URL}/${deckId}/draw/`
            let cardRes = await axios.get(cardUrl)
            if(!cardRes.data.success) {
                throw new Error('No cards remaining')
            }
            let card = cardRes.data.cards[0]
            this.setState(st => ({
                drawn: [
                    ...st.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        cardName: `${card.value} of ${card.suit}`
                    }
                ]
            }))
        } catch(err) {
            this.setState({ errorMsg: err.message})
        }
    }
    render() {
        const card = this.state.drawn.map((card, idx) => <Card key={card.id} imgUrl={card.image} altTag={card.cardName} />)
        return (
            <div className="Deck">
                <h1 className="Deck-title"><span role="img" aria-label="diamond">♦️</span>CARD DEALER<span role="img" aria-label="diamond">♦️</span></h1>
                <button className="Deck-btn" onClick={this.getCard}>DEAL ME A CARD</button>
                { this.state.errorMsg ? <p className="Deck-error">{this.state.errorMsg}</p> : (
                    <div className="Deck-cardarea">
                        {card}
                    </div>
                )}
            </div>
        )
    }
}

export default Deck