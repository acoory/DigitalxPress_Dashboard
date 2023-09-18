import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {useEffect} from "react";
import axios from "axios";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Product {
    name: string;
    price: number;
}

export const fetchAllProducts = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/product');
    const data = await response.json();
    return data;
}

export const fetchCreateCard = async (cardName: string, cardDescription: string) => {
    const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/card",
        {
            name: cardName,
            description: cardDescription,
        },
        {
            withCredentials: true, // Active la gestion des cookies
        }
    );
    return response;
}

export const fetchCreateCategory = async (categoryName: string) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: categoryName,
        })
    });
    const data = await response.json();
    return data;
}

export const fetchCreateCardProduct = async (cardId: number, productId: number, categoryId: number) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/card-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cardId: cardId,
            categoryId: categoryId,
            productId: productId
        })
    });
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
