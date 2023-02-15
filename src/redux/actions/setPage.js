import { SET_PAGE } from "./types"

export const setPage = (data) => {
    return {
        type: SET_PAGE,
        page: data
    }
}