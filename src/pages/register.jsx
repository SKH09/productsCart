import { useForm } from "react-hook-form";
import { axiosInstance } from "../client/api";
import userStore from "../store/user";
const Register = () => {
  const { register, getValues, handleSubmit } = useForm();
  const { login, logout } = userStore();

  const onSubmit = async () => {
    try {
      const { name, email, password, image } = getValues();

      console.log("sending login request with: ", {
        name,
        email,
        password,
        image,
      });
      const response = await axiosInstance.post("/users/create", {
        name,
        email,
        password,
        image,
      });
      console.log("user created successfully!", response.data.user);
      login(response.data.user, response.data.token);
    } catch (error) {
      console.error("error during logging", error);
      if (error.response) {
        console.log("response error: ", error.response.data);
        console.log("response status: ", error.response.status);
      }
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
          <input
            id="name"
            placeholder="Name"
            type="text"
            {...register("name")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <input
            id="email"
            placeholder="Email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            id="password"
            placeholder="Password"
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          id="image"
          placeholder="please enter image url here..."
          type="text"
          {...register("image")}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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
