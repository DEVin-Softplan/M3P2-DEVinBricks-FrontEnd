import axios from "axios";
// export const getUsuariosPost = async () => {
//   try {
//     const response = await fetch(`https://localhost:7171/api/Usuario`, {
//       headers: {
//         Authorization:
//           "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk2NTgzNjMsImV4cCI6MTY1OTY2NTU2MywiaWF0IjoxNjU5NjU4MzYzfQ.yfY1ufC5l76OMomoO218rZDCk_CaJxpFkCTV-3AVTOs",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(
//         `This is an HTTP error: The status is ${response.status}`
//       );
//     }

//     let data = await response.json();

//     data.sort((a, b) => a.nome.localeCompare(b.nome));

//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const setNovoUsuario = async (usuario) => {
  try {
    // Envia uma requisição post
    console.log(usuario)
    const response = axios({
      method: "post",
      url: "https://localhost:7171/api/Usuario",
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk2NjE1NDEsImV4cCI6MTY1OTY2ODc0MSwiaWF0IjoxNjU5NjYxNTQxfQ.B3TWWG0_-7yY0Vp0yG2WadbOtTcLPT9TJwULoqyK5E0",
      },
      data: usuario,
    });
    
    if (response.status === 400) {
      response.message =
        "Já existe um cadastro de usuário. Tente novamente.";
    }
    return response;
    
  } catch (err) {
    console.error(err);
  }
};
