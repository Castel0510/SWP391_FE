import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
  const apiUrlCommentGet =
    "https://apis20231023230305.azurewebsites.net/api/Comment/Get?pageIndex=0&pageSize=10";

  const response = await fetch(apiUrlCommentGet);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  const data = await response.json();
  return data.result.items;
});
export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const apiUrlCreateComment =
        "https://apis20231023230305.azurewebsites.net/api/Comment/Create";

      const response = await fetch(apiUrlCreateComment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          console.log("Fetched comments data:", action.payload);
          state.status = "succeeded";
          state.comments = action.payload;
        } else {
          console.error("Invalid payload structure:", action.payload);
          state.status = "failed";
          state.error = "Invalid payload structure";
        }
      })
      
      
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload); 
      })
      
      .addCase(createComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;

