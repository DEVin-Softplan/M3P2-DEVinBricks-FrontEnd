// import dependencies
import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";

import {
	render,
	fireEvent,
	waitFor,
	screen,
	within,
} from "@testing-library/react";

import "@testing-library/jest-dom";

import FreteForm from "./FreteForm";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

const server = setupServer(
	rest.get("https://localhost:7171/api/Estados", (req, res, ctx) => {
		// Respond with a mocked user token that gets persisted
		// in the `sessionStorage` by the `Login` component.
		return res(
			ctx.json([
				{
					id: 12,
					nome: "Acre",
					uf: "AC",
				},
				{
					id: 27,
					nome: "Alagoas",
					uf: "AL",
				},
				{
					id: 16,
					nome: "Amapá",
					uf: "AP",
				},
			])
		);
	}),
	rest.get(
		"https://localhost:7171/api/FretePorEstado/novo",
		(req, res, ctx) => {
			return res(
				ctx.json({
					id: 12,
					nome: "Acre",
					uf: "AC",
				})
			);
		}
	)
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
	server.resetHandlers();
	jest.clearAllMocks();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("should loads select", async () => {
	render(
		<BrowserRouter>
			<FreteForm />
		</BrowserRouter>
	);
	let estados;
	await waitFor(() => {
		estados = screen.getByTestId("estados");
	});

	expect(estados).toBeInTheDocument();
});

test("should back to Fretes page when Voltar button is clicked", async () => {
	render(
		<BrowserRouter>
			<FreteForm />
		</BrowserRouter>
	);

	let buttonVoltar;
	await waitFor(() => {
		buttonVoltar = screen.getByTestId("voltar");
	});
	fireEvent.click(buttonVoltar);
	expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
	expect(mockedUsedNavigate).toHaveBeenCalledWith("/Frete");
	expect(buttonVoltar).toBeInTheDocument();
});

test("should not get error on form by default", async () => {
	render(
		<BrowserRouter>
			<FreteForm />
		</BrowserRouter>
	);

	let estadosLabel;
	let valorLabel;
	await waitFor(() => {
		estadosLabel = screen.getByLabelText(/^Estado/i);
		valorLabel = screen.getByLabelText(/^Valor/i);
	});

	// eslint-disable-next-line testing-library/no-node-access
	expect(estadosLabel.parentElement.classList).not.toContain("Mui-error");
	// eslint-disable-next-line testing-library/no-node-access
	expect(valorLabel.parentElement.classList).not.toContain("Mui-error");
});

test("should get error on form if it's not valid and button Cadastrar clicked", async () => {
	render(
		<BrowserRouter>
			<FreteForm />
		</BrowserRouter>
	);

	let buttonCadastrar;
	await waitFor(() => {
		buttonCadastrar = screen.getByTestId("cadastrar");
	});
	fireEvent.click(buttonCadastrar);

	let estadosLabel;
	let valorLabel;
	await waitFor(() => {
		estadosLabel = screen.getByLabelText(/^Estado/i);
		valorLabel = screen.getByLabelText(/^Valor/i);
	});

	// eslint-disable-next-line testing-library/no-node-access
	expect(estadosLabel.parentElement.classList).toContain("Mui-error");
	// eslint-disable-next-line testing-library/no-node-access
	expect(valorLabel.parentElement.classList).toContain("Mui-error");
});

test("should not send request when form is not valid", async () => {
	const fetch = jest.spyOn(global, "fetch");
	render(
		<BrowserRouter>
			<FreteForm />
		</BrowserRouter>
	);

	let buttonCadastrar;
	await waitFor(() => {
		buttonCadastrar = screen.getByTestId("cadastrar");
	});
	fireEvent.click(buttonCadastrar);
	expect(fetch).toHaveBeenCalledTimes(1);
	expect(buttonCadastrar).toBeInTheDocument();
});
