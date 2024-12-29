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
    <div>
      {user && <button onClick={logout}>Log Out</button>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />
        <input {...register("password")} />
        <input type="submit" value={"Login"} />
      </form>
    </div>
  );
};

export default Login;
