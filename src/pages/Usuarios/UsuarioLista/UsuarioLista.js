import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UsuarioLista.module.css';
import { RiPencilFill } from 'react-icons/ri';
import { Checkbox, Button } from '@mui/material';

const UsuarioLista = () => {

  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [carregando] = useState(true);
  const [usuariosFiltrados, setUsuariosFiltrado] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    //var token = localStorage.getItem('token');
    fetch(`https://localhost:7171/api/Usuario?nome=sem%20nome&login=sem%20login&tamanho=0&pagina=1`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    }).then(response => {
      response.json()
        .then(usuario => {
          // console.log(usuario);
          setUsuarios(usuario);
          setUsuariosFiltrado(usuario);
        })
    })
  }, [])

  useEffect(() => {
    if (termoBusca) {
      const listaFiltrada = usuarios.filter((usuario) =>
        usuario.login.toUpperCase().toUpperCase().includes(termoBusca.toUpperCase()) || usuario.nome.toUpperCase().toUpperCase().includes(termoBusca.toUpperCase()))
      setUsuariosFiltrado(listaFiltrada)
    } else {
      setUsuariosFiltrado(usuarios)
    }
  }, [termoBusca, usuarios]);

  // console.log(usuarios, carregando);

  if (carregando) {
    <p> Carregando ... </p>
  }

  return (
    <div className={styles.Container}>
      <div className={styles.NovoUsuario}>
        <h1>Usuários</h1>
        <Link to='/NovoUsuario' >
          <button className={styles.Button}>Novo Usuário</button>
        </Link>
      </div>
      <div>
        <input
          placeholder='  Pesquise pelo nome ou usuário'
          className={styles.Input}
          onChange={(event) => {
            setTermoBusca(event.target.value)
          }}
          type='text'
        />
      </div>
      <div>
        <table className={styles.tabela}>
          <tr>
            <th className={styles.nivelTitulo}>Nivel</th>
            <th className={styles.nomeTitulo}>Nome</th>
            <th className={styles.emailTitulo}>Email</th>
            <th className={styles.usuarioTitulo}>Usuário</th>
            <th className={styles.ativoTitulo}>Ativo?</th>
            <th className={styles.acoesTitulo}>Ações</th>
          </tr>
        </table>
        {usuariosFiltrados.length === 0
          ? 'Nenhum usuário encontrado'
          : usuariosFiltrados.map((usuario) =>
            <table className={styles.tabela}>
              <tr>
                <td className={styles.nivel}>{usuario.admin ? 'Admin' : 'Comum'}</td>
                <td className={styles.nome}>{usuario.nome}</td>
                <td className={styles.email}>{usuario.email}</td>
                <td className={styles.usuario}>{usuario.login}</td>
                <td className={styles.ativo}><Checkbox checked={usuario.ativo} disabled></Checkbox></td>
                <td className={styles.acoes}>
                  <Button onClick={() => {navigate(`/UsuariosEditar/${usuario.id}/${usuario.nome}/${usuario.email}/${usuario.login}/${usuario.admin}/${usuario.ativo}`)}}>
                    <RiPencilFill size={20} />
                  </Button>
                </td>
              </tr>
            </table>
          )}
      </div>
    </div>
  );
};

export default UsuarioLista;
