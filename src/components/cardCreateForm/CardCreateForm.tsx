import React, { useState, useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {AppBar, Box, Container, Toolbar, Paper, Stepper, Step, StepLabel, Button, Typography,} from '@mui/material';
import { CardMenuContext } from '../../context/CardMenuContext';
import {getStepContent, handleCreateAllCardInfo} from './CardService';

const steps = ['Carte', 'Catégories', 'Produits'];

export default function CardForm() {
    const [activeStep, setActiveStep] = useState(0);
    const { cardInfo, categoryList, categoryListProduct } = useContext(CardMenuContext);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Button variant="contained" sx={{ my: 2, ml: 1 }}>
                        Créer une carte
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Carte
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Votre nouvelle carte a bien été créée.
                            </Typography>
                        </>
                    ) : (
                        <>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={
                                        activeStep === steps.length - 1
                                            ? () => handleCreateAllCardInfo(cardInfo, categoryList, categoryListProduct)
                                            : handleNext
                                    }
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Valider' : 'Next'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Container>
        </>
    );
}
