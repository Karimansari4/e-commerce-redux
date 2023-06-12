import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem("proCart") || "[]") || [],
    quantity: 0
}

const cartSytem = createSlice({
    name: 'products',
    initialState,
    reducers: {
        AddCart: (state, action) => {

            const find = state.cart.findIndex(item=>item.id === action.payload.id)
            if(find>=0){
                state.cart[find].quantity +=1
                localStorage.setItem("proCart", JSON.stringify(state.cart))
            }else{
                const tempvar = {...action.payload, quantity: 1}

                state.cart.push(tempvar)
                localStorage.setItem("proCart", JSON.stringify(state.cart))
            }
        },
        
        RemoveCart: (state, action) => {
            /* const newCart = state.cart.filter((item) => item.id !== action.payload)
            state.cart.push(newCart) */
            state.cart = state.cart.filter((item) => item.id !== action.payload)
            localStorage.setItem("proCart", state.cart)
        }
    }
})

export const { AddCart, RemoveCart } = cartSytem.actions
export default cartSytem.reducer