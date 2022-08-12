const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios").default;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// generates action types which have an extra property - fulfilled, pending, rejected
const fetchUsers = createAsyncThunk("user/fetchUsers", () =>
  axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => response.data.map((user) => user.id))
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

module.exports = userSlice.reducer;
module.exports.userActions = userSlice.actions;
module.exports.fetchUsers = fetchUsers;
