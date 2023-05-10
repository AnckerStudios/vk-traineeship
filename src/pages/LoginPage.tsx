import { Link, Navigate } from "react-router-dom";
import { IUser } from "../model/User";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticateForm } from "../model/Request";
import { fetchLogin, selectIsAuth } from "../redux/slices/auth";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<AuthenticateForm>();
    
      const isAuth = useSelector(selectIsAuth);
      const dispatch = useAppDispatch();
    
      const onSubmit: SubmitHandler<AuthenticateForm> = async (inputs) => {
        const data = await dispatch(fetchLogin(inputs));
        if (!data.payload) {
          return console.log("Не удалось авторизоваться");
        }
        if ((data.payload as IUser)?.token) {
          window.localStorage.setItem("user", (data.payload as IUser).token);
        }
      };
    
      if (isAuth) {
        return <Navigate to="/feed" />;
      }
    return ( 
        <div className=' max-w-sm mx-auto flex flex-col gap-4'>
            <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4">
            <input
          type="text"
          className="p-2 px-4 bg-slate-100 rounded-2xl"
          {...register("email", { required: "Укажите E-mail" })}
          placeholder="E-mail"
        />
        {errors.email?.message}
        <input
          type="password"
          className="p-2 px-4 bg-slate-100 rounded-2xl"
          {...register("password", { required: "Укажите пароль" })}
          placeholder="password"
        />
        {errors.password?.message}
        <button type="submit" className=" bg-red-400 p-2">
          ok
        </button>
            </form>
            <Link to={'/register'}>register</Link>
        </div>
     );
}
 
export default LoginPage;