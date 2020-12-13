import React, { useState } from 'react'

function Card({ card, color, selected, setSelected }) {

    const [isSelected, setIsSelected] = useState(false);

    const cardStyle = {
        background: color
    }

    const selectCard = (e) => {
        if (isSelected) {
            e.target.previousElementSibling.style.display = 'none';
            const newSelected = selected.filter(item => JSON.stringify(item) !== JSON.stringify(card))
            setSelected(newSelected);
            setIsSelected(false);
        } else {
            e.target.previousElementSibling.style.display = 'block';
            setSelected([...selected, card]);
            setIsSelected(true);
        }
    }

    // MOUSE OVER CARD HIGHLIGHT
    const cardEnter = (e) => {
        if (!isSelected) {
            e.target.nextElementSibling.style.display = 'block';
        }
    }

    // REMOVE HIGHLIGHT
    const cardLeave = (e) => {
        e.target.nextElementSibling.style.display = 'none';
    }

    return (
        <div className="card" style={cardStyle}>
            <div>
                <div className="card-image"></div>
                <div className="card-text">
                    <h2>{card.name}</h2>
                    <div className="card-subtext">
                        <h3>Apr: {card.apr}</h3>
                        <h3>Balance Transfer Offer Duration: {card.balance_transfer_offer_duration_months} months</h3>
                        <h3>Purchase Offer Duration: {card.purchase_offer_duration_months} months</h3>
                        <h3>Credit Available: £{card.credit_available_pounds}</h3>
                    </div>
                </div>
                <div className="card-background select"></div>
                <div className="card-click-panel" onClick={selectCard} onMouseEnter={cardEnter} onMouseLeave={cardLeave}></div>
                <div className="card-background hover"> </div>
            </div>
        </div>
    )
}

export default Card
