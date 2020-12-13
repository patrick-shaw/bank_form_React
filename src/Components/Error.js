import React from 'react'

const errorStyle = {
    position: 'absolute',
    bottom: '-20px',
    left: '0',
    color: 'red',
    fontSize: '12px'
}

function Error({ error }) {
    return (
        <>
            <p style={error !== 'empty' ? errorStyle : { display: 'none' }}>{error}</p>
        </>
    )
}

export default Error
