import { useForm } from "react-hook-form";
import userStore from "../store/user";
import { useNavigate } from "react-router-dom";
import vine from "@vinejs/vine";
import { vineResolver } from "@hookform/resolvers/vine";
import { axiosInstance } from "../client/api";

const schema = vine.compile(
  vine.object({
    email: vine.string().email().minLength(1),
    password: vine.string().minLength(1),
  })
);

const Login = () => {
  const { register, getValues, handleSubmit, formState } = useForm({
    resolver: vineResolver(schema),
  });
  const { login, logout, user } = userStore();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const { email, password } = getValues();

      console.log("sending login request with: ", { email, password });
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log("logging");
      console.log("login successful!", response.data);
      login(response.data.user, response.data.token);

      navigate("/");
    } catch (error) {
      console.log("error during logging", error);
    }
  };

  console.log(formState);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded shadow-md space-y-4"
      >
        {/* login */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        {/* password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <p>
          Dont have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
        {/* Login button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
        {/* Logout button */}
        {user && (
          <button
            onClick={() => {
              logout();
              navigate("/home");
            }}
            className="mb-6 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
          >
            Log Out
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
