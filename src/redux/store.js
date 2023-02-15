import { combineReducers, createStore } from "redux";
import { autoThermReducer } from "./reducers/autoThermReducer";
import { patientReducer } from "./reducers/patientReducer";
import { therapyReducer } from "./reducers/therapyReducer";


const rootReducer = combineReducers({
    autoTherm: autoThermReducer,
    patient: patientReducer,
    therapy: therapyReducer
})
export const store = createStore(rootReducer);