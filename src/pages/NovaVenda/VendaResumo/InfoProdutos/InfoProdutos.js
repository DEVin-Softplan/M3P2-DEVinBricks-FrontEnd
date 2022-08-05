import React from 'react'
import styles from './InfoProdutos.module.css'

const InfoProdutos = ({dadosVenda}) => {
    return (
        <div className={styles.containerProdutos}>
            <table className={styles.tabelaProdutos}>
                <thead className={styles.teste}>
                    <tr>
                        <th style={{width: '20%'}}>#</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {/* fazer o for no tr provavelmente */}
                    {dadosVenda.produtos.map((item) => (
                        <tr>
                        <td><img style={{paddingLeft: '20px'}} width="100px" src={item.url} alt="Imagem do produto"/></td>
                        <td>{item.nome}</td>
                        <td>_quantidade_</td>
                        <td>{item.valor}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default InfoProdutos;