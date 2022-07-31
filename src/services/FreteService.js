export const getEstados = async () => {
	try {
		const response = await fetch(`https://localhost:7171/api/Estados`, {
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

export const setNovaRegraDeFrete = async (param) => {
	try {
		const response = await fetch(
			"https://localhost:7171/api/FretePorEstado/novo",
			{
				method: "POST",
				body: JSON.stringify(param),
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Authorization:
						"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTkyOTcxMzIsImV4cCI6MTY1OTMwNDMzMiwiaWF0IjoxNjU5Mjk3MTMyfQ.12YYAxdu-a5i-LJqaG7G5UItfz0Msku5dbzoOlTSFCc",
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
