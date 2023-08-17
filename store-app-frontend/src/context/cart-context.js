import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const existingProduct = cartItems.find(item => item.id === product.id);
    
        if (existingProduct) {
            alert("The product already exists in your cart!");
            return;
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };
    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
    };

    const updateQuantity = (id, quantity) =>{
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: quantity };
            }
            return item;
        });

        setCartItems(updatedCartItems);
    }

    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
};
