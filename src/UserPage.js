import { React, useState } from 'react';
import UserBar from './UserBar';
function UserPage() {
  const [pass, changePass] = useState('');
  return (
    <div>
      <UserBar />
      <div className="container bg-white shadow border col-4 mt-5 p-4 pt-5">
        <form>
          <div className="form-group">
            <h5>Actualizar contraseña</h5>
            <small className="text-muted">
              Elija una contraseña segura de mínimo 6 caracteres.
            </small>

            {/*   <label for="exampleInputPassword1">Password</label> */}
            <div className="d-flex">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <button className="btn btn-primary " onClick={changePass}>
                Cambiar
              </button>
            </div>
          </div>

          <div className="form-group mt-5">
            <h5>Activar autenticación de dos pasos (2FA)</h5>
            <small className="text-muted">
              Se enviará un correo con un codigo de 6 digitos, el cual será
              requerido para iniciar sesión
            </small>

            {/*   <label for="exampleInputPassword1">Password</label> */}
            {/* <div className="d-flex"> */}
            <button className="btn btn-success w-100 mt-2" onClick={changePass}>
              Activar autenticación en dos pasos
            </button>
            {/*   </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserPage;
