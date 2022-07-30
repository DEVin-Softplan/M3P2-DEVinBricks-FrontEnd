import VendaModal from "./VendaModal";


const venda = {
    comprador: {
        nome: "Maria",
        cpf: "021.234.345.767-09",
        email: "manu@gmail.com",
        telefone: "(48) 989766908"
    },
    dadosEntrega: {
        endereco: "Rua João da Silva, Buriti, Pacajás, Ceará, N° 23",
        frete: 30,
        total: 500
    },
    carrinho: [{
        id: 1,
        img: "https://temdetudomateriais.com.br/wp-content/uploads/2020/12/Sem-titulo-1.png",
        qtd: 3, produto: "cimento",
        subTotal: 100
    },
    {
        id: 2,
        img: "https://temdetudomateriais.com.br/wp-content/uploads/2020/12/Sem-titulo-1.png",
        qtd: 3, produto: "cimento",
        subTotal: 100
    },
    {
        id: 3,
        img: "https://temdetudomateriais.com.br/wp-content/uploads/2020/12/Sem-titulo-1.png",
        qtd: 3, produto: "cimento",
        subTotal: 100
    }


    ]


}

const VendaTabela = () => {
    return (
        <div>
            <VendaModal comprador={venda.comprador} dadosEntrega={venda.dadosEntrega} carrinho={venda.carrinho} />
        </div>


    )
}

export default VendaTabela;

