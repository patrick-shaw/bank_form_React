import React from 'react'

const headerStyle = {
    width: '100%',
    height: '50px',
    display: 'flex',
    alignItems: 'center'
}

function Navbar() {
    return (
        <header className="container" style={headerStyle}>
            <nav>
                <div className="title">TotallyMoney</div>
            </nav>
        </header>
    )
}

export default Navbar
