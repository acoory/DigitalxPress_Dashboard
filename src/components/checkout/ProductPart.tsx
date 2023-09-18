import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CardMenuContext } from "../../context/CardMenuContext";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddProductInput from "./AddProductInput";

const products = [
    {
        name: 'Product 1',
        description: 'A nice thing',
        price: '$9.99',
    },
    {
        name: 'Product 2',
        description: 'Another thing',
        price: '$3.45',
    },
];

export default function ProductPart() {

    const {categoryList, product, setProduct} = React.useContext(CardMenuContext);

    return (
        <React.Fragment>
            {
                categoryList.map((category: string, index: number) => (
                    <React.Fragment key={index}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Typography className="!font-bold" variant="h6">
                                    {category}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    size="small"
                                >
                                    +
                                </Button>
                            </Grid>
                        </Grid>

                        <List disablePadding>
                            {products.map((product) => (
                                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={product.name} secondary={product.description} />
                                    <Typography variant="body2">{product.price}</Typography>
                                </ListItem>
                            ))}
                        </List>

                        <AddProductInput />
                    </React.Fragment>
                ))
            }

        </React.Fragment>
    );
}