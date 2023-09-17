import React from 'react';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {Typography} from "@mui/material";
import Nav from "../components/layout/Nav";
import {MdMenuBook} from "react-icons/md";
import Checkout from '../components/checkout/Checkout';



const CardMenu = () => {
    return (
        <Nav
            Breadcrumbs={() => (
                <Breadcrumbs aria-label="breadcrumb" separator="/">
                    <MdMenuBook size={20} />
                    <Typography
                        key="3"
                        color="#666666"
                        style={{
                            fontWeight: 300,
                        }}
                    >
                        Cartes & Menus
                    </Typography>
                </Breadcrumbs>
            )}
        >
            <Checkout/>
        </Nav>
    );
};

export default CardMenu;