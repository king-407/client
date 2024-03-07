import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getAllComments = createAsyncThunk(
  "getAllComments",
  async (postId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
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
  async (data, postId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/post/createComment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
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

export const postComments = createSlice({
  name: "postComents",
  initialState: {
    comments: [],

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
        console.log("Get comments " + action.payload);
        state.comments = action.payload;

        console.log(action.payload);
      })
      .addCase(getAllComments.rejected, (state, action) => {
        console.log(action);
      });
  },
});
export const {} = postComments.actions;
export default postComments.reducer;
