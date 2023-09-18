import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

interface Product {
    name: string;
    price: number;
}

const fetchAllProducts = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/product');
    console.log(response)
    const data = await response.json();
    return data;
}

export default function AddProductInput() {
    const [open, setOpen] = React.useState(false);
    const [fetchedProducts, setFetchedProducts] = React.useState<readonly Product[]>([]);
    const loading = open && fetchedProducts.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            try {
                const products = await fetchAllProducts();

                if (active) {
                    setFetchedProducts(products);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setFetchedProducts([]);
        }
    }, [open]);

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            disableCloseOnSelect
            sx={{ width: 300, py: 2 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={fetchedProducts}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Produit"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
