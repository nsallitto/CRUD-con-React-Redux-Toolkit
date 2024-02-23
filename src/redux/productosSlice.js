import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from 'sweetalert2'

export const productosSlice = createSlice({
    name: "productos",
    initialState: {
        productos: [],
        error: false,
        loading: false,
        productoEditar: null
    },
    reducers: {
        //-----------REDUCERS PARA AGREGAR PRODUCTOS-----------//
        agregarProducto: (state, action) => {
            state.loading = true;
        },
        agregarProducto_Exito: (state, action) => {
            state.loading = false;
            state.productos.push(action.payload);
        },
        agregarProducto_Error: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        //-----------REDUCERS PARA CARGAR LOS PRODUCTOS-----------//
        cargarProductos: (state, action) => {
            state.loading = true;
        },
        cargarProductos_Exito: (state, action) => {
            state.loading = false;
            state.productos = action.payload
        },
        cargarProductos_Error: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        //-----------REDUCERS PARA ELIMINAR LOS PRODUCTOS---------//
        eliminarProducto: (state, action) => {
            state.loading = true;
        },
        eliminarProducto_Exito: (state, action) => {
            state.productos = state.productos.filter((productoState) =>
                productoState.id !== action.payload
            );
            state.loading = false;
        },
        eliminarProducto_Error: (state, action) => {
            state.error = true;
            state.loading = false;
        },
        //-----------REDUCERS PARA EDITAR LOS PRODUCTOS---------//
        editarProducto: (state, action) => {
            state.loading = true;
            state.productoEditar = action.payload;
        },
        guardarProductoEditado: (state, action) => {
            state.loading = false;
            state.productos.map(producto => 
                    producto.id === action.payload.id ? producto = action.payload : producto
                )

            
        },
        guardarProductoEditado_Error: (state,action) => {
            state.loading = false;
        }

    }
})
//------ACTIONS------//
export const {
    agregarProducto,
    agregarProducto_Exito,
    agregarProducto_Error,
    cargarProductos,
    cargarProductos_Exito,
    cargarProductos_Error,
    eliminarProducto,
    eliminarProducto_Exito,
    eliminarProducto_Error,
    editarProducto,
    guardarProductoEditado,
    guardarProductoEditado_Error
} = productosSlice.actions;

//-------------------------------------  THUNKS  ------------------------------------------//
// FC QUE AGREGA PRODUCTOS
export const nuevoProducto = (producto) => {
    return async (dispatch, getState) => {
        dispatch(agregarProducto(producto));
        try {
            //Insertamos en la base de datos
            await axios.post("http://localhost:4000/productos", producto);
            //Actualizamos el state
            dispatch(agregarProducto_Exito(producto))
            //Mostramos una alerta correcto
            Swal.fire({
                title: "Correcto!",
                text: "El producto se agrego correctamente",
                icon: "success"
            });
        } catch (error) {
            dispatch(agregarProducto_Error(producto))
            //Mostramos alerta error
            Swal.fire({
                title: "Error!",
                text: "Hubo un error, intenta de nuevo",
                icon: "error"
            });
        }
    }
}
// FC QUE CARGA Y MUESTRA PRODUCTOS
export const descargaProductos = () => {
    return async (dispatch) => {
        dispatch(cargarProductos())

        try {
            //consultamos base de datos
            const { data } = await axios.get("http://localhost:4000/productos")
            dispatch(cargarProductos_Exito(data))
        } catch (error) {
            console.log(error);
            dispatch(cargarProductos_Error())
        }
    }
}
//FC QUE ELIMINA UN PRODUCTO
export const obtenerProductoEliminar = (id) => {
    return async (dispatch) => {
        dispatch(eliminarProducto(id))
        try {
            await axios.delete(`http://localhost:4000/productos/${id}`)
            dispatch(eliminarProducto_Exito(id))
            //ALERTA CONFIRMACION ELIMINADO
            Swal.fire({
                title: "Eliminado!",
                text: "El producto ha sido eliminado.",
                icon: "success"
            });
        } catch (error) {
            console.log(error);
            dispatch(eliminarProducto_Error())
        }
    }
}
//FC QUE EDITA UN PRODUCTO
export const obtenerProductoEditar = (producto) => {
    return async (dispatch) => {
        dispatch(editarProducto(producto))
    }
}
export const guardarProductoEditadoAction = (producto) => {
    return async (dispatch) => {
        try {
            await axios.put(`http://localhost:4000/productos/${producto.id}`, producto)
            //Actualizamos el state
            dispatch(guardarProductoEditado(producto))
            //Mostramos una alerta correcto
            Swal.fire({
                title: "Modificado!",
                text: "El producto se modifico correctamente",
                icon: "success"
            });
        } catch (error) {
            dispatch(guardarProductoEditado_Error())
        }
    }
}