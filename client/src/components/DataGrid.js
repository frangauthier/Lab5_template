import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable(props) {

const rows = props.rows;
const columns = props.columns;

  return (
    <div style={{ height: '75vh', width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
        />
    </div>
  );
}