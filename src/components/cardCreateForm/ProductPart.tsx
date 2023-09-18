import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CardMenuContext } from "../../context/CardMenuContext";
import Grid from "@mui/material/Grid";
import AddProductInputt from "./AddProcutInputt";


export default function ProductPart() {

    const {categoryList, product, setProduct} = React.useContext(CardMenuContext);

    return (
        <React.Fragment>
            {
                categoryList.map((category: string, index: number) => (
                    <React.Fragment key={index}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Typography sx={{my: 2, fontWeight: "bold"}} variant="h6">
                                    {category}
                                </Typography>
                            </Grid>
                        </Grid>
                        <AddProductInputt />
                    </React.Fragment>
                ))
            }

        </React.Fragment>
    );
}