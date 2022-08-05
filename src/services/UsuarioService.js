import axios from "axios";

export const setNovoUsuario = async (usuario) => {
  try {
    // Envia uma requisição post
    // console.log(usuario)
    const response = await axios({
      method: "post",
      url: "https://localhost:7171/api/Usuario",
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk3MTgxOTksImV4cCI6MTY1OTcyNTM5OSwiaWF0IjoxNjU5NzE4MTk5fQ.4AIWrBBi7lO0RhLFr0BOU02w3E8ey4JIGBVTTBW1Mt8",
          // 'Content-Type': 'application/json'
      },
      data: usuario,
    });

    if (response.status === 400) {
      response.message =
        "Já existe um cadastro de usuário. Tente novamente.";
    }
    return response;

  } catch (err) {
    console.log("O erro esta aqui: ",err.response.data);
  }
};
