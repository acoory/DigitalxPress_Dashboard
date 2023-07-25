import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";

interface CardReportProps {
  totalText: string;
  total: number;
  Icon?: React.FC;
  color: string;
}

export default function CardReport({ totalText, total, Icon, color }: CardReportProps) {
  return (
    <div className="card-report mt-[20px]">
      <div className="flex flex-row justify-between">
        <div
          className={`container-icon p-[10px]  mb-[20px] mt-[-20px] rounded-md m-[10px] h-[fit-content] ml-[10px]`}
          style={{
            backgroundColor: color,
          }}
        >
          {Icon && <Icon />}
          {/* <BiSolidUserCircle size={22} color="purple" /> */}
        </div>
        <div className="container-text flex flex-col mr-[10px]">
          <p className="p-card-report">{totalText}</p>
          <p className="p-card-report-total ">{total}</p>
        </div>
      </div>
      <div>
        <hr className="" />
        <p className="p-[10px]">test</p>
      </div>
    </div>
  );
}
