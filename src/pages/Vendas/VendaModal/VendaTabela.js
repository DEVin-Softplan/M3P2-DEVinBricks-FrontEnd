import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'img', headerName: '#', width: 70, renderCell: 
    (data) => <img src={data.row.img} width="40px" ></img>} ,
    { field: 'produto', headerName: 'Produto', width: 130 },
    { field: 'qtd', headerName: 'QTD', width: 130 },
    { field: 'subTotal', headerName: 'SubTotal', width: 90, },
];



export default function VendaTabela({ carrinho }) {
    return (
        <div style={{ height: 220, width: 480 }}>
            <DataGrid
                rows={carrinho}
                columns={columns}
                pageSize={2}

            />
        </div>
    );
}