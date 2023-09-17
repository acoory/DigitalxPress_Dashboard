import React, { useState } from "react";
import Nav from "../components/layout/Nav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { BiTime } from "react-icons/bi";
import Switch from '@mui/material/Switch';

const HorairesServices = () => {
  const [selected, setSelected] = useState(0);
  const [checked, setChecked] = useState(Array(7).fill(true));

  const handleToggle = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !checked[index];
    setChecked(newChecked);
  };

  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

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
                  Horaires & Services
                </Typography>
              </Breadcrumbs>
          )}
      >
        {selected === 0 && (
            <div className="w-1143 h-214 flex-shrink-0 rounded-2xl bg-white shadow p-4">
              <div className="mb-4 space-x-8 " style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="grid grid-cols-1">
                  <span className="inline-block bg-white-500 px-4 py-2 rounded border">12H00</span>
                  <span className="inline-block bg-white-500 px-4 py-2 rounded border mt-20">14H00</span>
                </div>

                <div className="space-x-8">
                  <div className="grid grid-cols-7 space-x-4">
                    {jours.map((jour, index) => (
                        <div key={index} className="flex justify-between flex-col items-center">
                          <span className="inline-block bg-white-500 px-4 py-2 rounded border text-center">{jour}</span>
                          <Switch
                              checked={checked[index]}
                              onChange={() => handleToggle(index)}
                              inputProps={{ 'aria-label': 'controlled' }}
                              className="mt-20 place-content-center"
                          />
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        )}
      </Nav>
  );
}

export default HorairesServices;
