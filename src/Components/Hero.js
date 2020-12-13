import React from 'react';
import cardImage from '../Images/creditcards-hero.png';

function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-info">
                    <h2 className="title">We have a range of services to help you</h2>
                    <h3 className="text">Find out which cards you're eligible for.</h3>
                    <h5>No harm to your credit rating<br />Free forever</h5>
                </div>
                <div className="hero-image">
                    <img src={cardImage} alt="cartoon cards" />
                </div>
            </div>

        </section>
    )
}

export default Hero
