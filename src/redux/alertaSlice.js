import { createSlice } from "@reduxjs/toolkit";

export const alertaSlice = createSlice({
    name: "alerta",
    initialState: {
        alerta: null
    },
    reducers: {
        mostrarAlerta: (state, action) => {
            state.alerta = action.payload
        },
        quitarAlerta: (state,action) => {
            state.alerta = null
        }
    }
})
//------ACTIONS------//
export const {
    mostrarAlerta,
    quitarAlerta
} = alertaSlice.actions
//-------------------//
export const mostrarAlertaAction = (alerta) => {
    return (dispatch) => {
        dispatch(mostrarAlerta(alerta))
    }
}
export const quitarAlertaAction = () => {
    return (dispatch) => {
        dispatch(quitarAlerta())
    }
}