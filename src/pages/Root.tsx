import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { fetchAuth, logout, selectIsAuth, selectUser } from "../redux/slices/auth";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import { useAppDispatch } from "../redux/store";
import { SubmitHandler } from "react-hook-form";
import { AuthenticateForm } from "../model/Request";
import { useEffect } from "react";

const Root = () => {
  const isAuth = useSelector(selectIsAuth);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  const user = useSelector(selectUser);

  useEffect(()=>{
    console.log("ROOT")
  },[])
  const menuArr = [
    {
      text: "Профиль",
      icon: "account_circle",
      link: "/"+user?.email,
    },
    {
      text: "Новости",
      icon: "demography",
      link: "/feed",
    },
    {
      text: "Друзья",
      icon: "group",
      link: "/friends",
    },
    {
      text: "Мессенджер",
      icon: "chat_bubble",
      link: "/",
    },
  ];
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto flex pt-14 gap-2">
        <div className=" w-52 h-20 mt-2 sticky top-16 flex flex-col gap-1">
          {menuArr.map((item,index)=>{return (
            <MenuItem key={index} text={item.text} icon={item.icon} link={item.link}/>
          )})}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
