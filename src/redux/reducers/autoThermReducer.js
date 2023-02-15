import { SET_DEVICES, SET_PAGE, SET_PREFERRED_DEVICE, SET_PROG, UNSET_AUTOTHERM } from "../actions/types";

const initialState = {
    page: 1,
    prog: 0,
    devices: [],
    preferredDevice: ""
}

export const autoThermReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_PAGE:
            return {...state, page: action.page}
        case SET_PROG:
            return {...state, prog: action.prog};
        case SET_DEVICES:
            return {...state, devices: action.devices};
        case SET_PREFERRED_DEVICE:
            return {...state, preferredDevice: action.device};
        case UNSET_AUTOTHERM:
            return initialState
        default:
            return state;
    }
}