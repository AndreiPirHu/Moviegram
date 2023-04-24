import { combineReducers } from "redux";
import { reducer as loginReducer} from "./login";
import { reducer as cartItemsReducer} from "./cartitems";

const rootReducer = combineReducers({
  login: loginReducer,
  cartItems: cartItemsReducer
})

export {rootReducer};