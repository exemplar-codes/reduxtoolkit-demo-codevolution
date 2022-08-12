const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios").default;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// const fetchUsersThunk = createAsyncThunk("async/fetchUsers", () => {
//   return async function (dispatch, getState) {
//     try {
//       dispatch(fetchUsersRequest());

//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/users`
//       );
//       const users = response.data;

//       dispatch(fetchUsersSuccess({ bingo: getState() }));
//     } catch (error) {
//       dispatch(fetchUsersFailure(error.message));
//     }
//   };
// });

// generates action types which have an extra property - fulfilled, pending, rejected
const fetchUsers = createAsyncThunk("user/fetchUsers", () =>
  axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => response.data.map((user) => user.id))
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersRequest(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    },
  },
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
