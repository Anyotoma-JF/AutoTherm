import { SET_PATIENT_NAME } from "./types"

export const setPatientName = (data) => {
    return {
        type: SET_PATIENT_NAME,
        name: data
    }
}