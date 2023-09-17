import React, { useContext } from "react";
import Nav from "../components/layout/Nav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { BiSolidUserDetail } from "react-icons/bi";
import { UserContext } from "../context/UserContext";
import AdminService from "../services/AdminService";
import adminService from "../services/AdminService";
import { Modal, Box } from "@mui/material";

export default function Profil() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  console.log(user);

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

  const [userInfo, setUserInfo] = React.useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    mobileNumber: user?.mobileNumber || "",
    email: user?.email || "",
  });
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    adminService.getUserInfo(parseInt(user.id)).then((res) => {
      setUserInfo({
        firstname: res?.firstname || "",
        lastname: res?.lastname || "",
        mobileNumber: res?.mobileNumber || "",
        email: res?.email || "",
      });
    });
  }, []);

  const handleUpdateUser = async () => {
    await adminService.UpdateAdmin(parseInt(user.id), userInfo).then((res) => {
      localStorage.setItem("admin", JSON.stringify(res.data));
      console.log(res);
      setUserInfo({
        firstname: res.data?.firstname || "",
        lastname: res.data?.lastname || "",
        mobileNumber: res.data?.mobileNumber || "",
        email: res.data?.email || "",
      });
    });
  };

  return (
    <Nav
      Breadcrumbs={() => (
        <Breadcrumbs aria-label="breadcrumb" separator="/">
          <BiSolidUserDetail size={20} />
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
      <div className="m-[20px]">
        <h1 className="font-[700] text-[#344767]">Profile</h1>
        <p className="text-[#666666] font-[300] mt-[10px] text-[14px]">
          Vous pouvez modifier vos informations personnelles .
        </p>
        <hr className="mt-[20px]"></hr>

        <div className="grid grid-cols-1 gap-[20px] mt-[20px]">
          <div className="grid grid-cols-2 gap-[20px]">
            <div className="flex flex-col">
              <label className="text-[#666666] font-[300] text-[14px]">Nom</label>
              <input
                className="border border-[#E5E5E5] rounded-[5px] px-[10px] py-[5px] mt-[5px] "
                value={userInfo?.firstname}
                onChange={(e) => setUserInfo({ ...userInfo, firstname: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#666666] font-[300] text-[14px]">Prénom</label>
              <input
                className="border border-[#E5E5E5] rounded-[5px] px-[10px] py-[5px] mt-[5px]"
                value={userInfo?.lastname}
                onChange={(e) => setUserInfo({ ...userInfo, lastname: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 ">
            <label className="text-[#666666] font-[300] text-[14px]">Email</label>
            <input
              className="border border-[#E5E5E5] rounded-[5px] px-[10px] py-[5px] mt-[5px]"
              value={user?.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 ">
            <div className="grid grid-cols-2 gap-[20px]">
              <div className="flex flex-col">
                <label className="text-[#666666] font-[300] text-[14px]">
                  Numéro de téléphone
                </label>
                <input
                  className="border border-[#E5E5E5] rounded-[5px] px-[10px] py-[5px] mt-[5px]"
                  value={userInfo?.mobileNumber}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, mobileNumber: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <hr className="mt-[20px]"></hr>
          <div className="w-full flex ">
            <button
              onClick={handleUpdateUser}
              className="px-[16px] bg-[#202020] py-[5px] border border-[#202020] rounded-[5px]  text-[white]"
            >
              Modifier
            </button>
          </div>

          <hr className="mt-[20px]"></hr>
          <div className="grid grid-cols-1 ">
            <div className="grid grid-cols-2 gap-[20px]">
              <div className="flex flex-col">
                <label className="text-[#666666] font-[300] text-[14px]">
                  Mot de passe
                </label>
                <button
                  onClick={() => setOpen(true)}
                  className="bg-[#202020] w-fit flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] rounded-md text-white items-center text-[13px]"
                >
                  Modifier le mot de passe
                </button>
                {/* <input
                  className="border border-[#E5E5E5] rounded-[5px] px-[10px] py-[5px] mt-[5px]"
                  value={userInfo?.password}
                  onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                /> */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 ">
            <div className="grid grid-cols-2 gap-[20px]">
              <div className="flex flex-col">
                {/* <input
                  className="border border-[#E5E5E5] rounded-[5px] px-[10px] py-[5px] mt-[5px]"
                  value={userInfo?.newpassword}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, newpassword: e.target.value })
                  }
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modifier le mot de passe
          </Typography>
          <div className="grid grid-cols-1 overflow-scroll">
            <input
              className="border border-[#E5E5E5] rounded-[5px] px-[10px] py-[5px] mt-[5px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => {
                adminService
                  .updatePassword(parseInt(user.id), {
                    password: password,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      setOpen(false);
                    }
                  });
              }}
              className="bg-[#202020] w-fit flex flex-row pl-5 pr-5 pt-[8px] pb-[8px] mt-5 rounded-md text-white items-center text-[13px]"
            >
              Modifier
            </button>
          </div>
        </Box>
      </Modal>
    </Nav>
  );
}
