import { Container } from "@material-ui/core";
import { Box, Grid } from "@mui/material";
import { IRowNode } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useState } from "react";
import { TransactionsGridProps } from "../types";


export const TransactionsGrid = (props: TransactionsGridProps) => {

    const { rowData, label } = props;
    const defaultColDef = useMemo(() => ({
        sortable: true
    }), []);

    const [columnDefs, setColumnDefs] = useState([
        { field: 'transaction', filter: true },
        { field: 'amount' }
    ]);

    return (
        <Grid item xs={8} sm={6} lg={6}>
            <h3>{label}</h3>
            <div className="ag-theme-alpine" style={{ height: 300, width: 300 }}>
                <AgGridReact
                    rowData={rowData} // Row Data for Rows 
                    columnDefs={columnDefs} // Column Defs for Columns 
                    defaultColDef={defaultColDef} // Default Column Properties 
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows 
                />
            </div>
        </Grid>
    )
};
