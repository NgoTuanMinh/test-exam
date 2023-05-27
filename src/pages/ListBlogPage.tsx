import React, { useEffect, useMemo, useState } from 'react';
import TableListBlog from '../components/TableListBlog';
import { Button } from '@mui/material';
import ModalCreateBlog from '../components/ModalCreateBlog';
import localStorageHelper from '../ultis/localStorage';

function ListBlogPage() {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState();

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const listBlog = useMemo(() => {    
    const listBlogGetted = localStorageHelper.getObject('listBlog');
    return [...listBlogGetted] || [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal]);

  const handleEdit = (id: number | string) => {
    const blog = listBlog.find((i: any) => i.id === id);
    setDataEdit(blog);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (!isOpenModal) {
      setDataEdit(undefined);
    };
  }, [isOpenModal]);

  return (
    <div className='container'>
      <div className='wrap-button'>
        <Button onClick={handleOpenModal} variant="outlined">Create new Blog</Button>
      </div>

      <div className='wrap-table'>
        <TableListBlog data={listBlog} handleEdit={handleEdit} />
      </div>

      <ModalCreateBlog dataEdit={dataEdit} open={isOpenModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default ListBlogPage;
