import React from "react";

const Error = ({message}) => {
    const styling = {
        color: 'red',
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

export default Error