import { SET_PATIENT_GENDER } from "./types"

export const setPatientGender = (data) => {
    return {
        type: SET_PATIENT_GENDER,
        gender: data
    }
}