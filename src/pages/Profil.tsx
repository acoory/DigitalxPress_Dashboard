import React, { useContext } from "react";
import Nav from "../components/layout/Nav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
import { BiSolidUserDetail } from "react-icons/bi";
import { UserContext } from "../context/UserContext";

export default function Profil() {
  const { user} = useContext(UserContext);
  const [userInfo, setUserInfo] = React.useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    mobileNumber: user?.mobileNumber || "",
    email: user?.email || "",
    password: "",
    newpassword:  "",
  });

  React.useEffect(() => {
    setUserInfo({
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      mobileNumber: user?.mobileNumber || "",
      email: user?.email || "",
      password: "",
      newpassword:  "",
    });
    console.log(userInfo);
  }, []);


  

  
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
                  value={user?.mobileNumber ? user?.mobileNumber : ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, mobileNumber: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <hr className="mt-[20px]"></hr>
          <div className="grid grid-cols-1 ">
            <div className="grid grid-cols-2 gap-[20px]">
              <div className="flex flex-col">
                <label className="text-[#666666] font-[300] text-[14px]">
                  Mot de passe
                </label>
                <input
                  className="border border-[#E5E5E5] rounded-[5px] px-[10px] py-[5px] mt-[5px]"
                  value={userInfo?.password}
                  onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 ">
            <div className="grid grid-cols-2 gap-[20px]">
              <div className="flex flex-col">
                <input
                  className="border border-[#E5E5E5] rounded-[5px] px-[10px] py-[5px] mt-[5px]"
                  value={userInfo?.newpassword}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, newpassword: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-[30px]">
      <button className="px-[16px] py-[5px] border border-[#7B809A] rounded-[5px] mt-[50px] text-[#7B809A]">
        Modifier</button>
    </div>
        
      </div>
    </Nav>
  );
}
