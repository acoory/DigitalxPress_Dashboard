import React, { useContext } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import Badge from "@mui/material/Badge";
import { IoMdNotifications } from "react-icons/io";
import { Avatar } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

interface NavProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  Breadcrumbs?: React.FC;
}

export default function Nav({ children, Breadcrumbs }: NavProps) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="h-[100vh]  w-[100%] flex flex-row">
      <div className="absolute z-[-10] top-0 left-0 w-[100%] h-[30%]  flex flex-row "></div>
      <div className="w-[20%] bg-[#202020] rounded-[10px] m-[10px] flex flex-col justify-between nav">
        <div className="flex flex-col items-center">
          <div className="w-[80%] flex flex-row mt-[20px] flex items-center">
            <Avatar sx={{ width: 28, height: 28 }}>
              {user?.firstname.slice(0, 1).toUpperCase()}
            </Avatar>
            <p className="ml-[10px] text-[white] uppercase font-[300] line-clamp-1">
              {user?.firstname}
            </p>
            <p className="ml-[5px] text-[white] uppercase font-[300] line-clamp-1 ">
              {user?.lastname}
            </p>
          </div>
          <hr
            style={{
              width: "80%",
              margin: "20px 0px",
              border: "0.5px solid rgb(220 220 220 / 19%)",
            }}
          />
          <Menu />
        </div>
      </div>
      <div className="w-[100%] rounded-[10px] m-[10px] flex flex-col justify-between">
        <div className=" breadcrumb">
          {Breadcrumbs && <Breadcrumbs />}
          <div className="flex flex-row mr-[10px]">
            <BiSolidUserCircle
              size={22}
              color="#7B809A"
              style={{
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/profile")}
            />
            <Badge badgeContent={4} color="primary">
              <IoMdNotifications size={22} color="#7B809A" />
            </Badge>
          </div>
        </div>
        <div className=" h-[92%] main p-[10px] overflow-auto">{children}</div>
      </div>
    </div>
  );
}
