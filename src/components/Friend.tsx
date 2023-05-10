import { Link } from "react-router-dom";
import { IUser } from "../model/User";
import axios from "../axios";
interface FriendProps {
  user: IUser;
  type: string
}
const Friend = ({ user, type }: FriendProps) => {

  const onAdd = () => {
    if(user.id){
      axios.get(`api/friend/add/${user.id}`).then(res=>{
        console.log(res.data);
      })
    }
    
  }
  // const onDel = () => {
  //   if(user.id){
  //     axios.get(`api/friend/add/${user.id}`).then(res=>{
  //       console.log(res.data);
  //     })
  //   }
    
  // }
  return (
    <div className="p-2 flex gap-4 justify-between items-center">
      <img
        className=" h-28 rounded-full object-cover w-28 border"
        src={user?.photo || "no-avatar.png"}
      />
      <div className="flex-grow h-full">
        <div>
          <Link
            to={`/${user.email}`}
            className=" text-blue-700 font-bold text-sm"
          >
            {user?.firstname} {user?.lastname}
          </Link>
        </div>
      </div>
      {type === 'all' ? <span className="material-symbols-rounded  text-red-800 select-none cursor-pointer text-4xl p-2 rounded-full">person_remove</span> :
       type === 'other' ? <span onClick={onAdd} className="material-symbols-rounded  text-green-500 select-none cursor-pointer text-4xl p-2 rounded-full">person_add</span>  : 
       <span  className="material-symbols-rounded  text-red-800 select-none cursor-pointer text-4xl p-2 rounded-full">person_remove</span> 
      }
      
    </div>
  );
};

export default Friend;
