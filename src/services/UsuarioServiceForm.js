import axios from "axios";
import { toast } from 'react-toastify';

export const setNovoUsuario = async (usuario) => {
  try {
    // Envia uma requisição post
    // console.log(usuario)
    const response = await axios({
      method: "post",
      url: "https://localhost:7171/api/Usuario",
      headers: {
        Authorization:`bearer ${localStorage.getItem('token')}`
      },
      data: usuario,
    });

    if(response.status === 201){ 
      toast.success("Usuário cadastrado com sucesso!")
    }
    return response;
    //return response.status;
  } catch (err) {
    //console.log("O erro esta aqui: ",err.response.data);
    toast.error(err.response.data)
  }
};

export const setAlteraUsuario = async (userObj) => {
  try {
    const response = await fetch(`https://localhost:7171/api/Usuario`, {
      method: 'PATCH',
      body: JSON.stringify(userObj),
      headers: new Headers({
        'Authorization': `bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    });

    if(response.status === 200 || response.status === 204){ 
      toast.success("Usuário Alterado com sucesso!")
    }
    if(response.status === 400){ 
      toast.warn("Ops... O e-mail ou o Login já está(ão) em uso.")
    }
    return response;
  } catch (err) {
    toast.error(err)
    console.log("Erro: ", err);
  }
};