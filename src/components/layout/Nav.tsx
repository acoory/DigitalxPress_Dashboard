import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import Badge from "@mui/material/Badge";
import { IoMdNotifications } from "react-icons/io";
import { Avatar } from "@mui/material";

interface NavProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  Breadcrumbs?: React.FC;
}

export default function Nav({ children, Breadcrumbs }: NavProps) {
  return (
    <div className="h-[100vh]  w-[100%] flex flex-row">
      <div className="absolute z-[-10] top-0 left-0 w-[100%] h-[30%]  flex flex-row "></div>
      <div className="w-[20%] bg-[#202020] rounded-[10px] m-[10px] flex flex-col justify-between nav">
        <div className="flex flex-col items-center">
          <div className="w-[80%] flex flex-row mt-[20px] flex items-center">
            <Avatar sx={{ width: 28, height: 28 }}>H</Avatar>
            <p className="ml-[10px] text-[white]">Anissa Mokrani</p>
          </div>
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
              }}
            />
            <Badge badgeContent={4} color="primary">
              <IoMdNotifications size={22} color="#7B809A" />
            </Badge>
          </div>
        </div>
        <div className=" h-[92%] main p-[10px]">{children}</div>
      </div>
    </div>
  );
}
