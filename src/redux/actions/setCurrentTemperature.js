import { SET_CURRENT_TEMPERATURE } from "./types"

export const setCurrentTemperature = (data) => {
    return {
        type: SET_CURRENT_TEMPERATURE,
        temperature: data
    }
}