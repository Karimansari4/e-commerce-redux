import { configureStore } from '@reduxjs/toolkit'
import cartSystem from './redux/cartSystem'

const store = configureStore({
    reducer: {
        products: cartSystem
    }
})
export default store