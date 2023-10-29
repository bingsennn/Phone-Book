import React from 'react';
import {
  TextField,
} from '@mui/material';
import { IContactProps } from '../interface';

const ContactForm: React.FC<Partial<IContactProps>> = ({ name, phoneNumber, address }) => {
  return (
    <div>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
        />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone Number"
            type="email"
            fullWidth
            variant="standard"
        />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Address"
            type="email"
            fullWidth
            variant="standard"
        />
    </div>
  );
};

export default ContactForm;
