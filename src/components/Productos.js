import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { descargaProductos } from "../redux/productosSlice"
import Producto from "./Producto"

const Productos = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        //EJECUTAMOS CADA VEZ QUE SE CARGUE EL COMPONENTE
        const cargarProductos = () => dispatch(descargaProductos())
        cargarProductos();
    }, [])
    //ACCEDEMOS AL STATE CON USE SELECTOR
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading)

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de productos</h2>

            {error && <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p>}
            {cargando && <p className="font-weight-bold text-center mt-4">Cargando...</p>}

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length <= 0 ? <p className="font-weight-bold mt-4">No hay productos</p> : (
                        productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Productos