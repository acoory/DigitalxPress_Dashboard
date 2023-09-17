import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CardInfoForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Informations de la carte
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="cardName"
                        name="cardName"
                        label="Nom de la carte"
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        id="cardDescription"
                        name="cardDescription"
                        multiline
                        label="Description"
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12}>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}