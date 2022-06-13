import React from "react";

const Success = ({message}) => {
    const styling = {
        color: 'green',
        background: 'lightgrey',
        fontStyle: 'normal',
        fontSize: 30,
        borderStyle: 'solid',
        borderRadius: '5',
        padding: '10',
        marginBottom: '10'
    }
    if (message === null) {
        return null
    }

    return (
        <div style={styling}>
            {message} 
        </div>
        
    )
}

export default Success