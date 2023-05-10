import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage,  { loader as userLoader } from "./pages/ProfilePage";
import FriendPage from "./pages/FriendsPage";
import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import { fetchAuth } from "./redux/slices/auth";


const router = createBrowserRouter([
  {
      path: "/",
      element: <Root/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":userId",
          element: <ProfilePage />,
          
        },
        {
          path: "friends",
          element: <FriendPage/>,
         
        },
        {
          path: "feed",
          element: <FeedPage/>,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/register",
      element: <RegisterPage/>,
      errorElement: <ErrorPage />
    }
  ]);
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuth());
    console.log("APP")
  }, [])
  return (
    <RouterProvider router={router} />
  )
}

export default App
