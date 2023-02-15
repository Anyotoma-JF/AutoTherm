import { SET_PATIENT_VAS_VALUE_AVG } from "./types"

export const setPatientVASValueAVG = (data) => {
    return {
        type: SET_PATIENT_VAS_VALUE_AVG,
        value: data
    }
}