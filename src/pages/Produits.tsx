import React, { useEffect, useRef, useState } from "react";
import Nav from "../components/layout/Nav";
import {
  Breadcrumbs,
  Button,
  Chip,
  DialogTitle,
  InputLabel,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { ProduitsService } from "../services/ProduitsService";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { WithContext as ReactTags } from "react-tag-input";

type Product = {
  id: number | any;
  name: string;
  price: number;
};

type Supplement = {
  id: number | any;
  name: string;
  price: number;
  productId: number;
};

export default function Produits() {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [product, setProduct] = React.useState<any>({});
  const [supplements, setSupplements] = React.useState<any>([]);
  const [tagsOptionChoice, setTagsOptionChoice] = useState<any>([]);
  const produitService = new ProduitsService();

  const navigate = useNavigate();

  const [choiceProduct, setChoiceProduct] = React.useState<any>({
    productId: product?.id,
    choiceName: "accompagnement",
    listOption: ["frite", "légumes"],
  });

  // const supplementsRef = useRef<any>(null);
  // const supplementsPriceRef = useRef<any>(null);

  const [supplementsPriceRef, setSupplementsPriceRef] = useState<any>("");
  const [supplementsRef, setSupplementsRef] = useState<any>("");

  useEffect(() => {
    produitService.getAll().then((res) => {
      console.log("res", res);
      setProducts(res);
    });
  }, []);

  const handleProduct = (id: any) => {
    try {
      // produitService.getProduct(id).then((res: any) => {
      //   console.log("res", res);
      //   const newArr = {
      //     product: res[0],
      //     supplements: res[1],
      //   };
      //   setProduct(newArr);
      // }
      // );

      produitService.getProduct(id).then((res: any) => {
        console.log("res", res);
        setProduct(res[0]);
        setSupplements(res[1]);
        setTagsOptionChoice(res[2].optionList);
      });

      // console.log("res", res);
      // const newArr = {
      //   product: res[0],
      //   supplements: res[1],
      // };

      // setProduct(newArr);
      // });
    } catch (error) {
      console.log("error", error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddOption = () => {
    if (inputValue.trim() !== "" && !names.includes(inputValue)) {
      setNames([...names, inputValue]);
      setInputValue("");
    }
  };

  return (
    <Nav
      Breadcrumbs={() => (
        <Breadcrumbs aria-label="breadcrumb" separator="/">
          {/* <BiSolidUserDetail size={20} /> */}
          <Typography
            key="3"
            color="#666666"
            style={{
              fontWeight: 300,
            }}
          >
            Profile
          </Typography>
        </Breadcrumbs>
      )}
    >
      <div className="flex flex-col w-full ">
        <div className="flex flex-row w-full">
          <button
            onClick={() => navigate("/produits/create")}
            className="bg-[#202020] flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px]"
          >
            <AiOutlinePlus size={20} className="mr-2" />
            Ajouter un produit
          </button>
        </div>
        <h1 className="font-[700] text-[#344767] mt-[20px]">Nouvelle réservations</h1>
        <DataGrid
          style={{
            marginTop: "20px",
          }}
          // {...data}
          sx={{
            boxShadow: 2,
            border: 0,
            borderColor: "none",
          }}
          columns={[
            {
              field: "id",
              headerName: "ID",
              width: 70,
            },
            {
              field: "name",
              headerName: "Nom du produit",
              width: 200,
            },
            {
              field: "price",
              headerName: "Prix",
              width: 130,
            },
            {
              field: "edit",
              headerName: "",
              width: 130,

              renderCell: (params: any) => (
                <>
                  <span
                    className=" rounded-md p-1 ease-out duration-300 hover:bg-[#ececec] text-[#202020] cursor-pointer"
                    onClick={() => {
                      console.log("params", params);
                      handleProduct(params.id);
                      setOpen(true);
                    }}
                  >
                    <FaRegEdit size={20} color="#595959" />
                  </span>
                  {/*  delete */}
                  <span
                    onClick={() => {
                      produitService.deleteProduct(params.id).then((res) => {
                        if (res.status == 204) {
                          console.log("res", res);
                          setProducts(
                            (products as any).filter(
                              (product: any) => product.id !== params.id
                            )
                          );
                        }
                      });
                      console.log(params.id);
                    }}
                    className="text-[#202020] cursor-pointer ml-[10px]"
                  >
                    <MdDeleteSweep size={22} className={"text-[#cb3a3a]"} />
                  </span>
                </>
              ),
              // renderCell: (params) => (
              //   <button className="bg-[#202020] flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px]">
              //     <AiOutlinePlus size={20} className="mr-2" />
              //     Modifier
              //   </button>
              // ),
            },
          ]}
          rows={products}
          // search
          slots={{ toolbar: GridToolbar }}
        />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <DialogTitle>Modifier le produit</DialogTitle>
            <hr className="mt-[20px] mb-[20px] border-[#bebebe36]" />
            <div className="flex flex-col overflow-scroll h-[60vh]">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  {/* <label className="text-[#202020] font-[500]">Nom du produit</label> */}
                  <TextField
                    label="Nom du produit"
                    value={product?.name || ""}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        name: e.target.value,
                      });
                    }}
                    fullWidth
                    margin="dense"
                    type="text"
                  />
                </div>

                <div>
                  <TextField
                    label="Prix"
                    value={product?.price || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        price: e.target.value,
                      })
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                  />
                </div>
              </div>
              <hr className="mt-[10px] mb-[10px] border-[#bebebe36]" />

              <TextField
                label="Description"
                value={product?.description || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
                rows={5}
              />
              <hr className="mt-[10px] mb-[10px] border-[#bebebe36]" />
              {/* <label className="text-[#202020] font-[500]">Suppléments</label> */}
              <div className="flex flex-row gap-4">
                <TextField
                  label="Nom du supplément"
                  onChange={(e) => {
                    setSupplementsRef(e.target.value);
                  }}
                  type="text"
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Prix du supplément"
                  onChange={(e) => {
                    setSupplementsPriceRef(e.target.value);
                  }}
                  type="number"
                  fullWidth
                  margin="dense"
                />
                <Button
                  style={{
                    margin: "auto",
                    height: "80%",
                    width: "40%",
                  }}
                  variant="contained"
                  size="medium"
                  onClick={() => {
                    console.log("supplementsRef", supplementsRef);
                    console.log("supplementsPriceRef", supplementsPriceRef);

                    console.log({
                      name: supplementsRef,
                      price: parseInt(supplementsPriceRef),
                      productId: parseInt(product?.id),
                    });

                    produitService
                      .addSupplement({
                        name: supplementsRef,
                        price: parseInt(supplementsPriceRef),
                        productId: parseInt(product?.id),
                      })
                      .then((res) => {
                        console.log("res", res);
                        if (res.status == 201) {
                          setSupplements([
                            ...supplements,
                            {
                              productId: product?.id,
                              name: supplementsRef,
                              price: supplementsPriceRef,
                            },
                          ]);
                        }
                      });
                  }}
                >
                  Ajouter
                </Button>
              </div>
              {supplements.length > 0 ? (
                <>
                  <hr className="mt-[20px] mb-[20px] border-[#bebebe36]" />
                  <label className="text-[#202020] font-[500] mb-[10px]">
                    Listes des suppléments
                  </label>
                </>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {supplements.map((supp: any, i: any) => (
                  <Chip
                    key={i}
                    label={supp.name}
                    icon={<p>{supp.price}€</p>}
                    onDelete={() => {
                      produitService.deleteSupplement(supp.id).then((res) => {
                        if (res.status == 204) {
                          console.log("res", res);
                          setSupplements(
                            (supplements as any).filter(
                              (supp: any) => supp.name !== supplements[i].name
                            )
                          );
                        }
                      });
                    }}
                  />
                ))}
              </div>

              {/* <label className="text-[#202020] font-[500]">Produit choix</label>
              <input
                value={choiceProduct?.choiceName || ""}
                onChange={(e) =>
                  setChoiceProduct({
                    ...choiceProduct,
                    choiceName: e.target.value,
                  })
                }
                className="border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md px-[20px] py-[10px] w-full"
                type="text"
              />
              <div className="tags-input-container">
                {tagsOptionChoice
                  ? Object.values(tagsOptionChoice).map((option: any, i: any) => (
                      <div className="tag-item" key={i}>
                        <span className="text">{option.name}</span>
                        <span className="close">&times;</span>
                      </div>
                    ))
                  : null}

                <input
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                      if (tagsOptionChoice) {
                        setTagsOptionChoice([
                          ...tagsOptionChoice,
                          {
                            name: e.target.value,
                          },
                        ]);
                      } else {
                        setTagsOptionChoice([
                          {
                            name: e.target.value,
                          },
                        ]);
                      }
                      e.target.value = "";
                      console.log("tagsOptionChoice", tagsOptionChoice);
                    }
                  }}
                  type="text"
                  className="tags-input"
                  placeholder="Ajouter un choix"
                /> */}
              {/* </div> */}
              <br />
              <Button
                style={{
                  // height: "80%",
                  width: "40%",
                  padding: "10px",
                }}
                variant="contained"
                size="medium"
                onClick={() => {
                  produitService.updateProduct(product, product.id).then((res) => {
                    // console.log("res", res);
                    // if (res.status == 200) {
                    setOpen(false);
                    // }
                  });
                }}
              >
                Modifier le produit
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </Nav>
  );
}
