import { SET_PATIENT_SD } from "./types"

export const setPatientSufferingDuration = (data) => {
    return {
        type: SET_PATIENT_SD,
        duration: data
    }
}