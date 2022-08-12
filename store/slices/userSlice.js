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

// 1. all async ops use promises, so create a promise based async construct
// 2. we also need to have action creators, which are a must in RTK
// so we'll create an action creator that works with the Thubk middleware internally
// and
// 3.  we'll specify the reducer part as an extra Reducer in the slice - with 3 actions - fullfilled, rejected, pending. All 3 are directly attached to the action creator function, since functions are objects.
// Note: the action creator is outside of actions
