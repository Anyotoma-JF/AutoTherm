import { SET_PATIENT_ID } from "./types"

export const setPatientID = (data) => {
    return {
        type: SET_PATIENT_ID,
        id: data
    }
}