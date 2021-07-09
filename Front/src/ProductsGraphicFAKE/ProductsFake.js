import React from 'react';
import { useQuery, gql } from '@apollo/client';
import SearchProducts from './SearchProductsFake';

const QUERY_LIST_OF_PRODUCTS = gql`
    {
        products {
            id
            name
            company
            price
        }
    }
`;

function ProductsFake(props) {
    const { data, loading, error } = useQuery(QUERY_LIST_OF_PRODUCTS);

    return (
        <>
            <div className="listOfproducts">
                {loading && <h3> Cargando...</h3>}
                {error && <h3> {error.message} </h3>}
                {data?.products.map((product, key) => {
                    return (
                        <div key={key} className="product">
                            {product.name}
                            <label>{product.company}</label>
                            <label>€{product.price}</label>
                        </div>
                    );
                })}
            </div>
            <div className="title">
                <SearchProducts />
            </div>
        </>
    );
}

export default ProductsFake;
