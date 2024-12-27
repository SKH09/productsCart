import { useForm } from "react-hook-form";
import { axiosInstance } from "../client/api";
import userStore from "../store/user";
const Register = () => {
  const { register, getValues, handleSubmit } = useForm();
  const { login, logout } = userStore();
  const onSubmit = async () => {
    try {
      const { email, password, name } = getValues();

      console.log("sending login request with: ", { email, password });
      const response = await axiosInstance.post("/users/", {
        email,
        password,
        name,
      });
      console.log("logging");
      console.log("login successful!", response.data);
      login(response.data.user, response.data.token);
    } catch (error) {
      console.log("error during logging", error);
    }
  };

  return (
    <div>
      <button onClick={logout}>Log Out</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <input {...register("email")} />
        <input {...register("password")} />

        <input type="submit" value={"Login"} />
      </form>
    </div>
  );
};

export default Register;
