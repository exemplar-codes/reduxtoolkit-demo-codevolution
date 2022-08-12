const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const asyncSlice = createSlice({
  name: "asyncSlice",
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
});

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

module.exports = asyncSlice.reducer;
module.exports.asyncActions = asyncSlice.actions;
