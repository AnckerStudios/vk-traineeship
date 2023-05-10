import { useEffect, useState } from "react";
import Friend from "../components/Friend";
import axios from "../axios";
import { IUser } from "../model/User";

// function authHeader() {
//   const userStr = localStorage.getItem("user");
//   if (userStr) {
//     return { Authorization: 'Bearer ' + '2123' };
//   } else {
//     return { Authorization: '' };
//   }
// }
const FriendPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selection,setSelection] = useState<string>('all')
  useEffect(() => {
    setUsers([]);
    axios.get(`api/friend/${selection}`).then(res=>{
      console.log(res.data);
      setUsers(res.data);
    })
  }, [selection]);

  return (
    <div className=" w-full border rounded-2xl mt-2 p-3 flex flex-col gap-3">
      <div className="flex gap-2">
        <button onClick={()=>{
          
          setSelection('all');
        }} className="hover:bg-slate-200 p-2 bg-slate-100 rounded-lg flex-grow basis-0">Мои друзья</button>
        <button onClick={()=>{
         
          setSelection('other');
          }} className="hover:bg-slate-200 p-2 bg-slate-100 rounded-lg flex-grow basis-0">Поиск друзей</button>
        <button onClick={()=>{
          
          setSelection('incoming');
          }} className="hover:bg-slate-200 p-2 bg-slate-100 rounded-lg flex-grow basis-0">Заявки</button>
      </div>
      <div className="flex">
        <input className=" p-[7px] w-full px-3 rounded-l-lg border text-sm outline-none" />
        <button className=" bg-slate-100 px-6 rounded-r-lg flex items-center border-y border-r">
          <span className="material-symbols-rounded">search</span>
        </button>
      </div>
      {users.map((item,index)=>{
        return <Friend key={index} user={item} type={selection}/>
      })}
    </div>
  );
};

export default FriendPage;
