import { SET_PATIENT_DOP } from "./types"

export const setPatientDOP = (data) => {
    return {
        type: SET_PATIENT_DOP,
        dop: data
    }
}