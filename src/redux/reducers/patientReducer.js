const { SET_PATIENT_NAME, SET_PATIENT_ID, SET_PATIENT_GENDER, SET_PATIENT_AGE, SET_PATIENT_DOP, SET_PATIENT_VAS_VALUE_AVG, SET_PATIENT_VAS_VALUE_MIN, SET_PATIENT_VAS_VALUE_MAX, SET_PATIENT_SD, SET_PATIENT_POST_FEELINGS, UNSET_PATIENT } = require("../actions/types");

const initialState = {
    name: "",
    id: "",
    gender: "",
    age: "",
    dop: "",
    VASValueAVG: 0, // slider value; skip verifying before post
    VASValueMin: 0, // slider value; skip verifying before post
    VASValueMax: 0, // slider value; skip verifying before post
    sufferingDuration: "",
    postFeelings: 0 // slider value; skip verifying before post
}

export const patientReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_PATIENT_NAME:
            return {...state, name: action.name};
        case SET_PATIENT_ID:
            return {...state, id: action.id};
        case SET_PATIENT_GENDER:
            return {...state, gender: action.gender};
        case SET_PATIENT_AGE:
            return {...state, age: action.age};
        case SET_PATIENT_DOP:
            return {...state, dop: action.dop};
        case SET_PATIENT_VAS_VALUE_AVG:
            return {...state, VASValueAVG: action.value};
        case SET_PATIENT_VAS_VALUE_MIN:
            return {...state, VASValueMin: action.value};
        case SET_PATIENT_VAS_VALUE_MAX:
            return {...state, VASValueMax: action.value};
        case SET_PATIENT_SD:
            return {...state, sufferingDuration: action.duration};
        case SET_PATIENT_POST_FEELINGS:
            return {...state, postFeelings: action.value};
        case UNSET_PATIENT:
            return initialState;
        default:
            return state;
    }
}
