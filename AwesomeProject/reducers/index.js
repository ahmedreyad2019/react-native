import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import loginReducer from "./loginReducer";
const rootReducer = combineReducers({
  filterReducer,loginReducer
});
export default rootReducer;
