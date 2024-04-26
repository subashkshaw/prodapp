"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import auth from "../Data/auth.json";

const Auth: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = auth.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Simulate successful login by storing user info in session storage
      sessionStorage.setItem("user", JSON.stringify(user));
      // Set authenticated flag in session storage
      sessionStorage.setItem("authenticated", "true");
      // Redirect to dashboard after login
      router.push("component/ProducTable/");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="my-5">
                  <div className="mt-2">
                    <h3
                      className="mb-3 text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Login
                    </h3>
                    <div className="mt-2 ">
                      <div className="text-lg">
                        <form action="" className="  mx-auto rounded">
                          <div className="shadow">
                            <div className="mb-2  bg-purple-400 rounded border-purple-500 border-b">
                              <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter Email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className=" p-2 pl-0 bg-transparent placeholder-purple-300  outline-none text-white overflow-ellipsis overflow-hidden"
                              />
                            </div>
                            <div className=" bg-purple-400  rounded border-purple-500 mb-10">
                              <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=" p-2 pl-0 bg-transparent placeholder-purple-300 outline-none text-white overflow-ellipsis overflow-hidden"
                              />
                            </div>
                          </div>
                          <button
                            onClick={handleLogin}
                            className="bg-pink-400 block w-full rounded py-2 text-white font-bold shadow"
                          >
                            Submit
                          </button>
                          {error && <p style={{ color: "red" }}>{error}</p>}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
