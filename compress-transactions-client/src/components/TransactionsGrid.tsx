// import { Container } from "@material-ui/core";
import { Grid } from "@mui/material";

import { AgGridReact } from "ag-grid-react";
import Container from '@mui/material/Container';
import React, { useMemo, useState } from "react";
import { TransactionsGridProps } from "../types";


// This grid component just displayst he list of transactions ins the page
// basedo on the props passed to it
// It uses ag-grid torender the grid

export const TransactionsGrid = (props: TransactionsGridProps) => {

    const { rowData, label } = props;
    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true
    }), []);

    const [columnDefs, setColumnDefs] = useState([
        { field: 'transaction', width: 150, filter: true },
        { field: 'amount', width: 100 }
    ]);

    return (
        <Grid item xs={8} md={6} lg={6} xl={6}>
            <Container maxWidth="sm" sx={{ padding: '8%', justifyContent: 'center', alignItems: 'center' }}>
                <h3>{`${label} Transactions`}</h3>
                <div className="ag-theme-alpine" style={{ height: 300, width: 300 }}>
                    <div style={{ width: '30vw', height: '30vh' }}>

                        <AgGridReact
                            rowData={rowData} // Row Data for Rows 
                            columnDefs={columnDefs} // Column Defs for Columns 
                            defaultColDef={defaultColDef} // Default Column Properties 
                            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                            rowSelection='multiple' // Options - allows click selection of rows 
                        />
                    </div>
                </div>
            </Container>
        </Grid>
    )
};
