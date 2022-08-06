import axios from "axios";
import {toast } from 'react-toastify';

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

    return response;
  } catch (err) {
    console.log("O erro esta aqui: ",err.response.data);
    toast(err.response.data)
  }
};
