import React from "react";
import Nav from "../components/layout/Nav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import CardReport from "../components/layout/CardReport";
import { BiSolidUserCircle } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { ReservationService } from "../services/ReservationService";

export default function Dashboard() {
  const [reversations, setReservations] = React.useState<any[]>([]);

  const reservationService = new ReservationService();

  React.useEffect(() => {
    reservationService.getAll().then((res) => {
      console.log("res", res);
      setReservations(res);
    });
  }, []);
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
          totalText={`Total reservations ${reversations.length}`}
          total={0}
          Icon={() => <BiSolidUserCircle size={22} color="white" />}
          color="#202020"
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

        {/* {         "id": 254,         "Reserved": [             {                 "id": 834,                 "Table": {                     "id": 1,                     "name": "table1",                     "capacity": 1                 }             }         ],         "date": "2023-09-18T12:30:00.000Z",         "Client": {             "id": 38,             "firstname": "sdfghj",             "lastname": "hazfdxjyezhbc",             "email": "kzhebajfhkcaz",             "mobileNumber": null,             "count_reservations": 0,             "count_no_shows": 0,             "notifiable_token": null         },         "comment": null,         "status": "Pending",         "numberOfPersons": 1
} */}
        <DataGrid
          style={{
            marginTop: "20px",
          }}
          rows={reversations}
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "date", headerName: "Date", width: 130 },
              {
                  field: "ClientName",
                  headerName: "Client Name",
                  width: 250,
                  valueGetter: (params) => params.row.Client.firstname + ' ' + params.row.Client.lastname
              },
              {
                  field: "ClientEmail",
                  headerName: "Client Email",
                  width: 250,
                  valueGetter: (params) => params.row.Client.email
              },
              {
                  field: "ClientMobile",
                  headerName: "Mobile Number",
                  width: 150,
                  valueGetter: (params) => params.row.Client.mobileNumber || 'N/A'
              },
            { field: "status", headerName: "Status", width: 130 },
            { field: "numberOfPersons", headerName: "Nombre de personnes", width: 130 },
            { field: "comment", headerName: "Commentaire", width: 130 },
          ]}
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
