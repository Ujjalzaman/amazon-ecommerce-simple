import React from 'react';

const ReviewItem = (props) => {
    // console.log(props.product)
    const {name, quantity, key, price} = props.product;
    const revieStyle = {
        borderBottom : '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'

    }
    return (
        <div style={revieStyle}>
            <h4>{name}</h4>
            <p> Quantity : {quantity}</p>
            <p>price :<small>$ {price}</small></p>
            <button className="btn"
                onClick={() => props.handleRemoveProduct(key)}
            >Remove Item</button>
            
        </div>
    );
};

export default ReviewItem;