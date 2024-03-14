import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

console.log("auth reducer running");

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("user_name", data.user_name);
    formData.append("image", data.image);
    const response = await fetch("http://3.25.202.222:5000/user/signup", {
      method: "POST",

      body: formData,
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result));
      }
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkToken = createAsyncThunk("addtoken", () => {
  const result = localStorage.getItem("token");
  return result;
});
const loggedInUser = localStorage.getItem("user");
const user = JSON.parse(loggedInUser);
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    loggedInUser: user ? user : null,
    loading: false,
    err: null,
    loginMsg: null,
    signupMsg: null,
    achieved: "",
  },
  reducers: {
    resetState: (state) => {
      state.loginMsg = null;
      state.signupMsg = null;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log(action);
        console.log("entering");
        state.loading = false;
        state.signupMsg = action.payload.msg;
        state.achieved = action.payload.success;
        console.log(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log("rejected");
        console.log(action);
        state.loading = false;
        state.signupMsg = action.payload.msg;
        state.achieved = action.payload.success;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginMsg = action.payload.msg;
        state.achieved = action.payload.success;
        if (action.payload.success) {
          state.loggedInUser = action.payload;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        // state.achieved = action.payload.success;
        // state.loginMsg = action.payload.msg;

        console.log(state);
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.achieved = action.payload.success;
      });
  },
});
export const { resetState, logout } = userDetail.actions;
export default userDetail.reducer;
