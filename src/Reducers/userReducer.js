import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

console.log("user reducer running");

export const getAllUser = createAsyncThunk(
  "getAllUser",
  async (_, { rejectWithValue }) => {
    const user = localStorage.getItem("user");

    const responseDataObject = JSON.parse(user);
    const token = responseDataObject.token;

    try {
      const response = await fetch("http://3.25.202.222:5000/user/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error); // Pass error message instead of the entire error object
    }
  }
);

export const followUser = createAsyncThunk(
  "followUser",
  async (data, { rejectWithValue }) => {
    const user = localStorage.getItem("user");

    const responseDataObject = JSON.parse(user);
    const token = responseDataObject.token;
    try {
      const response = await fetch("http://3.25.202.222:5000/user/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error); // Pass error message instead of the entire error object
    }
  }
);

export const userActivity = createSlice({
  name: "userActivity",
  initialState: {
    loading: false,
    users: [],
    followMsg: null,
    achieved: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(followUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        state.followMsg = action.payload.msg;
        state.achieved = action.payload.success;
      })
      .addCase(followUser.rejected, (state, action) => {});
  },
});
export const {} = userActivity.actions;
export default userActivity.reducer;
