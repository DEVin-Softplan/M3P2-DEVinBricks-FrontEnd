import style from "./UsuariosLista";
import Header from "../../../components/Header/Header";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

const UsuariosLista = (props) => {
  return (
    <section className={style.section}>
      <header className={style.header}>
        <div className={style.firstDivHeader}>
          <Header title="Novo usuario" />
          <Link to="/NovoUsuario">
            <Button>Novo Usuario</Button>
          </Link>
        </div>
      </header>
    </section>
  );
};

export default UsuariosLista;