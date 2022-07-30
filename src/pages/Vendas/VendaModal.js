import { useState } from "react";
import "./VendaModalCss.css";
import Modal from "react-modal";
import "./VendaTabela";

import { FaWindowClose } from "react-icons/fa"

import { BsFillEyeFill } from "react-icons/bs"
import FreteTabela from "./VendaTabela";


Modal.setAppElement("#root");

function VendaModal({ comprador, dadosEntrega, carrinho }) {


    const [modalisopen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className="Container">
            <a onClick={openModal}><BsFillEyeFill size={28} /> </a>
            <Modal
                isOpen={modalisopen}
                onRequestClose={closeModal}
                contentLabel="Exemplo Modal"
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <a onClick={closeModal}><FaWindowClose size={28} /></a>
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

            </Modal>

        </div >
    );
}

export default VendaModal;




