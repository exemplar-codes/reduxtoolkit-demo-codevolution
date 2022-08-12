const store = require("./store/store");
const { fetchUsers } = require("./store/slices/userSlice");

store.subscribe(() => console.log(store.getState()));

console.log(store.getState());
// store.dispatch(cakeActions.orderCake());
// store.dispatch(cakeActions.orderCake());
store.dispatch(fetchUsers());
