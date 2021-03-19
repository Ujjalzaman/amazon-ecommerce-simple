import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const{productKey} = useParams()
    const product = fakeData.find(pd => pd.key === productKey)
    // console.log(product);
    // product.map()
    return (
        <div>
            <h1>{productKey} detail comming soon</h1>
            <Product addToCart ={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;