import React, { useState } from 'react';

function AddProduct({ createProduct, closeModal }) {
    const [input, setInput] = useState('');

    return (
        <div className="modal-bg" onClick={closeModal}>
            <div className="modal-fg" onClick={(e) => e.stopPropagation()}>
                <div className="login">
                    <h1>Modelo del Producto</h1>
                    <form
                        className="login-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (input) {
                                createProduct({
                                    variables: { name: input },
                                });
                                setInput('');
                                window.location.reload();
                                closeModal();
                            }
                        }}
                    >
                        <input
                            type="name"
                            placeholder="Modelo"
                            onChange={(e) => setInput(e.target.value)}
                            maxlength="37"
                        ></input>

                        <button className="button-login" type="submit">
                            Cargar Producto
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
