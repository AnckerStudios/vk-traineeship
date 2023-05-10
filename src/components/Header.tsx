import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    return <Navigate to="login"/>
  };
  const user = useSelector(selectUser);

  return (
    <div className="h-14 bg-indigo-300 p-2 fixed w-full">
      <div className=" max-w-3xl mx-auto flex justify-between items-center  h-full">
        <div>VK</div>
        <div className="h-full flex items-center gap-4 ">
          <img
            src={user?.photo}
            className="rounded-full h-full cursor-pointer"
          ></img>
          <span
            onClick={onClickLogout}
            className="material-symbols-rounded text-4xl cursor-pointer select-none"
          >
            logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
