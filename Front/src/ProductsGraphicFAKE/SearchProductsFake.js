import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const QUERY_SEARCH_PRODUCT = gql`
    query Product($name: String) {
        product(name: $name) {
            id
            company
            price
            stock
            sizes
        }
    }
`;

function SearchProducts() {
    const [productSearch, setProductSearch] = useState('');

    const [searchProduct, { data, loading, error }] = useLazyQuery(
        QUERY_SEARCH_PRODUCT,
        { variables: { name: productSearch } }
    );
    return (
        <div className="search">
            <div className="inputs">
                <input
                    type="text"
                    placeholder="Ej: T-Shirt..."
                    onChange={(event) => {
                        setProductSearch(event.target.value);
                    }}
                />
                <button onClick={(e) => searchProduct() && e.preventDefault()}>
                    Busca Producto
                </button>
            </div>

            <div className="searchCountry">
                {loading && <h3> Cargando...</h3>}
                {error && <h3> {error.message} </h3>}
                {data &&
                    data.product.map((product, key) => {
                        return (
                            <div key={key} className="country">
                                <label>{product.company}</label>
                                <label>{product.stock}</label>
                                <label>{product.sizes}</label>
                                <label>€{product.price}</label>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default SearchProducts;
