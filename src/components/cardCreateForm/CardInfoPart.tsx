import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CardMenuContext } from "../../context/CardMenuContext";
import { handleCardInfoChange } from './CardService';

export default function CardInfoPart() {
    const { cardInfo, setCardInfo } = useContext(CardMenuContext);

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
                        onChange={(event) => handleCardInfoChange(event, cardInfo, setCardInfo)}
                        value={cardInfo.cardName}
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
                        onChange={(event) => handleCardInfoChange(event, cardInfo, setCardInfo)}
                        value={cardInfo.cardDescription}
                    />
                </Grid>

                <Grid item xs={12}>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}