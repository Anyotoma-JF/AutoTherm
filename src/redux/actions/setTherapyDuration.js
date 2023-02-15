import { SET_THERAPY_DURATION } from "./types"

export const setTherapyDuration = (data) => {
    return {
        type: SET_THERAPY_DURATION,
        duration: data
    }
}