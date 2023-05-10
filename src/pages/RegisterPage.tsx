import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterForm } from "../model/Request";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { fetchRegister, selectIsAuth } from "../redux/slices/auth";
import { IUser } from "../model/User";
import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<RegisterForm> = async (inputs) => {
    const data = await dispatch(fetchRegister(inputs));
    if (!data.payload) {
      return console.log("Не удалось зарегестрироваться");
    }
    if ((data.payload as IUser)?.token) {
      window.localStorage.setItem("user", (data.payload as IUser).token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className=" max-w-sm mx-auto flex flex-col gap-4">
      Reg
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4">
        <input
          type="text"
          className="p-2 px-4 bg-slate-100 rounded-2xl"
          {...register("firstname", { required: "Укажите Ваше имя" })}
          placeholder="firstname"
        />
        {errors.firstname?.message}
        <input
          type="text"
          className="p-2 px-4 bg-slate-100 rounded-2xl"
          {...register("lastname", { required: "Укажите Вашу фамилию" })}
          placeholder="lastname"
        />
        {errors.lastname?.message}
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
      <Link to={'/login'}>login</Link>
    </div>
  );
};

export default RegisterPage;
