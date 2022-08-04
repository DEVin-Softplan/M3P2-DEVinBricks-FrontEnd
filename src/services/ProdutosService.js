export const getAllProducts = async () => {
  try {
    const data = await fetch('https://localhost:7171/api/Produto', {
      method: 'GET',
      headers: {
        Authorization:
          'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk1NzM2MzUsImV4cCI6MTY1OTU4MDgzNSwiaWF0IjoxNjU5NTczNjM1fQ.TJz2sNhMdNr7Uo-FrDaiNhpoQYewNwg_Ak9ucw-WH54',
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
