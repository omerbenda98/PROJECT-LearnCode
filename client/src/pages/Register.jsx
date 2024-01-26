import React, { useContext } from "react";
import { GET_USERS } from "../queries/userQueries";

import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks/useForm";
import { REGISTER } from "../mutations/authMutations";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    role: false,
  };

  const { onChange, onSubmit, values } = useForm(initialState);

  const [register] = useMutation(REGISTER, {
    variables: {
      email: values.email,
      password: values.password,
      role: values.role === true ? "SUBSCRIBED" : "NORMAL",
    },
    onCompleted: (data) => {
      login(data.register);
      navigate("/");
    },
    update(cache, { data: { register } }) {
      const data = cache.readQuery({ query: GET_USERS });
      if (data) {
        cache.writeQuery({
          query: GET_USERS,
          data: { users: [...data.users, register] },
        });
      }
    },
    onError(error) {
      console.error("Error executing register mutation:", error);
      console.log(error.graphQLErrors);
      console.log(error.networkError);
      toast.error("Failed to create user");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await register({
        variables: {
          email: values.email,
          password: values.password,
          role: values.role === true ? "SUBSCRIBED" : "NORMAL",
        },
      });
      toast.success("User created successfully");
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 mt-5 ">
        <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-gray rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form
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
                    placeholder="example@gmail.com"
                    required=""
                    value={values.email}
                    onChange={onChange}
                  />
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
                    value={values.password}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={values.confirmPassword}
                    onChange={onChange}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="role"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      checked={values.role}
                      onChange={onChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      Subscribe for access to{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Courses, Lessons, and Quizes
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border border-transparent hover:border-gray-400"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
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
