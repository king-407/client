import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    const response = await fetch("http://localhost:5000/user/signup", {
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

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    token: "",
    loading: false,
    err: null,
    msg: "",
    achieved: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log(action);
        console.log("entering");
        state.loading = false;
        state.msg = action.payload.msg;
        state.achieved = action.payload.success;
        console.log(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log("rejected");
        console.log(action);
        state.loading = false;
        state.msg = action.payload.msg;
        state.achieved = action.payload.success;
      });
  },
});
export const {} = userDetail.actions;
export default userDetail.reducer;
