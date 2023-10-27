import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import AnimatedBee from "../components/AnimatedBee";
import Logo from "../assets/GreenHive.png";

// LOGIN PAGE //

//list of inputs asked for the register form with their types
type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

const login: React.FC = () => {
  //initialisation of the form, use the library react hook form
  const { register, handleSubmit, control } = useForm<FormData>({
    mode: "onChange",
  });
  const { errors } = useFormState({ control });
  const [show, setShow] = useState(false); //boolean state to display password or not

  //Function called when button register pressed
  const onSubmit = handleSubmit(({ email, password, remember }) => {
    console.log(email, password, remember);
  });

  return (
    <div className="bg-black h-screen w-full flex flex-col sm:flex-row ">
      <div className="w-full sm:w-3/5 relative bg-[#3C4C10] flex justify-center">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="Logo" className="w-80 h-80 " />
        </div>
        <AnimatedBee
          position="waggle"
          className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <AnimatedBee position="vertical" className="top-1/4 left-1/4" />
        <AnimatedBee position="horizontal" className="top-1/4 right-1/4" />
      </div>
      <div className="w-full sm:w-2/5 bg-[#C5D4BD] flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-12 border border-gray-300 rounded-lg">
          <div className="text-left text-3xl ">
            <h1 className="mb-6">Welcome to GreenHive!</h1>
          </div>
          <form className="space-y-8" onSubmit={onSubmit}>
            <div className="text-left">
              <label className="text-sm font-bold text-left block">Email</label>
              <input
                {...register("email", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                style={{ borderColor: errors.email ? "red" : "" }}
                name="email"
                type="text"
                className="w-full p-2 border border-grey-300 rounded mt-1 "
              />
              {errors.email && "Email is invalid"}
            </div>
            <div>
              <label className="text-sm font-bold text-left block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("password")}
                  name="password"
                  type={show ? "text" : "password"}
                  className="w-full p-2 border border-grey-300 rounded "
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {!show ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    {...register("remember")}
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-300 rounded"
                  />
                  <label htmlFor="" className="ml-2 text-grey-600">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="" className="font-medium text-sm text-blue-500">
                    Forgot Password
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full py-2 px-4 bg-[#3C4C10] hover:bg-[#26300A] rounded-lg text-white text-sm mb-3">
                  Sign in
                </button>
                <div className="px-6 sm:px-0 max-w-sm">
                  <button
                    type="button"
                    className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                  >
                    <svg
                      className="mr-2 -ml-1 w-4 h-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Sign in with Google<div></div>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div>
            <p className="text-center mt-3 text-[14px]">
              You do not have an account?
              <a href="/register" className="text-blue-500">
                {" "}
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
