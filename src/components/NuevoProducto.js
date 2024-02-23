import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nuevoProducto } from "../redux/productosSlice";
import { mostrarAlertaAction, quitarAlertaAction } from "../redux/alertaSlice";

const NuevoProducto = () => {

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);

    const dispatch = useDispatch();
    const { error, loading } = useSelector(state => state.productos);
    const alerta = useSelector(state => state.alerta.alerta);
    const navigate = useNavigate();

    const handleSubmitNuevoProducto = (e) => {
        e.preventDefault();
        //validar formulario
        if (nombre.trim() === "" || precio <= 0) {
            const alerta = {
                msg:"Todos los campos son obligatorios",
                classes:"alert alert-danger text-center text-uppercase p3"
            }
            dispatch(mostrarAlertaAction(alerta))
            return;
        }
        //Si todo va bien
        dispatch(quitarAlertaAction())
        //Crear nuevo producto
        dispatch(nuevoProducto({
            nombre,
            precio,
        }))
        //redireccionamos a la pag principal
        setTimeout(() => {
            navigate("/")
        }, 3000);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agrega Nuevo Producto
                        </h2>

                        { alerta && <p className={alerta.classes}>{alerta.msg}</p> }

                        <form
                            onSubmit={handleSubmitNuevoProducto}
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
                                    onChange={(e) => { setPrecio(+e.target.value) }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-4"
                            >
                                Agregar
                            </button>
                        </form>

                        {loading ? (
                            <div className="spinner">
                                <div className="double-bounce1"></div>
                                <div className="double-bounce2"></div>
                            </div>
                        ) : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProducto