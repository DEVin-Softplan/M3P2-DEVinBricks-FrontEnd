import axios from "axios";
export const getUsuarios = async () => {
  try {
    const response = await fetch(`https://localhost:7171/api/Usuario`, {
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTkyOTcxMzIsImV4cCI6MTY1OTMwNDMzMiwiaWF0IjoxNjU5Mjk3MTMyfQ.12YYAxdu-a5i-LJqaG7G5UItfz0Msku5dbzoOlTSFCc",
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
	  headers: { Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk1ODgyNjUsImV4cCI6MTY1OTU5NTQ2NSwiaWF0IjoxNjU5NTg4MjY1fQ.ZGl7psVXiKx2dHjErr5UE3yimm-QRKAzk7zGvxfR3I4"},
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
