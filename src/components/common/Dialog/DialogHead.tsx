import * as React from 'react';
import { 
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  title: string
  isNew: boolean;
  onClose: () => void
}


const DialogHead: React.FC<Props> = (props: Props) => {
  const titleDialog = props.isNew ? 'Tạo mới sinh viên' : 'Sửa sinh viên';
  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      {titleDialog}
      <IconButton
        aria-label="close"
        onClick={props.onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}
export default DialogHead;