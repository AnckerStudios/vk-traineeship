import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios";
import { IUser } from "../../model/User";
import { AuthenticateForm, RegisterForm } from "../../model/Request";

interface userResponse {
  data: IUser;
}

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params: AuthenticateForm) => {
    const { data } = await axios.post<AuthenticateForm, userResponse>(
      "/api/auth/authenticate",
      params
    );
    console.log("User?", data);

    return data;
  }
);
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterForm) => {
    const { data } = await axios.post<RegisterForm, userResponse>(
      "/api/auth/register",
      params
    );
    return data;
  }
);
export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async () => {
    const { data } = await axios.get<any,userResponse>(
      "/api/auth/authorization"
    );
    return data;
  }
);

interface CounterState {
  user: IUser | null;
  status: string;
  //   token: string | null
}

// Define the initial state using that type
const initialState: CounterState = {
  user: null,
  status: "loading",
  //   token: null
};
export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<CounterState>) => {
      state.user = action.payload.user;
      status: "load";
      //   state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = "loading";
      state.user = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = "error";
      state.user = null;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.user = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = "error";
      state.user = null;
    });
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
      state.user = null;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = "error auth";
      state.user = null;
    });
  },
});

export const authReducer = authSlice.reducer;
export const selectIsAuth = (state: { auth: CounterState }) => Boolean(state.auth.user);
export const selectUser = (state: { auth: CounterState }) => state.auth.user;
export const { logout, setUser } = authSlice.actions;
