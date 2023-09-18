import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { List, ListItem, ListItemText } from '@mui/material';
import {CardMenuContext} from "../../context/CardMenuContext";

export default function CategoryPart() {

    const [categoryName, setCategoryName] = React.useState('');
    const {categoryList, setCategoryList} = React.useContext(CardMenuContext);

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
                        id="categoryName"
                        label="Nom de la catégorie"
                        fullWidth
                        variant="standard"
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                        onKeyUp={(ev) => {
                            if (ev.key === 'Enter') {
                                handleAddCategory();
                            }
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ my: 2.5, ml: 1 }}
                        onClick={handleAddCategory}
                    >
                        Ajouter
                    </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">
                        Catégories ajoutées :
                    </Typography>
                    <List sx={{ listStyleType: 'disc', pt: 0 }}>
                        {categoryList.map((category: string, index: number) => (
                            <ListItem key={index} sx={{ pl: 0}}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item xs={8} style={{ maxWidth: 'calc(100% - 48px)' }}>
                                        <ListItemText primary={category} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleDeleteCategory(index)}
                                        >
                                            Supprimer
                                        </Button>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>

                </Grid>

            </Grid>
        </React.Fragment>
    );
}