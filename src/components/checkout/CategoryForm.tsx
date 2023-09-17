import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {List, ListItem, ListItemText } from '@mui/material';

export default function CategoryForm() {

    const [categoryName, setCategoryName] = React.useState('');
    const [categoryList, setCategoryList]: any = React.useState([]);

    const handleAddCategory = () => {
        setCategoryList([...categoryList, categoryName]);
        setCategoryName('');
    }

    const handleDeleteCategory = (index: number) => {
        const newList = [...categoryList];
        newList.splice(index, 1);
        setCategoryList(newList);
    }

    const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    }

    return (
        <React.Fragment>

            <Typography variant="h6" gutterBottom>
                Catégorie
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="categorName"
                        label="Nom de la catégorie"
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ my: 2.5, ml: 1 }}
                    >
                        Ajouter
                    </Button>
                </Grid>

                <Grid item xs={12} md={6}>

                    <Typography variant="subtitle2">
                        Catégories ajoutées :
                    </Typography>

                    <List sx = {{
                        listStyleType: 'disc',
                        pl: 2,
                        pt: 0,
                    }}>
                        <ListItem sx={{ display: 'list-item', pl: 0 }}>
                            {
                                categoryList.map((category: string, index: number) => (
                                    <ListItemText key={index} primary={category} secondary={
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{ my: 2.5, ml: 1 }}
                                            onClick={() => handleDeleteCategory(index)}
                                        >
                                            Supprimer
                                        </Button>
                                    } />
                                ))
                            }
                        </ListItem>
                    </List>

                </Grid>

            </Grid>
        </React.Fragment>
    );
}