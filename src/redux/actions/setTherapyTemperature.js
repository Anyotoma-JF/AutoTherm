import { SET_THERAPY_TEMPERATURE } from "./types"

export const setTherapyTemperature = (data) => {
    return {
        type: SET_THERAPY_TEMPERATURE,
        temperature: data
    }
}