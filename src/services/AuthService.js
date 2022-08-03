export const loginUser = async (param) => {
	try {
		const response = await fetch('https://localhost:7171/Login', {
			method: 'POST',
			body: JSON.stringify(param),
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});

		if (response.status === 404) {
			response.message = 'Login e/ou senha incorreto(s)';
		}
		if (response.status === 200) {
			response.message = 'Bem vindo';
		}
		const token = response.status === 200 ? await response.text() : '';
		const obj = {
			token: token,
			message: response.message,
			status: response.status,
		};
		return obj;
	} catch (err) {
		console.error(err);
	}
};

export async function loginUser2(credentials) {
	return fetch('https://localhost:7171/Login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	}).then((data) => console.log(data));
}
