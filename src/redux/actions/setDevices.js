import { SET_DEVICES } from "./types"

export const setDevices = (data) => {
    return {
        type: SET_DEVICES,
        devices: data
    }
}