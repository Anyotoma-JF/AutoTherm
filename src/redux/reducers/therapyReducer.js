import { SET_CURRENT_TEMPERATURE, SET_THERAPY_DURATION, SET_THERAPY_TEMPERATURE, UNSET_THERAPY } from "../actions/types"

const initialState = {
    temperature: "",
    duration: "",
    currentTemperature: ""
}
export const therapyReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_THERAPY_TEMPERATURE:
            return {...state, temperature: action.temperature}
        case SET_THERAPY_DURATION:
            return {...state, duration: action.duration}
        case SET_CURRENT_TEMPERATURE:
            return {...state, currentTemperature: action.temperature}
        case UNSET_THERAPY:
            return initialState
        default:
            return state
    }
}