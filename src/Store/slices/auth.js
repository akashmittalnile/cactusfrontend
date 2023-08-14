import { api } from '../../utils/api.utils';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ApiService from "../../core/services/ApiService";
const cactus = JSON.parse(localStorage.getItem("cactus"));

export const login = createAsyncThunk(
  api.login,
  async ({ email, password, fcm_token }, thunkAPI) => {
    try {
      const response = await ApiService.postAPI(api.login, { email, password, fcm_token });
      if (response.data.headers.success !== 1) {
        thunkAPI.dispatch(setMessage(response.data.headers.message));
        return thunkAPI.rejectWithValue();
      } else {
        if (response.data.body.user_role_id === 1 && response.data.body.token) {
          const body = response.data.body;
          const localData = { token: body.token, userId: body.id, email: body.emailid, role_id: body.user_role_id};
          localStorage.setItem("cactus", JSON.stringify(localData));
          thunkAPI.dispatch(setMessage(response.data.headers.message));
          return { cactus: response.data.body };
        } else {
          thunkAPI.dispatch(setMessage("Something went wrong! please try again."));
          return thunkAPI.rejectWithValue();
        }
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("cactus");
});

const initialState = cactus
  ? { isLoggedIn: true, cactus }
  : { isLoggedIn: false, cactus: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.cactus = action.payload.cactus;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.cactus = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.cactus = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;