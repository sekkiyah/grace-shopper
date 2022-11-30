import React, {useState} from 'react';
import {deleteProductFromCart, updateProductQuantityInCart, addOrCreateUsersOrderHistory} from '../api'


export const increaseQuantity = async (token, user, productId) => {
    const {id, userCart} = user

    try {
        const newQuantity = userCart.map(item => {
            if (item.id === productId) {
                const updateQuantity = item.quantity + 1
                return updateQuantity
            }
        })
        console.log ('new increased quantity: ', newQuantity)
        const resp = await updateProductQuantityInCart(token, id, productId, [newQuantity])
        if (resp) {
            navigate('/cart')
        }
        } catch (error) {
        console.error('error, unable to increase quantity to users cart')
    }
}

export const decreaseQuantity = async (user, productId) => {
    const {id, userCart} = user

    try {
        const newQuantity = userCart.map(item => {
            if (item.id === productId) {
                const updateQuantity = item.quantity - 1
                return updateQuantity
            }
        })
        if (![newQuantity]) {
            deleteProductFromCart(token, id, productId)
        } else {
         console.log ('new decreased quantity: ', newQuantity)
         const resp = await updateProductQuantityInCart(token, id, productId, [newQuantity])
         if (resp) {
            navigate('/cart')
         }
        }
        } catch (error) {
        console.error('error, unable to decrease quantity to users cart')
    }
}
  
  


