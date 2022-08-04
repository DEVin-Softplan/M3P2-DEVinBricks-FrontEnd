import axios from "axios";
export const getUsuarios = async () => {
  try {
    const response = await fetch(`https://localhost:7171/api/Usuario`, {
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk2MjUxOTAsImV4cCI6MTY1OTYzMjM5MCwiaWF0IjoxNjU5NjI1MTkwfQ.6ZIUyjsNZTyuO4Kt3BonnLmfrYc94R8Hhb4lzzCpyDA",
      },
    });

    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }

    let data = await response.json();

    data.sort((a, b) => a.nome.localeCompare(b.nome));

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const setNovoUsuario = async (usuario) => {
  try {
    // Envia uma requisição post
    const response = axios({
      method: "post",
      url: "https://localhost:7171/api/Usuario",
	  headers: { Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk2MjUxOTAsImV4cCI6MTY1OTYzMjM5MCwiaWF0IjoxNjU5NjI1MTkwfQ.6ZIUyjsNZTyuO4Kt3BonnLmfrYc94R8Hhb4lzzCpyDA"},
      data: usuario
    });

    if (response.status === 400) {
      response.message =
        "Já existe um cadastro de usuário. Tente editar novamente.";
    }

    return response;
  } catch (err) {
    console.error(err);
  }
};
