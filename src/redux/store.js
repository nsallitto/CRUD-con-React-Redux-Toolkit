import { configureStore } from "@reduxjs/toolkit";
import { productosSlice } from "./productosSlice";
import { alertaSlice } from "./alertaSlice";

export const store = configureStore({
    reducer: {
        productos: productosSlice.reducer,
        alerta: alertaSlice.reducer
    }
})