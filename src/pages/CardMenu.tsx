import React from 'react';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {Typography} from "@mui/material";
import Nav from "../components/layout/Nav";
import {MdMenuBook} from "react-icons/md";
import CardCreateForm from '../components/cardCreateForm/CardCreateForm';
import {CardMenuConsumer} from "../context/CardMenuContext";


const CardMenu = () => {
    return (
        <React.Fragment>
            <CardMenuConsumer>
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
                    <CardCreateForm/>
                </Nav>
            </CardMenuConsumer>
        </React.Fragment>
    );
};

export default CardMenu;