"use client";
import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div
      key="{loginPageRef}"
      className="flex flex-col justify-center items-center h-[80vh] w-[100vw]"
    >
      <LoginForm />
    </div>
  );
};

export default Login;
