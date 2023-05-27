import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import localStorageHelper from '../ultis/localStorage';
import { useEffect, useState } from 'react';

export default function TableListBlog({data, handleEdit}: any) {
  const [dataTable, setDataTable] = useState(data);

  useEffect(() => {
    setDataTable(data);
  }, [data])

  const handleDeleteBlog = (id: string | number) => {
    const indexBlog = data.findIndex((i: any) => i.id === id);    
    if (indexBlog > -1) {
      const newData = [...data];
      newData.splice(indexBlog, 1);
      localStorageHelper.setObject('listBlog', newData);
      setDataTable(newData);
    }
  };

  const columns: any[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${new Date(params?.row?.createdAt).toLocaleString()}`
    },
    { field: 'content', headerName: 'Content', width: 250 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (rowData: any) => {
        return (
        <div>
          <Button onClick={() => handleEdit(rowData?.row?.id)}>Edit</Button>
          <Button color='error' onClick={() => handleDeleteBlog(rowData?.row?.id)}>Delete</Button>
        </div>
        )
      }
    },
  ];
  
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={dataTable}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}