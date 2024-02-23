import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { obtenerProductoEditar, obtenerProductoEliminar } from '../redux/productosSlice';
import Swal from 'sweetalert2';

const Producto = ({ producto }) => {

    const { nombre, precio, id } = producto;
    const dispatch = useDispatch();
    const navigate = useNavigate();
//-----ELIMINAR UN PRODUCTO-------
    const handleClickEliminarProducto = (id) => {
        //CONFIRM SI QUEREMOS ELIMINAR
        Swal.fire({
            title: "Estas seguro?",
            text: "Un producto que se elimina, no se puede recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(obtenerProductoEliminar(id))
            }
        });
        
    }
//------EDITAR UN PRODUCTO-------
    const handleClickEditarProducto = (producto) => {
        dispatch(obtenerProductoEditar(producto))
        navigate(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className='font-weight-bold'>$ {precio}</span></td>
            <td>
                <button
                    type='button'
                    onClick={() => {handleClickEditarProducto(producto)}}
                    className='btn btn-primary mr-2'
                >
                    Editar</button>
                <button
                    type='button'
                    onClick={() => { handleClickEliminarProducto(id) }}
                    className='btn btn-danger'
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Producto