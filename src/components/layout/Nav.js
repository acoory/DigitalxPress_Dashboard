import React from "react";

export default function Nav({ children, breadcrumbs }) {
  //   console.log(rest);
  return (
    <div className="h-[100vh]  w-[100%] flex flex-row">
      {/*  position relative */}
      <div className="absolute z-[-10] top-0 left-0 w-[100%] h-[30%]  flex flex-row bg-[linear-gradient(87deg,#1b508d,#7317d7)!important]"></div>
      <div className="w-[20%] bg-[white] rounded-[10px] m-[10px] flex flex-col justify-between nav">
        <div className="flex flex-col items-center">
          <div className="w-[80%] ">logo</div>
          <div className="w-[80%] ">menu</div>
        </div>
      </div>
      <div className="w-[80%] bg-[red] ml-[10px]">
        <div className="mt-[10px]">{breadcrumbs}</div>
        <div className="">breadcrumb</div>
      </div>
    </div>
  );
}
