import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getAllPosts = createAsyncThunk(
  "getAllPosts",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/posts/getPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error); // Pass error message instead of the entire error object
    }
  }
);

export const getPostById = createAsyncThunk(
  "getPostById",
  async (postId, { rejectWithValue }) => {
    console.log("In the reducer " + postId);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/posts/getPosts/${postId}`,
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
      return rejectWithValue(error); // Pass error message instead of the entire error object
    }
  }
);

export const applicationPosts = createSlice({
  name: "postDetail",
  initialState: {
    posts: [],
    singlePost: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;

        console.log(action.payload);
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(getPostById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePost = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const {} = applicationPosts.actions;
export default applicationPosts.reducer;
