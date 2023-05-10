import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import LoginPage from './pages/LoginPage.tsx';

import { Provider } from 'react-redux';
import store from './redux/store.ts';
import ProfilePage from './pages/ProfilePage.tsx';
import FriendPage from './pages/FriendsPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import FeedPage from './pages/FeedPage.tsx';


  
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <Provider store={store}>
      <App/>
    </Provider>

)
