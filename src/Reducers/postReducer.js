import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

console.log("post reducer running");
export const getAllPosts = createAsyncThunk(
  "getAllPosts",
  async (_, { rejectWithValue }) => {
    const user = localStorage.getItem("user");

    const responseDataObject = JSON.parse(user);
    const token = responseDataObject.token;
    try {
      const response = await fetch(
        "https://shiv-backend.shop/posts/getAllPosts",
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

export const getAllUserPost = createAsyncThunk(
  "getAllUserPost",
  async (userId, { rejectWithValue }) => {
    const user = localStorage.getItem("user");

    const responseDataObject = JSON.parse(user);
    const token = responseDataObject.token;

    try {
      const response = await fetch(
        `https://shiv-backend.shop/posts/getAllPosts/${userId}`,
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

export const createPost = createAsyncThunk(
  "createPost",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    const user = localStorage.getItem("user");

    const responseDataObject = JSON.parse(user);
    const token = responseDataObject.token;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image);

    formData.append("category", data.category);
    const response = await fetch("https://shiv-backend.shop/posts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const getPostById = createAsyncThunk(
  "getPostById",
  async (postId, { rejectWithValue }) => {
    console.log("running in postId");
    console.log("In the reducer " + postId);
    const user = localStorage.getItem("user");

    const responseDataObject = JSON.parse(user);
    const token = responseDataObject.token;
    try {
      const response = await fetch(
        `https://shiv-backend.shop/posts/getPosts/${postId}`,
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

export const applicationPosts = createSlice({
  name: "postDetail",
  initialState: {
    posts: [],
    singlePost: {},
    userPosts: [],
    postMessage: null,
    achieved: null,
    loading: null,
  },
  reducers: {
    resetState: (state) => {
      state.postMessage = null;
    },
  },
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
        console.log("payload is " + action.payload);
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.postMessage = action.payload.msg;
        state.achieved = action.payload.success;
      })
      .addCase(createPost.rejected, (state, action) => {})

      .addCase(getAllUserPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUserPost.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(getAllUserPost.rejected, (action, state) => {});
  },
});
export const { resetState } = applicationPosts.actions;
export default applicationPosts.reducer;
