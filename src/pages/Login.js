import React, { useRef } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import AdminService from "../services/AdminService";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      AdminService.login(data).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(process.env.REACT_APP_API_URL);

  return (
    <div className="bg-default flex justify-center items-center h-screen">
      <div className=" w-[35%] mx-auto bg-[white] flex flex-col items-center py-[40px] rounded-md shadow-md">
        {/* font-size: 80%;
    font-weight: 400; */}
        <div>
          {/* 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08) */}
          <button className="flex items-center  border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md px-[20px] py-[10px]">
            <FcGoogle
              size={20}
              color="#adb5bd"
              className="ml-[10px] mr-[10px]"
            />
            Sign in with Google
          </button>
        </div>
        <hr className="w-[70%] mx-auto my-[20px] border-[#bebebe36]" />
        <p className="text-[80%] font-[400] mx-auto text-[#8898aa]">
          Sign in with credentials
        </p>
        {/* display: block;
    width: 100%;
    height: calc(1.5em + 1.25rem + 2px);
    padding: 0.625rem 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8898aa;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #cad1d7;
    border-radius: 0.375rem;
    box-shadow: none;
    transition: all .2s cubic-bezier(.68,-.55,.265,1.55); */}
        {/*     box-shadow: 0 1px 3px rgba(50,50,93,.15), 0 1px 0 rgba(0,0,0,.02);
    border: 0;
    transition: box-shadow .15s ease; */}
        <div className="mx-auto mt-[20px] flex items-center w-[70%] border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md">
          <MdEmail size={20} color="#adb5bd" className="ml-[10px] " />
          <input
            ref={emailRef}
            placeholder="email"
            autoComplete="new-email"
            type="email"
            // class="form-control"
            className="px-4 py-2 w-full outline-none"
          />
        </div>

        <div className="mx-auto mt-[20px] flex items-center w-[70%] border border-[#bebebe36] rounded-md shadow-sm lg:shadow-md">
          <RiLockPasswordFill size={20} color="#adb5bd" className="ml-[10px]" />
          <input
            ref={passwordRef}
            placeholder="password"
            autoComplete="new-password"
            type="password"
            // class="form-control"
            className="px-4 py-2 w-full outline-none"
          />
        </div>
        {/* color: #fff;
    background-color: #5e72e4;
    border-color: #5e72e4; */}

        <button
          onClick={handleSubmit}
          className="mx-auto mt-[20px] mb-[20px] w-[70%] bg-[#5e72e4] text-[white] py-[10px] rounded-md shadow-sm lg:shadow-md"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
