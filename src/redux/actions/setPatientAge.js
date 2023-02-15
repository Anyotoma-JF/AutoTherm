import { SET_PATIENT_AGE } from "./types"

export const setPatientAge = (data) => {
    return {
        type: SET_PATIENT_AGE,
        age: data
    }
}