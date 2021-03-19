import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0)
    // Math.round(totalPrice)
    let totalPrice =0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        totalPrice =totalPrice + product.price * product.quantity;

    }

    let ShippingCost = 0;
    if(totalPrice> 200){
        ShippingCost = 50;
    }
    else if(totalPrice> 20){
        ShippingCost = 5;
    }
    const formatNumber = num => {
        const precsion = num.toFixed(2);
        return Number(precsion);
    }
    const tax = (totalPrice / 10).toFixed(2);
    const grandTotal = (totalPrice + ShippingCost + Number(tax)).toFixed(2)
    return (
        <div>
            <h2>Order Summery</h2>
            <h3> items added : {cart.length}</h3>
            <p>Shipping Cost : <small>{formatNumber(ShippingCost)}</small></p>
            <p> Tax : {tax}</p>
            <p>total : {grandTotal}</p>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;