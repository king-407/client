import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

console.log("comment reducer running");
export const getAllComments = createAsyncThunk(
  "getAllComments",
  async (postId, { rejectWithValue }) => {
    const user = localStorage.getItem("user");

    const responseDataObject = JSON.parse(user);
    const token = responseDataObject.token;
    try {
      const response = await fetch(
        `http://localhost:5000/comments/getAllCommentsOfaPost/${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue("Failed to create post"); // Pass error message instead of the entire error object
    }
  }
);

export const writeComment = createAsyncThunk(
  "writeComment",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const user = localStorage.getItem("user");

    const responseDataObject = JSON.parse(user);
    const token = responseDataObject.token;

    try {
      const response = await fetch(
        `http://localhost:5000/comments/writeComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to upload comment"); // Pass error message instead of the entire error object
    }
  }
);

export const postComments = createSlice({
  name: "postComents",
  initialState: {
    comments: [],
    achieved: null,
    commentMessage: null,
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;

        state.comments = action.payload;

        console.log(action.payload);
      })
      .addCase(getAllComments.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(writeComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(writeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.achieved = action.payload.success;
        state.commentMessage = action.payload.msg;
        console.log(action.payload);
      })
      .addCase(writeComment.rejected, (state, action) => {});
  },
});
export const {} = postComments.actions;
export default postComments.reducer;
