export const getAllProducts = async () => {
  try {
    const data = await fetch('https://localhost:7171/api/Produto', {
      method: 'GET',
      headers: {
        Authorization:
          'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk2MzcwNTQsImV4cCI6MTY1OTY0NDI1NCwiaWF0IjoxNjU5NjM3MDU0fQ.2cL5pSm3Ax5XQkHJIjnn9BOnIPLAXeUliioH-565g6U',
      },
    });

    if (data) {
      const listaProdutos = await data.json();
      return listaProdutos;
    }
  } catch (error) {
    console.log(error);
  }
};
