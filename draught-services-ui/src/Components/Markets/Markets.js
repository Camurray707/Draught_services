import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MarketTable(props) {

    const[markets, setMarkets] = useState([])

    useEffect(() => {
        const api = new API();

        async function getMarkets() {
            const marketsJSONString = await api.allMarkets();
            console.log(`markets from the DB ${JSON.stringify(marketsJSONString)}`);
            setMarkets(marketsJSONString.data);
        }

        getMarkets();
    }, []);

    return (
        <Fragment>
            
        </Fragment>
    )
}
