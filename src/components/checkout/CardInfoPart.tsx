import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {CardMenuContext} from "../../context/CardMenuContext";

export default function CardInfoPart() {

    const {cardInfo, setCardInfo} = React.useContext(CardMenuContext);

    const handleCardInfoChange = (event: { target: { name: any; value: any; }; }) => {
        if (event.target && event.target.name) {
            setCardInfo({
                ...cardInfo,
                [event.target.name]: event.target.value
            });
        }
    }

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
                        onChange={handleCardInfoChange}
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
                        onChange={handleCardInfoChange}
                        value={cardInfo.cardDescription}
                    />
                </Grid>

                <Grid item xs={12}>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
