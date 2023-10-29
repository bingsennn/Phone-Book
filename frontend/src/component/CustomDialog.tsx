import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import ContactForm from './ContactForm';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

const CustomDialog: React.FC<DialogProps> = ({ open, onClose, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <ContactForm />
      </DialogContent>
      <Grid>
        <Grid item>
          <DialogActions>
            <Button color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Grid>
        <Grid item>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default CustomDialog;
