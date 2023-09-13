import React, { useEffect, useRef } from "react";
import Nav from "../components/layout/Nav";
import { Breadcrumbs, Chip, InputLabel, ListItem, Typography } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { ProduitsService } from "../services/ProduitsService";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { Modal, Box } from "@mui/material";
import { WithContext as ReactTags } from "react-tag-input";

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
  const produitService = new ProduitsService();

  const [choiceProduct, setChoiceProduct] = React.useState<any>({
    productId: product?.id,
    choiceName: "accompagnement",
    listOption: ["frite", "légumes"],
  });

  const supplementsRef = useRef<any>(null);
  const supplementsPriceRef = useRef<any>(null);

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
          <button className="bg-[#202020] flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px]">
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

              renderCell: (params) => (
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
                  <span className="text-[#202020] cursor-pointer ml-[10px]">
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Produit
            </Typography>

            <div className="grid grid-cols-1 overflow-scroll h-[70vh]">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[#202020] font-[500]">Nom du produit</label>
                  <input
                    value={product?.name || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product: { ...product.product, name: e.target.value },
                      })
                    }
                    className="border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md px-[20px] py-[10px] w-full"
                    type="text"
                  />
                </div>

                <div>
                  <label className="text-[#202020] font-[500]">Prix</label>
                  <input
                    value={product?.price || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product: { ...product.product, price: e.target.value },
                      })
                    }
                    className="border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md px-[20px] py-[10px] w-full"
                    type="number"
                  />
                </div>
              </div>

              <label className="text-[#202020] font-[500]">Description</label>
              <textarea
                value={product?.description || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    product: { ...product.product, description: e.target.value },
                  })
                }
                className="border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md px-[20px] py-[10px] w-full"
                rows={5}
              ></textarea>
              <hr className="mt-[20px] mb-[20px] border-[#bebebe36]" />
              <label className="text-[#202020] font-[500]">Suppléments</label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  ref={supplementsRef}
                  type="text"
                  className="border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md px-[20px] py-[10px] w-full"
                />
                <input
                  ref={supplementsPriceRef}
                  type="number"
                  className="border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md px-[20px] py-[10px] w-full"
                />
                <button
                  onClick={() => {
                    console.log("supplementsRef", supplementsRef.current.value);
                    console.log("supplementsPriceRef", supplementsPriceRef.current.value);

                    produitService
                      .addSupplement({
                        name: supplementsRef.current.value,
                        price: parseInt(supplementsPriceRef.current.value),
                        productId: parseInt(product?.id),
                      })
                      .then((res) => {
                        console.log("res", res);
                        if (res.status == 201) {
                          setSupplements([
                            ...supplements,
                            {
                              productId: product?.id,
                              name: supplementsRef.current.value,
                              price: supplementsPriceRef.current.value,
                            },
                          ]);
                        }
                      });
                  }}
                  className="bg-[#202020] flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px]"
                >
                  <AiOutlinePlus size={20} className="mr-2" />
                  Ajouter
                </button>
                <hr className="mt-[20px] mb-[20px] border-[#bebebe36]" />
              </div>
              <label className="text-[#202020] font-[500]">Listes des suppléments</label>
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
              <hr className="mt-[20px] mb-[20px] border-[#bebebe36]" />
              <label className="text-[#202020] font-[500]">Produit choix</label>
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
              <ReactTags
                // tags={tags}
                // suggestions={suggestions}
                // delimiters={delimiters}
                // handleDelete={handleDelete}
                // handleAddition={handleAddition}
                // handleDrag={handleDrag}
                // handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
              />

              {choiceProduct.choiceName.length > 0
                ? choiceProduct.listOption.map((option: any, i: any) => (
                    <ListItem key={i}>
                      <Chip
                        label={option}
                        onDelete={() => {
                          setChoiceProduct({
                            ...choiceProduct,
                            listOption: (choiceProduct.listOption as any).filter(
                              (option: any) => option.choiceName !== option.choiceName
                            ),
                          });
                        }}
                      />
                    </ListItem>
                  ))
                : null}

              <button onClick={() => console.log(product)}>trst</button>
            </div>
          </Box>
        </Modal>
      </div>
    </Nav>
  );
}
