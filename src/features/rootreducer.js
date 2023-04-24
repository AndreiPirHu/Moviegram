import { combineReducers } from "redux";
import { reducer as loginReducer} from "./login";

const rootReducer = combineReducers({
  login: loginReducer,
  cartItems: cartItemsReducer
})

export {rootReducer};