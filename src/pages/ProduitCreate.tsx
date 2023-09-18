import React from "react";
import Nav from "../components/layout/Nav";
import { Breadcrumbs, Chip, Snackbar, TextField, Typography } from "@mui/material";
import { BiTime } from "react-icons/bi";
import { ProduitsService } from "../services/ProduitsService";

export default function ProduitCreate() {
  // useRef

  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const [supplements, setSupplements] = React.useState<any[]>([]);

  const [nameSupp, setNameSupp] = React.useState<string>("");
  const [priceSupp, setPriceSupp] = React.useState<string>("");
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
  });

  const { vertical, horizontal, open } = state;

  const produitService = new ProduitsService();

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const HandleCreate = async () => {
    const data = {
      name: name,
      price: parseInt(price),
      description: description,
    };

    await produitService.addProduct(data).then((res) => {
      if (res.status === 201) {
        console.log("res", res);
        const id = res.data.id;

        setState({
          ...state,
          open: true,
          message: "Le produit a bien été créé",
        });

        setTimeout(() => {
          setState({
            ...state,
            open: false,
            message: "",
          });
        }, 4000);

        setName("");
        setPrice("");
        setDescription("");
        setNameSupp("");
        setPriceSupp("");
        setSupplements([]);

        supplements.forEach(async (supp) => {
          await produitService
            .addSupplement({
              name: supp.name,
              price: parseInt(supp.price),
              productId: id,
            })
            .then((res) => {
              if (res.status === 201) {
                console.log("res", res);
              }
            });
        });
      }
    });
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
            Produit
          </Typography>
        </Breadcrumbs>
      )}
    >
      <Snackbar
        // anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={state.message}
        key={vertical + horizontal}
      />
      <div className="grid grid-cols-1">
        <h1>Création d'un produit</h1>
        <br />
        <div className="grid grid-cols-2 gap-5">
          <TextField
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth
            label="Nom du produit"
            id="fullWidth"
          />

          <TextField
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            fullWidth
            label="Prix du produit"
            type="number"
            id="fullWidth"
          />
        </div>
        <hr />
        <br />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          fullWidth
          label="Description du produit"
          id="fullWidth"
        />
        <hr />
        <br />
        <div className="grid grid-cols-3 gap-5">
          <TextField
            onChange={(e) => setNameSupp(e.target.value)}
            value={nameSupp}
            fullWidth
            label="Nom du supplément"
            id="fullWidth"
          />
          <TextField
            onChange={(e) => setPriceSupp(e.target.value)}
            value={priceSupp}
            fullWidth
            type="number"
            label="Prix du supplement"
            id="fullWidth"
          />
          <button
            className="bg-[#202020] w-fit flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px]"
            onClick={() => {
              setSupplements([...supplements, { name: nameSupp, price: priceSupp }]);
            }}
          >
            Ajouter un supplément
          </button>
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {supplements.map((supp: any, i: any) => (
            <Chip
              key={i}
              label={supp.name}
              icon={<p>{supp.price}€</p>}
              onDelete={() => {
                const newSupplements = supplements.filter(
                  (supp2: any) => supp2.name !== supp.name
                );
                setSupplements(newSupplements);
              }}
            />
          ))}
        </div>
        <br />
        <button
          onClick={HandleCreate}
          className="bg-[#202020] w-fit flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px]"
        >
          <span className="mr-2">Créer</span>
        </button>
      </div>
    </Nav>
  );
}
