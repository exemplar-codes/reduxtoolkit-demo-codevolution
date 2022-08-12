const { configureStore } = require("@reduxjs/toolkit");
const { logger } = require("redux-logger");

const cakeReducer = require("./slices/cakeSlice");
const iceCreamReducer = require("./slices/iceCreamSlice");

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, logger]),
});

module.exports = store;
