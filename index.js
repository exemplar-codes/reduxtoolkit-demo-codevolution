const store = require("./asyncStore/store");

store.subscribe(() => console.log(store.getState()));
