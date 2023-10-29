// src/Contact.tsx
import React from 'react';
import { IContactProps } from '../interface';
import { Box, Card, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Contact: React.FC<Partial<IContactProps>> = ({ name, phoneNumber, address }) => {
    
    const handleUpdate = () => {
      
    }

    const handleDelete = () => {
      
    }
    
    return (
        <Card variant="outlined">
            <Box sx={{ alignSelf: 'center', ml: 2 }}>
                <Typography fontWeight="bold" noWrap>
                    {name}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                    {address}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                    {phoneNumber}
                </Typography>
            </Box>
            <Tooltip title="Update">
                <IconButton onClick={handleUpdate}>
                <EditIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                <DeleteIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
            </Tooltip>
        </Card>
    );
};

export default Contact;
