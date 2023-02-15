import { SET_PREFERRED_DEVICE } from "./types"

export const setPreferredDevice = (data) => {
    return {
        type: SET_PREFERRED_DEVICE,
        device: data
    }
}