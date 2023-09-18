import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {useEffect} from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Product {
    name: string;
    price: number;
}

const fetchAllProducts = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/product');
    const data = await response.json();
    return data;
}

export default function AddProductInputt() {
    const [productsFetched, setProductsFetched] = React.useState<readonly Product[]>([]);
    const [selectedProducts, setSelectedProducts]: any = React.useState<readonly Product[]>([]);

    useEffect(() => {
        let active = true;

        (async () => {
            try {
                const products = await fetchAllProducts();

                if (active) {
                    console.log(products)
                    setProductsFetched(products);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        })();

        return () => {
            active = false;
        };
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<{}>, value: Product[]) => {
        setSelectedProducts(value);
    };

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={productsFetched}
            disableCloseOnSelect
            getOptionLabel={(option: any) => option.name}
            value={selectedProducts}
            onChange={handleSelectChange}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label="Ajouter un produit" placeholder="Produit" />
            )}
        />
    );
}
