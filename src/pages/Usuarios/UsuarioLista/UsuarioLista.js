import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './UsuarioLista.module.css';
import Button from '../../../components/Button';


const UsuarioLista = () => {

const [usuarios, setUsuarios] = useState([]);
const [carregando] = useState(true);
const [usuariosFiltrados, setUsuariosFiltrado] = useState([]);
const [termoBusca, setTermoBusca] = useState("");

useEffect(() => {
  fetch(`https://localhost:7171/api/Usuario?nome=sem%20nome&login=sem%20login&tamanho=0&pagina=1`, { 
    method: 'GET', 
    headers: new Headers({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk3MTc4NDEsImV4cCI6MTY1OTcyNTA0MSwiaWF0IjoxNjU5NzE3ODQxfQ.Gcsec8YSdg8_xQeJ0apMlCVtV3MJCMirCJ4AsdSZzoo', 
    'Content-Type': 'application/json',
    }), 
  }).then(response => {
      response.json()
          .then(usuario => {
              console.log(usuario)
              setUsuarios(usuario);
              setUsuariosFiltrado(usuario);
          })
  })
}, [])

useEffect(() => {
  if(termoBusca){
   const listaFiltrada = usuarios.filter((usuario) =>
   usuario.login.toUpperCase().toUpperCase().includes(termoBusca.toUpperCase()) || usuario.nome.toUpperCase().toUpperCase().includes(termoBusca.toUpperCase()) )
    setUsuariosFiltrado(listaFiltrada)      
   }else{
    setUsuariosFiltrado(usuarios)
   }
   }, [termoBusca, usuarios]);

console.log(usuarios, carregando);

if(carregando){
  <p> Carregando ... </p>
}

  return (
  <div className={styles.Container}>
    <div className={styles.NovoUsuario}>
      <h1>Usuários</h1>
      <Link to="/NovoUsuario"><Button variant="contained">Novo Usuário</Button></Link>
    </div>
    <div>
      <input 
      placeholder='  Pesquise pelo nome' 
      className={styles.Input}
        onChange={(event) => {
          setTermoBusca(event.target.value)
        }}
        type='text'
      />
    </div>
    <div>       
    <table border={1} className={styles.tabela}>
          <tr>
            <th className={styles.nivelTitulo}>Nivel</th> 
            <th className={styles.nomeTitulo}>Nome</th>
            <th className={styles.emailTitulo}>Email</th>
            <th className={styles.usuarioTitulo} >Usuário</th>
            <th className={styles.acoesTitulo} >Ações</th>
          </tr>  
    </table> 
        {usuariosFiltrados.length === 0 
          ? 'Nenhum usuário encontrado'
          : usuariosFiltrados.map((usuario) =>                       
        <table border={1} className={styles.tabela}>
          <tr>          
            <td className={styles.nivel}> {usuario.admin === false ? 'Comum' : 'Admin'} </td>
            <td className={styles.nome}>{usuario.nome} </td> 
            <td className={styles.email}>{usuario.email}</td> 
            <td className={styles.login}>{usuario.login}</td>
            <td className={styles.acoes}>icons</td>
          </tr>       
        </table>
        )} 
    </div>
  </div>
  );
};

export default UsuarioLista;
