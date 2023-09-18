import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { List, ListItem, ListItemText } from '@mui/material';
import { CardMenuContext } from "../../context/CardMenuContext";
import { handleAddCategory, handleDeleteCategory, handleCategoryNameChange } from './CardService';

export default function CategoryPart() {
    const [categoryName, setCategoryName] = React.useState('');
    const { categoryList, setCategoryList } = useContext(CardMenuContext);

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
                        onChange={(event) => handleCategoryNameChange(event, setCategoryName)}
                        onKeyUp={(ev) => {
                            if (ev.key === 'Enter') {
                                handleAddCategory(categoryName, categoryList, setCategoryList, setCategoryName);
                            }
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ my: 2.5, ml: 1 }}
                        onClick={() => handleAddCategory(categoryName, categoryList, setCategoryList, setCategoryName)}
                    >
                        Ajouter
                    </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">
                        Catégories ajoutées :
                    </Typography>
                    <List sx={{ listStyleType: 'disc', pt: 0 }}>
                        {categoryList.map((category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                            <ListItem key={index} sx={{ pl: 0}}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item xs={8} style={{ maxWidth: 'calc(100% - 48px)' }}>
                                        <ListItemText primary={category} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleDeleteCategory(index, categoryList, setCategoryList)}
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
