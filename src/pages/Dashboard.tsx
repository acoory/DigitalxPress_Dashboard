import React from "react";
import Nav from "../components/layout/Nav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import CardReport from "../components/layout/CardReport";
import { BiSolidUserCircle } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function Dashboard() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 20,
    maxColumns: 5,
  });
  return (
    <Nav
      Breadcrumbs={() => (
        <Breadcrumbs aria-label="breadcrumb" separator="/">
          <AiFillHome />
          <Typography
            key="3"
            color="#666666"
            style={{
              fontWeight: 300,
            }}
          >
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
      <hr
        style={{
          marginTop: "20px",
        }}
      ></hr>
      <div
        style={{
          overflowX: "auto",
        }}
      >
        <h1 className="font-[700] text-[#344767] mt-[20px]">Nouvelle réservations</h1>
        <DataGrid
          style={{
            marginTop: "20px",
          }}
          {...data}
          sx={{
            boxShadow: 2,
            border: 0,
            borderColor: "none",
          }}
        />
      </div>
    </Nav>
  );
}
