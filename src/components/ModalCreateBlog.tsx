import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, FormControl, TextField } from '@mui/material';
import { Textarea } from '@mui/joy';
import { useEffect, useState } from 'react';
import localStorageHelper from '../ultis/localStorage';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 12,
  p: 4,
  borderRadius: 2,
};

interface ModalCreateBlogProps {
  open: boolean;
  handleClose?: () => void;
  dataEdit?: any;
}

export default function ModalCreateBlog({open, handleClose, dataEdit}: ModalCreateBlogProps) {
  const [title, setTitle] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (dataEdit) {
      setTitle(dataEdit?.title);
      setCreatedBy(dataEdit?.createdBy);
      setContent(dataEdit?.content);
    }
  }, [dataEdit]);

  const handleSubmitBlog = (event: any) => {
    event.preventDefault();
    const listOldBlog = localStorageHelper.getObject('listBlog');

    if (dataEdit) {
      const indexBlog = listOldBlog.findIndex((i: any) => i.id === dataEdit?.id);    
      if (indexBlog > -1) {
        const newListBlog = [...listOldBlog];
        newListBlog[indexBlog] = {...newListBlog[indexBlog], title, content, createdBy};
        localStorageHelper.setObject('listBlog', newListBlog);
      }
    } else {
      const createdAt = (new Date()).toISOString();
      const newBlog = {title, createdBy, content, createdAt};
      if (!listOldBlog) {
        localStorageHelper.setObject('listBlog', [{...newBlog, id: 1}]);
      } else {
        localStorageHelper.setObject('listBlog', [...listOldBlog, {...newBlog, id: listOldBlog.length + 1}]);
      }
    }

    handleClose && handleClose();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Your Blog
          </Typography>

          <form onSubmit={handleSubmitBlog}>
            <FormControl
              sx={{
                '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' },
                '& .MuiButton-root': { mt: 1, mb: 1, mr: 1, width: '16ch' },
                '&': { width: '100%' }
              }}
            >
              <TextField
                name='title'
                label="Title" 
                variant="outlined"
                size='small'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                name='createdBy'
                label="Created By"
                variant="outlined"
                size='small'
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
              />
              <Textarea
                name='content'
                minRows={3}
                startDecorator
                size="md"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <div className='d-flex'>
                <Button type='submit' variant="outlined">{dataEdit ? 'Update' : 'Create'}</Button>
                <Button onClick={handleClose} variant="outlined" color="error">Close</Button>
              </div>

            </FormControl>
          </form>

        </Box>
      </Modal>
    </div>
  );
}