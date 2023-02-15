import { SET_PATIENT_VAS_VALUE_MIN } from "./types"

export const setPatientVASValueMin = (data) => {
    return {
        type: SET_PATIENT_VAS_VALUE_MIN,
        value: data
    }
}