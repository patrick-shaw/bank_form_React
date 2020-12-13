import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

function Cards({ cards, customer, cardModal, setModal }) {

    // SET CARD MODAL WIDTH
    const cardRowLength = {
        gridTemplateColumns: `repeat(${cards.length}, 1fr)`
    }

    const node = useRef();

    const [cardsSelected, setCardsSelected] = useState(cards);

    // CLICK OFF MODAL EVENT
    useEffect(() => {
        const clickOutsideModal = e => {
            if (node.current.contains(e.target)) {
                return;
            }
            // outside click
            setModal(false);
        };
        document.addEventListener("mousedown", clickOutsideModal);
        return () => {
            document.removeEventListener("mousedown", clickOutsideModal);
        };
    }, []);

    // SELECT COLOURS FOR INDIVIDUAL CARDS
    const cardColors = ['#0E0A39', '#180F63', '#1E4B6D']

    const totalCredit = cardsSelected.map(card => card.credit_available_pounds);

    return (
        <div className="card-modal" style={cardModal ? { display: 'block' } : { display: 'none' }}>
            <section className="card-container" ref={node}>
                <h1>Great stuff, {customer.first_name}!<br />Here's what's available to you:</h1>
                <div className="card-row" style={cardRowLength}>
                    {cards.map((card, i) => {
                        return <Card key={i} card={card} color={cardColors[i]} selected={cardsSelected} setSelected={setCardsSelected} />
                    })}
                </div>
                <h2 className="total-credit">Total credit: £{totalCredit.length > 0 ? totalCredit.reduce((a, b) => a + b) : '0'}<span onClick={() => setModal(false)}>Retake</span></h2>
            </section>
        </div>

    )
}

export default Cards
