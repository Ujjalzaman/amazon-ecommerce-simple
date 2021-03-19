import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

import './Shop.css';
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10)
    const [cart , setCart] = useState([])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previescart = productKeys.map(exitingKey =>{
            const product = fakeData.find(pd=> pd.key === exitingKey)
            product.quantity = savedCart[exitingKey]
            return product;
            
            // console.log(exitingKey, savedCart[exitingKey])
        })
        console.log(previescart);
        setCart(previescart);
    }, [])

    const handleAddProduct = (product) =>{
        const toBeaddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key !== toBeaddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !==toBeaddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        // const newCart = [...cart, product]
        setCart(newCart)
        // const sameProduct = newCart.filter(pd => pd.key === product.key)
        // const count = sameProduct.length
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className = "Shop-container">
            <div className="products-container">
                
                {
                    products.map(pro => <Product key={pro.key} product={pro} addToCart ={true} handleAddProduct={handleAddProduct}></Product>)
                }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="btn">Review</button></Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;