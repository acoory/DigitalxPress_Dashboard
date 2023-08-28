import React from "react";
import Nav from "../components/layout/Nav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { BiTime } from "react-icons/bi";
import Switch from '@mui/material/Switch';

export default function Horaires_Services() {
  const [selected, setSelected] = React.useState(0);
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(true);
  const [checked5, setChecked5] = React.useState(true);
  const [checked6, setChecked6] = React.useState(true);
  const [checked7, setChecked7] = React.useState(true);



  const Lundi= (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1(event.target.checked);
  };

  const Mardi  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2(event.target.checked);
  };

  const Mercredi  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked3(event.target.checked);
  };

  const Jeudi  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked4(event.target.checked);
  };

  const Vendredi  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked5(event.target.checked);
  };

  const Samedi  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked6(event.target.checked);
  };

  const Dimanche  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked7(event.target.checked);
  };

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
      {selected === 0 ? (
<>
<div className="w-1143 h-214 flex-shrink-0 rounded-2xl bg-white shadow p-4">
  
  <div className="mb-4 space-x-8 " style={{
    display: "flex",
    justifyContent: "space-between"
  }}>
    <div className="grid grid-cols-1">

    <span className="inline-block bg-white-500 px-4 py-2 rounded border">12H00</span>
    <span className="inline-block bg-white-500 px-4 py-2 rounded border mt-20">14H00</span>
 

    

    
  </div>
  
  <div className="space-x-8">
  <div className="grid grid-cols-7 space-x-4">
    <div className="flex justify-between flex-col items-center"> 
       <span className="inline-block bg-white-500 px-4 py-2 rounded border text-center">Lundi</span>
       {/* <button>helo</button> */}
       <Switch
      checked={checked1}
      onChange={Lundi}
      inputProps={{ 'aria-label': 'controlled' }}
      className=" place-content-center"
    />
</div>
<div className="flex justify-between flex-col items-center"> 
       <span className="inline-block bg-white-500 px-4 py-2 rounded border text-center">Mardi</span>
       <Switch
      checked={checked2}
      onChange={Mardi}
      inputProps={{ 'aria-label': 'controlled' }}
    className=" mt-20 items-center"/>
</div>
<div className="flex justify-between flex-col items-center"> 
       <span className="inline-block bg-white-500 px-4 py-2 rounded border text-center">Mercredi</span>
       <Switch
      checked={checked3}
      onChange={Mercredi}
      inputProps={{ 'aria-label': 'controlled' }}
    className=" mt-20 place-content-center"/>
</div>
<div className="flex justify-between flex-col items-center"> 
       <span className="inline-block bg-white-500 px-4 py-2 rounded border text-center">Jeudi</span>
       <Switch
      checked={checked4}
      onChange={Jeudi}
      inputProps={{ 'aria-label': 'controlled' }}
    className=" mt-20 place-content-center"/>
</div>
<div className="flex justify-between flex-col items-center"> 
       <span className="inline-block bg-white-500 px-4 py-2 rounded border text-center">Vendredi</span>
       <Switch
      checked={checked5}
      onChange={Vendredi}
      inputProps={{ 'aria-label': 'controlled' }}
    className=" mt-20 place-content-center"/>
</div>
<div className="flex justify-between flex-col items-center"> 
       <span className="inline-block bg-white-500 px-4 py-2 rounded border text-center">Samedi</span>
       <Switch
      checked={checked6}
      onChange={Samedi}
      inputProps={{ 'aria-label': 'controlled' }}
    className=" mt-20 place-content-center"/>
</div>
<div className="flex justify-between flex-col items-center"> 
       <span className="inline-block bg-white-500 px-4 py-2 rounded border text-center">Dimanche</span>
       <Switch
      checked={checked7}
      onChange={Dimanche}
      inputProps={{ 'aria-label': 'controlled' }}
    className=" mt-20 place-content-center"/>
</div>
  </div>
    
    
    </div>

    </div>

 
</div>





</>
      ): null}
    </Nav>
  );
}