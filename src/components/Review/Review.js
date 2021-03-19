import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import { Link, Route, Router } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from "react-router-dom";

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)
    let history = useHistory();

    const handleProcceedCheckOut = () =>{
        history.push("/shipment")

        // setCart([])
        // setOrderPlaced(true)
        // processOrder()
    }
    const handleRemoveProduct = (product)=>{
        const newCart = cart.filter(pd => pd.key !== product);
        setCart(newCart);
        removeFromDatabaseCart(product);
        // console.log("clicked", product);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log("this is saved cart", savedCart);
        const productKeys = Object.keys(savedCart);
        // const count = productKeys.map (key => savedCart[key])
        const cartProducts = productKeys.map(keys => {
            const product = fakeData.find(pd => pd.key === keys);
            product.quantity = savedCart[keys]
            return product
        })
        // console.log(cartProducts); 
        setCart(cartProducts);
    }, [])
    let thankyou;;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="Shop-container">
         
         <div className="products-container">
             <p> card added {cart.length}</p>
             {
                 cart.map(pd => <ReviewItem  key={pd.key} handleRemoveProduct={handleRemoveProduct} product={pd}></ReviewItem>)
             }
             {
                 thankyou
             }
         </div>
         <div className="cart-container">
             <Cart cart={cart}>
                 <button onClick={handleProcceedCheckOut} className="btn">Proceed CheckOut</button>
             </Cart>
         </div>
     </div>
 );
};

export default Review;