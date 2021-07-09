import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './Products.css';
import AddProduct from './AddProduct';

const GET_PRODUCTS = gql`
    query products {
        products {
            id
            name
            stock
        }
    }
`;

const CREATE_PRODUCT = gql`
    mutation CreateProduct($name: String!) {
        createProduct(name: $name)
    }
`;

const REMOVE_PRODUCT = gql`
    mutation RemoveProduct($id: String!) {
        removeProduct(id: $id)
    }
`;

const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($id: String!) {
        updateProduct(id: $id)
    }
`;

function Products(props) {
    const [showAddProductModal, setShowAddClientModal] = useState(false);
    const { data, loading, error } = useQuery(GET_PRODUCTS);

    const [createProduct] = useMutation(CREATE_PRODUCT);
    const [deleteProduct] = useMutation(REMOVE_PRODUCT);
    const [updateProduct] = useMutation(UPDATE_PRODUCT);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error.message}</p>;
    if (!data) return <p>Not found</p>;

    return (
        <div className="products-page">
            <h3 style={{ textAlign: 'center' }}>CONTROL DE STOCK</h3>
            <div className="table-container">
                <div className="products-table-heads">
                    <div>Modelo</div>
                    <div>ID</div>
                    <div>Herramientas</div>
                </div>
                <div className="table-clients-container">
                    {data?.products.map((product) => (
                        <div key={product.id} className="table-clients">
                            <div className="client-name">{product.name}</div>
                            <div
                                className="client-email"
                                style={{ fontSize: '1.3rem' }}
                            >
                                {product.id}
                            </div>
                            <div className="client-tools">
                                <button
                                    className="delete-client-button"
                                    onClick={() => {
                                        deleteProduct({
                                            variables: { id: product.id },
                                        });
                                        window.location.reload();
                                    }}
                                />
                                <button
                                    className={
                                        product.stock ? 'stock' : 'no-stock'
                                    }
                                    onClick={() => {
                                        updateProduct({
                                            variables: { id: product.id },
                                        });
                                        window.location.reload();
                                    }}
                                >
                                    {product.stock ? (
                                        <div>Stock</div>
                                    ) : (
                                        <div>No Stock</div>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="add-client-button"
                onClick={() => setShowAddClientModal(true)}
                style={{ cursor: 'pointer' }}
            >
                Agregar Producto
            </div>
            {showAddProductModal && (
                <AddProduct
                    createProduct={createProduct}
                    closeModal={() => setShowAddClientModal(false)}
                />
            )}
        </div>
    );
}

export default Products;
