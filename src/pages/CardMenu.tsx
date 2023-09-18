import React from 'react';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {Typography} from "@mui/material";
import Nav from "../components/layout/Nav";
import {MdMenuBook} from "react-icons/md";
import CardForm from '../components/checkout/CardForm';


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
            <CardForm/>
        </Nav>
    );
};

export default CardMenu;