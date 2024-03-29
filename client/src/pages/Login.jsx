import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks/useForm";
import { LOGIN } from "../mutations/authMutations";
import validateLoginSchema from "../validation/loginValidation";

export default function Login() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
  };

  const { onChange, values } = useForm(initialState);

  const [loginUser, { loading, error }] = useMutation(LOGIN, {
    variables: {
      email: values.email,
      password: values.password,
    },
    onCompleted: (data) => {
      login(data.login);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error during login:", error);
      toast.error("Failed to log in");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = validateLoginSchema(values);

      if (error) {
        const formattedErrors = error.details.reduce((acc, currentError) => {
          acc[currentError.path[0]] = currentError.message.replace(
            /['"]+/g,
            ""
          );
          return acc;
        }, {});

        setErrors(formattedErrors);
        return;
      } else {
        setErrors({});
      }
      await loginUser();
    } catch (error) {}
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full dark:bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                noValidate
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={onChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={onChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border border-transparent hover:border-gray-400"
                >
                  Sign in
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
