import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/auth";

const user = useSelector(selectUser);
export const menuArr = [
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