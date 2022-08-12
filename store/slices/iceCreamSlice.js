const { createSlice } = require("@reduxjs/toolkit");

const initialState = { numOfIceCreams: 20 };
const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState,
  reducers: {
    ordericeCream(state) {
      state.numOfIceCreams--;
    },
    restockiceCream(state, action) {
      state.numOfIceCreams += action.payload;
    },
  },
  extraReducers: {
    ["cake/orderCake"]: (state) => {
      state.numOfIceCreams--;
    },
  },
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;
