import React, { useEffect, useState } from 'react';
import styles from './UsuarioLista.module.css';
import EditIcon from '@mui/icons-material/Edit';



const UsuarioLista = () => {

const [usuarios, setUsuarios] = useState([]);
const [carregando, setCarregando] = useState(true);
const [usuariosFiltrados, setUsuariosFiltrado] = useState([]);
const [termoBusca, setTermoBusca] = useState("");

useEffect(() => {
  fetch(`https://localhost:7171/api/Usuario?nome=sem%20nome&login=sem%20login&tamanho=0&pagina=1`, { 
    method: 'GET', 
    headers: new Headers({
    'Authorization': 'Bearer '+('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk1MzYzNTMsImV4cCI6MTY1OTU0MzU1MywiaWF0IjoxNjU5NTM2MzUzfQ.sSamPC1_9DRche_YqAOxaACYcg1ZzgG7GR3igcp-zms'), 
    'Content-Type': 'application/json'
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
   usuario.login.toUpperCase().includes(termoBusca.toUpperCase()))
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
      <button className={styles.Button}>Novo Usuário</button>
    </div>
    <div>
      <input 
      placeholder='Pesquise pelo nome' 
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
            <th className={styles.nivel}>Nivel</th> 
            <th className={styles.nome}>Nome</th>
            <th className={styles.email}>Email</th>
            <th className={styles.acoes} >Ações</th>
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
            <td className={styles.acoes}><EditIcon>Edit</EditIcon></td>
          </tr>       
        </table>
        )} 
    </div>
  </div>
  );
};

export default UsuarioLista;
