import React from "react";
import Nav from "../components/layout/Nav";
import BreadcrumbsComponent from "@mui/material/Breadcrumbs";
import {Typography} from "@mui/material";
import {BiTime} from "react-icons/bi";

function CustomBreadcrumbs() {
    return (
        <BreadcrumbsComponent aria-label="breadcrumb" separator="/">
            <BiTime size={20}/>
            <Typography
                key="3"
                color="#666666"
                style={{
                    fontWeight: 300,
                }}
            >
                Réservations
            </Typography>
        </BreadcrumbsComponent>
    );
}

export default function Reservation() {
    return (
        <Nav Breadcrumbs={CustomBreadcrumbs}>
            hello
        </Nav>
    );
}
