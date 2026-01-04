import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        event.target.reset();
        toast.success("Logged in successfully!");
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed! Please check your credentials.");
      });
  };

  const handleGoogleSignIn = async () => {
    const toastId = toast.loading("Logging in with Google...");

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await fetch(
        "https://social-development-event-server-mu.vercel.app/users",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }),
        }
      );

      toast.update(toastId, {
        render: "Logged in successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate(location?.state || "/");
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "Google login failed!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="card bg-base-100 w-[94%] md:w-full mx-auto max-w-sm shrink-0 shadow border border-gray-200">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              defaultValue="user1@gmail.com"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Email"
            />

            <div className="relative">
              <label className="block text-sm mb-1">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                defaultValue="User1111@@gmail.com" 
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
            <button className="btn text-white mt-4 rounded-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:from-gray-600 hover:to-gray-500">
              Login
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
          New to our website? Please{" "}
          <Link
            className="text-blue-500 hover:text-blue-800"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
