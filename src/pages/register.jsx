import { useForm } from "react-hook-form";
import { axiosInstance } from "../client/api";
import userStore from "../store/user";
const Register = () => {
  const { register, getValues, handleSubmit } = useForm();
  const { login, logout } = userStore();
  const onSubmit = async () => {
    try {
      const { name, email, password } = getValues();

      console.log("sending login request with: ", { name, email, password });
      const response = await axiosInstance.post("/users/", {
        name,
        email,
        password,
      });
      console.log("logging");
      console.log("login successful!", response.data);
      login(response.data.user, response.data.token);
    } catch (error) {
      console.log("error during logging", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logout Button */}
      <button
        onClick={logout}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
      >
        Log Out
      </button>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        {/* Name Input */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <input
          type="submit"
          value="Login"
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Register;
