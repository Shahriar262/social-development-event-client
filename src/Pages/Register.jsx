import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

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
    const result = await createUser(email, password);
    await updateUserProfile(displayName, photoURL);
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
    toast.loading("Creating user...", { id: "create-user" });
    signInWithGoogle()
      .then((result) => {
        toast.success("User created successfully!", { id: "create-user" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message || error.error, { id: "create-user" });
      });
  };


  return (
    <div className="card bg-base-100 border border-gray-200 w-[94%] md:w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            {/* email field */}
            <label className="label">Name</label>
            <input
              type="text"
              name="displayName"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Name"
              required
            />

            <label className="label">PhotoURL</label>
            <input
              type="text"
              name="photoURL"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Photo URL"
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
            {/* password field */}
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Password"
              required
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button disabled={loading} className="btn text-white mt-4 rounded-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:from-gray-600 hover:to-gray-500">
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
