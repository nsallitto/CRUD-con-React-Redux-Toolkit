import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { guardarProductoEditadoAction } from "../redux/productosSlice";
import { mostrarAlertaAction, quitarAlertaAction } from "../redux/alertaSlice";

const EditarProducto = () => {

    //PRODUCTO A EDITAR
    const producto = useSelector(state => state.productos.productoEditar);
    const alerta = useSelector(state => state.alerta.alerta)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //DEFINIMOS NUEVOS STATES
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);

    //LLENAR EL STATE AUTOMATICAMENTE
    useEffect(() => {
        setNombre(producto.nombre)
        setPrecio(producto.precio)
    }, [producto])

    const handleSubmitEditarProducto = (e) => {
        e.preventDefault();

        //validar formulario
        if (nombre.trim() === "" || precio <= 0) {
            const alerta = {
                    msg:"Todos los campos son obligatorios",
                    classes:"alert alert-danger text-center text-uppercase p3"
            }
            dispatch(mostrarAlertaAction(alerta))
            return
        }
        dispatch(quitarAlertaAction())
        dispatch(guardarProductoEditadoAction({
            nombre,
            precio,
            id: producto.id
        }))
        setTimeout(() => {
            navigate("/")
        }, 2500);

    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        { alerta && <p className={alerta.classes}>{alerta.msg}</p> }

                        <form
                            onSubmit={handleSubmitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={(e) => { setNombre(e.target.value) }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={(e) => { setPrecio(e.target.value) }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-4"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarProducto