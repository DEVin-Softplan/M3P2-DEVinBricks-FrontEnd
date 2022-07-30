import "./VendaModalCss.css";
import Modal from "react-modal";
import "./VendaTabela";
import FreteTabela from "./VendaTabela";


Modal.setAppElement("#root");

function VendaModal({ comprador, dadosEntrega, carrinho }) {
    return (
        <>
            <h2>Cliente: {comprador.nome}</h2>
            <h2>CPF: {comprador.cpf}</h2>
            <h2>Email: {comprador.email}</h2>
            <h2>Telefone: {comprador.telefone}</h2>
            <br></br>
            <FreteTabela carrinho={carrinho} />
            <div id="footer">
                <div id="divA">
                    <p>
                        {dadosEntrega.endereco}
                    </p>
                </div>
                <div id="divB">

                    <p>Frete: R$: {dadosEntrega.frete}</p>
                    <p>Total: R$: {dadosEntrega.total}</p>

                </div>
            </div>
        </>
    );
}

export default VendaModal;




