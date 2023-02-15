import { SET_PATIENT_POST_FEELINGS } from "./types"

export const setPatientPostFeelings = (data) => {
    return {
        type: SET_PATIENT_POST_FEELINGS,
        value: data
    }
}