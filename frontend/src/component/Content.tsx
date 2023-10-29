import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ContactList from './ContactList';
import { IContactProps } from '../interface';
import CustomDialog from './CustomDialog';

export default function Content() {

    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState<IContactProps[]>([]);
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
      setOpen(true);
    };

    const handleDialogClose = () => {
      setOpen(false);
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);
    };

    useEffect(() => {
      const getData = setTimeout(() => {
        // Fetch data from the API
        fetch(`http://localhost:3001/contact/list?searchStr=${inputValue}`)
          .then((response) => response.json())
          .then((response) => {
            setContacts(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }, 500)
  
      return () => clearTimeout(getData);
    }, [inputValue]); // The empty dependency array ensures this effect runs once when the component mounts.

    return (
      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by name, address, phone number"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }} onClick={handleDialogOpen}>
                  Add user
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ContactList data={contacts}/>
          )}
        </div>
        <CustomDialog open={open} onClose={handleDialogClose} title="Sample Dialog" />
      </Paper>
    );
}