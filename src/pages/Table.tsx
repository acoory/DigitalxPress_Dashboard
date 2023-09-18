import React from "react";
import Nav from "../components/layout/Nav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { BiTime } from "react-icons/bi";
import axios from "axios";
import { useState, useEffect } from "react";
import e from "express";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import { MdCheckCircle, MdError } from "react-icons/md";

export default function Table() {
  const [tableName, setTableName] = useState("");
  const [tableCapacity, setTableCapacity] = useState("");
  const [tables, setTables] = useState<any[]>([]);
  const [editingTable, setEditingTable] = useState<any | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarErreur, setOpenSnackbarErreur] = useState(false);


  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenSnackbarErreur = () => {
    setOpenSnackbarErreur(true);
  };
  const handleCloseSnackbarErreur = () => {
    setOpenSnackbarErreur(false);
  };
  const handleTableNameChange = (e: any) => {
    setTableName(e.target.value);
  };

  const handleTableCapacityChange = (e: any) => {
    setTableCapacity(e.target.value);
  };

  const handleEditTable = (table: any) => {
    setEditingTable(table);
  };
  
  const handleCreateTable = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/table",
        {
          name: tableName,
          capacity: parseInt(tableCapacity),
        },
        {
          withCredentials: true, // Active la gestion des cookies
        }
      );

      if (response.status === 200) {
        // Table created successfully, you can handle success here
        setTables((prevTables) => [...prevTables, response.data]);
        setTableName("");
        setTableCapacity("");
        console.log("Table created successfully");
        handleOpenSnackbar();
     } else {
  // Handle error if the request fails
  console.error("Failed to create table");
  handleOpenSnackbarErreur();
}
    } catch (error) {
      console.error("Error creating table:", error);
      handleOpenSnackbarErreur ();
    }
  };
  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/table", {
        withCredentials: true, // Active la gestion des cookies
      });
      if (response.status === 200) {
        setTables(response.data);
      } else {
        console.error("Failed to fetch tables");
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  useEffect(() => {
    // Charger la liste des tables au chargement du composant
    fetchTables();
  }, []);

  const handleDeleteTable = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/table/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 204) {
        setTables((prevTables) =>
          prevTables.filter((table) => table.id !== id)
        );
        handleOpenSnackbar();
        console.log("Table deleted successfully");
      } else if (response.status === 200) {
        setTables((prevTables) =>
          prevTables.filter((table) => table.id !== id)
        );
        console.log("Table deleted successfully");
      } else {
        console.error("Failed to delete table. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const handleUpdateTable = async (e: React.FormEvent, id: number) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3002/api/table/${id}`,
        editingTable, // Utilisez les données mises à jour
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Mise à jour réussie, vous pouvez mettre à jour l'état local ici si nécessaire
        console.log("Table updated successfully");
        setTables((prevTables) =>
          prevTables.map((table) => (table.id === id ? editingTable : table))
        );
        handleOpenSnackbar();

        // Réinitialisez editingTable après la mise à jour
        setEditingTable(null);
      } else {
        console.error("Failed to update table");
      }
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };
  console.log(tables);

 
  return (
    <Nav
      Breadcrumbs={() => (
        <Breadcrumbs aria-label="breadcrumb" separator="/">
          <BiTime size={20} />
          <Typography
            key="3"
            color="#666666"
            style={{
              fontWeight: 300,
            }}
          >
            Table
          </Typography>
        </Breadcrumbs>
      )}
    >
      <h1 className="font-[700] text-[#344767] mt-[20px]">
        Création de tables
      </h1>
      <div className="pt-10 px-10 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Nom de la table"
          value={tableName}
          className="border rounded-md p-1 focus:ring focus:ring-gray-50 focus:border-gray-100"
          onChange={handleTableNameChange}
        />

        <input
          type="number"
          placeholder="Capacité de la table"
          value={tableCapacity}
          className="border rounded-md p-1 focus:ring focus:ring-gray-50 focus:border-gray-100"
          onChange={handleTableCapacityChange}
        />
        <div className="flex-1"></div>
        <button
          className="bg-gradient-to-b from-green-400 to-green-600 flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px] w-[200px] justify-center"
          onClick={handleCreateTable}
        >
          Valider
        </button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={
            <div className="flex items-center">
              <MdCheckCircle size={24} style={{ marginRight: "8px" }} />{" "}
              Opération réussie !
            </div>
          }
          anchorOrigin={{
            vertical: "top", // Position verticale en haut
            horizontal: "right", // Position horizontale à droite
          }}
        />
        <Snackbar
          open={openSnackbarErreur}
          autoHideDuration={3000}
          onClose={handleCloseSnackbarErreur}
          message={
            <div className="flex items-center">
              <MdError size={24} style={{ marginRight: "8px" }} />{" "}
              Opération échouée !
</div>
          }
          anchorOrigin={{
            vertical: "top", // Position verticale en haut
            horizontal: "right", // Position horizontale à droite
          }}
        />
      </div>
      <div className="mt-20">
        <h1 className="font-[700] text-[#344767] mt-[20px]">Liste de tables</h1>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          style={{
            marginTop: "20px",
          }}
          rows={tables}
          columns={[
            { field: "name", headerName: "Nom", width: 200 },
            { field: "capacity", headerName: "Capacité", width: 200 },
            {
              field: "actions",
              headerName: "",
              flex: 1,
              align: "right",
              renderCell: (params) => (
                <div className="flex items-center space-x-4">
                  {editingTable && editingTable.id === params.row.id ? (
                    // Formulaire d'édition
                    <form onSubmit={(e) => handleUpdateTable(e, params.row.id)}>
                      <input
                        type="text"
                        placeholder="Nouveau nom de la table"
                        value={editingTable.name}
                        onChange={(e) =>
                          setEditingTable({
                            ...editingTable,
                            name: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Nouvelle capacité de la table"
                        value={
                          isNaN(editingTable.capacity)
                            ? ""
                            : editingTable.capacity
                        }
                        onChange={(e) =>
                          setEditingTable({
                            ...editingTable,
                            capacity:
                              e.target.value === ""
                                ? ""
                                : parseInt(e.target.value),
                          })
                        }
                      />
                      <button type="submit">Enregistrer</button>
                    </form>
                  ) : (
                    // Affichage normal de la ligne
                    <>
                      <div className="flex justify-between">
                        <div className="flex"></div>
                        <div className="flex-end space-x-2">
                          <button
                            onClick={() => handleEditTable(params.row)}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Modifier
                          </button>

                          <button
                            onClick={() => handleDeleteTable(params.row.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Supprimer
                          </button>
                         
                        
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </Nav>
  );
}
