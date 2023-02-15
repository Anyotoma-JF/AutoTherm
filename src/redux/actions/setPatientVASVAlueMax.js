import { SET_PATIENT_VAS_VALUE_MAX } from "./types"

export const setPatientVASValueMax = (data) => {
    return {
        type: SET_PATIENT_VAS_VALUE_MAX,
        value: data
    }
}