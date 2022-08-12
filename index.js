const store = require('./store/store');
const { cakeActions } = require('./store/slices/cakeSlice');

store.subscribe(() => console.log(store.getState()))

store.dispatch(cakeActions.orderCake())
