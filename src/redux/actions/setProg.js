import { SET_PROG } from "./types"

export const setProg = (data) => {
    return {
        type: SET_PROG,
        prog: data
    }
}