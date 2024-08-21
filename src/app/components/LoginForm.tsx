"use client";
import React, { FormEvent, useState } from "react";
import { FormInputData } from "../types";
import { useAppContext } from "../context/ContextProvider";

type Props = {};

const LoginForm = (props: Props) => {
  const { handleSignIn, handleSignUp, userInfo } = useAppContext();
  const [showSignUp, setShowSignUp] = useState<boolean>(userInfo.loggedIn);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: FormInputData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      email: formData.get("email") as string,
      confirm: formData.get("confirm") as string,
    };
    console.log(data);

    if (showSignUp) {
      setStatusMessage("Creating your account...");
      const response = await handleSignUp(data);
      if (response.msg) {
        setTimeout(() => {
          setStatusMessage(response.msg);
        }, 500);
      } else {
        setTimeout(() => {
          setStatusMessage("Your account was created!");
        }, 500);
        console.log(`Welcome ${response.user.name}`);
        setTimeout(() => {
          setStatusMessage(`Welcome ${response.user.name}`);
        }, 1000);
      }
    } else {
      setStatusMessage("Signing into your account...");
      const response = await handleSignIn(data);
      if (response.msg) {
        setTimeout(() => {
          setStatusMessage(response.msg);
        }, 500);
      } else {
        console.log(`Welcome ${response.user.name}`);
        localStorage.setItem("user", response.token);
        setTimeout(() => {
          setStatusMessage(`Welcome ${response.user.name}`);
        }, 500);
      }
    }
    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  };

  return (
    <form
      key="loginComponent"
      onSubmit={(e) => handleFormSubmission(e)}
      className="flex flex-col items-center h-1/2 w-1/2 rounded-3xl p-10 bg-slate-600 text-slate-200 gap-6"
    >
      <div className="grid grid-cols-[1fr_3fr] grid-rows-4 text-[1.4rem] gap-4 flex-1 max-w-[50%]">
        {showSignUp && (
          <label className="justify-self-end self-center" htmlFor="email">
            Email:
          </label>
        )}
        {showSignUp && (
          <input
            className="bg-slate-800 rounded-2xl p-2 w-full"
            type="email"
            id="email"
            name="email"
          />
        )}
        <label
          className="justify-self-end self-center row-[2_/_span_1]"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          className="bg-slate-800 rounded-2xl p-2 w-full row-[2_/_span_1]"
          type="text"
          id="username"
          name="username"
        />

        <label
          htmlFor="password"
          className="justify-self-end self-center row-[3_/_span_1]"
        >
          Password:
        </label>

        <input
          className="bg-slate-800 rounded-2xl p-2 w-full row-[3_/_span_1]"
          type="password"
          id="password"
          name="password"
        />
        {showSignUp && (
          <label className="justify-self-end self-center" htmlFor="confirm">
            Confirm:
          </label>
        )}
        {showSignUp && (
          <input
            className="bg-slate-800 rounded-2xl p-2 w-full"
            type="password"
            id="confirm"
            name="confirm"
          />
        )}
      </div>
      <div className="flex flex-col items-center mt-auto">
        <button
          type="submit"
          className="bg-slate-800 text-[1.8rem] p-2 rounded-xl hover:scale-105 active:bg-slate-700 active:text-slate-800 transition-all"
        >
          {showSignUp ? "Sign Up" : "Sign In"}
        </button>
        <div>{statusMessage}</div>
        <button
          type="button"
          className="hover:text-slate-800 hover:cursor-pointer transition-all"
          onClick={() => setShowSignUp(!showSignUp)}
        >
          {showSignUp ? "Have an account?" : "Need an account?"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
