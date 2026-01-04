import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { imgUpload } from "../utils";
import { IoEyeOff } from "react-icons/io5";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    const displayName = event.target.displayName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const imageFile = event.target.image.files[0];

    if (!imageFile) {
      toast.error("Please select a profile picture!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter!");
      return;
    }

    try {
      setLoading(true);

      // ImgBB upload
      const photoURL = await imgUpload(imageFile);

      const result = await createUser(email, password);
      await updateUserProfile(displayName, photoURL);

      await fetch(
        "https://social-development-event-server-mu.vercel.app/users",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: displayName,
            email,
            photoURL,
          }),
        }
      );

      toast.success("User registered successfully!");
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const toastId = toast.loading("Creating user...");

    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        fetch("https://social-development-event-server-mu.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }),
        });
        toast.update(toastId, {
          render: "Registration successful!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.update(toastId, {
          render: error.message || "Google registration failed",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="card bg-base-100 border border-gray-200 w-[94%] md:w-full mx-auto max-w-sm shrink-0 shadow">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            {/* Name field */}
            <label className="label">Name</label>
            <input
              type="text"
              name="displayName"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Name"
              required
            />

            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Email"
              required
            />

            {/* Add Profile Picture */}
            <div>
              <label
                htmlFor="image"
                className="block mt-1 mb-2 text-[13px] font-medium"
              >
                Add Profile Picture
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="block w-[95%] text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-purple-700 
                hover:file:bg-indigo-100
                bg-gray-100 border border-dashed border-indigo-300 rounded-md cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                py-2"
              />
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            {/* password field */}
            <div className="relative">
              <label className="block text-sm mb-1">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="input rounded-full focus:border-0 focus:outline-gray-200"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-8 top-9 cursor-pointer z-50"
              >
                {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
              </span>
            </div>

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button
              disabled={loading}
              className="btn text-white mt-4 rounded-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:from-gray-600 hover:to-gray-500"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border-[#e5e5e5]"
        >
          <FaGoogle />
          Login with Google
        </button>
        <p className="text-center">
          Already have an account? Please{" "}
          <Link className="text-blue-500 hover:text-blue-800" to="/auth/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
