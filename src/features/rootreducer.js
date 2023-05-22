import { combineReducers } from "redux";
import { reducer as loginReducer} from "./login";
import { reducer as cartItemsReducer} from "./cartitems";
import {reducer as reviewsReducer} from "./reviews"

const rootReducer = combineReducers({
  login: loginReducer,
  cartItems: cartItemsReducer,
  reviews: reviewsReducer
})

export {rootReducer};