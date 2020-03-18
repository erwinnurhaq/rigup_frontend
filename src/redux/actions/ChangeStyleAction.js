import { CHANGE_STYLE } from './Types'

export const setChangeStyle = (prop, val) => {
    return { type: CHANGE_STYLE, payload: { prop, val } }
}