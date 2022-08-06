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

export const getProductById = async (token, id) => {
  try {
    const data = await fetch(`https://localhost:7171/api/Produto/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    if (data) {
      const produto = await data.json();
      return produto;
    }
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (token, product) => {
  try {
    const data = await fetch(`https://localhost:7171/api/Produto`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `bearer ${token}`,
      },
    });

    if (data) {
      const produto = await data.json();
      return produto;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createNewProduct = async (token, product) => {
  try {
    const data = await fetch(`https://localhost:7171/api/Produto`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `bearer ${token}`,
      },
    });

    console.log(`PARAM: ${product}`)

    if (data) {
      const produto = await data.json();
      return produto;
    }
  } catch (error) {
    console.log(error);
  }
};