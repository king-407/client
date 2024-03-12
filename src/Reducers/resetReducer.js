import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

console.log("user reducer running");

export const sendToken = createAsyncThunk(
  "sendToken",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await fetch(
        "http://localhost:5000/user/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error); // Pass error message instead of the entire error object
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data, { rejectWithValue }) => {
    const { resetId, ...values } = data;

    try {
      const response = await fetch(
        `http://localhost:5000/user/resetPassword/${resetId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error); // Pass error message instead of the entire error object
    }
  }
);
const initialState = {
  loading: false,
  resetMsg: null,
  achieved: null,
};
export const resetReducer = createSlice({
  name: "resetReducer",
  initialState,
  reducers: {
    resetState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendToken.fulfilled, (state, action) => {
        state.loading = false;
        state.resetMsg = action.payload.msg;
        state.achieved = action.payload.success;
      })
      .addCase(sendToken.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetMsg = action.payload.msg;
        state.achieved = action.payload.success;
      })
      .addCase(changePassword.rejected, (state, action) => {});
  },
});
export const { resetState } = resetReducer.actions;
export default resetReducer.reducer;
