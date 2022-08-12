const { configureStore } = require("@reduxjs/toolkit");

const cakeReducer = require('./slices/cakeSlice');
const iceCreamReducer = require('./slices/iceCreamSlice');

const store = configureStore({
    reducer: {
        cake: cakeReducer, iceCream: iceCreamReducer
    }
})

module.exports = store;
