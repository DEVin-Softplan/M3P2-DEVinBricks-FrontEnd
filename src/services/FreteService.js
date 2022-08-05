export const getEstados = async (token) => {
	try {
		const response = await fetch(`https://localhost:7171/api/Estados`, {
			headers: {
				Authorization: `bearer ${token}`,
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

export const setNovaRegraDeFrete = async (param, token) => {
	try {
		const response = await fetch(
			"https://localhost:7171/api/FretePorEstado/novo",
			{
				method: "POST",
				body: JSON.stringify(param),
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Authorization: `bearer ${token}`,
				},
			}
		);

		if (response.status === 400) {
			response.message =
				"Já existe um cadastro desse estado. Tente editar o cadastro existente.";
		}

		return response;
	} catch (err) {
		console.error(err);
	}
};

export const getListaFretePorEstado = async (token) => {
	try {
		const response = await fetch(
			"https://localhost:7171/api/FretePorEstado?page=1&size=30",
			{
				headers: {
					Authorization: `bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`This is an HTTP error: The status is ${response.status}`
			);
		}

		let data = await response.json();

		return data;
	} catch (err) {
		console.error(err);
	}
};
