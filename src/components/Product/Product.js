import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
const Product = (props) => {
    // console.log(props.product.key)
    const { name, seller, img, price, stock, key } = props.product;
    return (
        <div className="product">

            <div className="product-content">
                <img src={img} alt="" />
            </div>

            <div className="pro">
                <h4><Link to={"/product/" + key}>{name}</Link></h4>
                <br />
                <p>By - {seller}</p>
                <p>Price ${price}</p>
                <p> only {stock} left in stock</p>
                {props.addToCart && <button className="btn" onClick={()=>props.handleAddProduct(props.product)}> add to cart</button>}
            </div>
        </div>
    );
};

export default Product; <h1>this is product</h1>