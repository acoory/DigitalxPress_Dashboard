import React from "react";
import Nav from "../components/layout/Nav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import CardReport from "../components/layout/CardReport";
import { BiSolidUserCircle } from "react-icons/bi";

export default function Dashboard() {
  return (
    <Nav
      Breadcrumbs={() => (
        <Breadcrumbs aria-label="breadcrumb" separator="/">
          <AiFillHome />
          <Typography key="3" color="text.primary">
            Dashboard
          </Typography>
        </Breadcrumbs>
      )}
    >
      <div className="grid-card">
        <CardReport
          totalText={"Total utilisateurs"}
          total={0}
          Icon={() => <BiSolidUserCircle size={22} color="white" />}
          color="#202020"
        />
        <CardReport
          totalText={"Total utilisateurs"}
          total={0}
          Icon={() => <BiSolidUserCircle size={22} color="white" />}
          color="#DA1F63"
        />
      </div>
    </Nav>
  );
}
