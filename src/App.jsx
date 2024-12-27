// import AppRouter from "./AppRouter";

// const App = () => {
//     return <AppRouter />;
// };

// export default App;

//skh@gmail.com
//pass@123

// import axios from "axios";
// import { useForm } from "react-hook-form";
// import userStore from "./store/user";
import AppRouter2 from "./AppRouter2";

const App = () => {
  // const { register, handleSubmit, getValues } = useForm();
  // const { login, user } = userStore();

  // const onSubmit = async () => {
  //   try {
  //     const { email, password } = getValues();
  //     const response = await axios.post("http://localhost:3000/users/login", {
  //       email,
  //       password,
  //     });
  //     console.log("response", JSON.stringify(response.data, null, 2));
  //     login(response.data);
  //     console.log(email, password);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // console.log("user", JSON.stringify(user, null, 2));

  return (
    <AppRouter2 />
    // <div>
    //   <p>{user?.name}</p>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div>
    //       <input {...register("email")} placeholder="Email" />
    //       <input {...register("password")} placeholder="Password" />
    //       <button type="submit">Login</button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default App;
