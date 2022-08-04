export const getAllProducts = async (token) => {
  try {
    const data = await fetch('https://localhost:7171/api/Produto', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
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
