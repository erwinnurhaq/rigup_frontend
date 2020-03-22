import { SEARCH_TEXTBOX } from './Types'

export const setSearch = (data) => {
    return { type: SEARCH_TEXTBOX, payload: data }
}