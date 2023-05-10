import { NavLink } from "react-router-dom";

interface MenuItemProps{
    text: string,
    icon: string,
    link: string
}
const MenuItem = ({text,icon,link}:MenuItemProps) => {
    return ( 
        <NavLink to={link}  className={({ isActive }) => `flex items-center gap-2 cursor-pointer hover:bg-slate-200/50 rounded-md p-1 ${isActive&&'bg-slate-200/50'}`}>
            <span className="material-symbols-rounded">{icon}</span>
            {text}
        </NavLink>
     );
}
 
export default MenuItem;