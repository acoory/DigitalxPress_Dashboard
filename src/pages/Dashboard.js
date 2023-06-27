import React from "react";
import Nav from "../components/layout/Nav";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function Dashboard() {
  return (
    <Nav
      Breadcrumbs={
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            MUI
          </Link>
        </Breadcrumbs>
      }
    />
  );
}
