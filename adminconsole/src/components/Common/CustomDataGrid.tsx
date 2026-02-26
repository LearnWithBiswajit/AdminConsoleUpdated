import { Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface DataGridInfo {
    columnName: string;
    fieldName: string;
}
interface CustomDataGridProps {
    dgInfo: any[];
    rows: any[];
    showCheckBox: boolean;
    getSelectedRows?: Function;
    totalRowCount: number;
    getPaginationInfo: Function;
    searchString?: string
}
const CustomDataGrid = ({ dgInfo, rows, showCheckBox, getSelectedRows, totalRowCount, getPaginationInfo, searchString }: CustomDataGridProps) => {
    const columns: GridColDef<any>[] = dgInfo;
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({ type: "include", ids: new Set() });
    const [page, setPage] = useState(0); // 0-based index
    const [pageSize, setPageSize] = useState(50);
    const [contextMenu, setContextMenu] = React.useState<any>(null);

    useEffect(() => {
        // console.log(rows);
        getSelectedRows && getSelectedRows(selectedRows);
        getPaginationInfo && getPaginationInfo(page, pageSize);
    }, [selectedRows.ids.size, page, pageSize])

    useEffect(() => {
        handlePaginationModel({ page: 0, pageSize: pageSize });
    }, [searchString])

    const handlePaginationModel = (newModel: any) => {
        setPage(newModel.page);
        setPageSize(newModel.pageSize);
    }

    const handleCopy = async(e: any) => {
        e.preventDefault();
        console.log(e);
        if (e.target.dataset.field === "recoveryKey") {
            await navigator.clipboard.writeText(e.target.innerText);
            toast.info("value copied to clipboard");
        }
    }
    const handleClose = () => {
        setContextMenu(null);
    };



    return (
        <>
            <Box
                width={"100%"}
                sx={{
                    height: {
                        xs: 400, // Small screens
                        sm: 600, // Medium screens
                        md: 700, // Large screens and up
                    },
                    minHeight: 300,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <DataGrid
                    getRowId={(row) => row.assetId ? row.assetId : Object.keys(row).includes("bitlockerId") && Object.keys(row).includes("userId") ? row.id + row.userId : row.id}
                    rows={rows}
                    columns={columns}
                    rowCount={totalRowCount ? totalRowCount : -1}
                    // loading={loading}
                    paginationMode="server"
                    paginationModel={{ page, pageSize }}
                    onPaginationModelChange={
                        handlePaginationModel
                    }
                    disableColumnResize
                    disableColumnFilter
                    disableColumnMenu
                    disableColumnSorting
                    // onCell={(params: any) => handleCopy(params)}
                    slotProps={{
                        cell: {
                            onContextMenu: (event: any) => handleCopy(event),
                        },
                    }}

                    sx={{
                        flex: 1,
                        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-cell--editing': {
                            boxShadow: 'none',
                            outline: 'none',
                        },
                        '& .MuiDataGrid-cell--editing:focus, & .MuiDataGrid-cell--editing:focus-within': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-checkboxInput': {
                            display: 'none',
                        },
                    }}
                    checkboxSelection={showCheckBox}
                    rowSelectionModel={selectedRows}
                    onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
                        setSelectedRows(newSelection);
                    }}
                    pagination
                    pageSizeOptions={[10, 20, 50, 100]}
                    disableRowSelectionOnClick
                />
                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={handleCopy}>Copy</MenuItem>
                </Menu>

            </Box>

        </>
    )
}

export default CustomDataGrid
