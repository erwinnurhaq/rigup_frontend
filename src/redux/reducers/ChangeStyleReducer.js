import { CHANGE_STYLE } from '../actions/Types'

const initialState = {
    changeNav: false,
    changeCategoryBox: false,
    changeBrowseProducts: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_STYLE:
            return { ...state, [action.payload.prop]: action.payload.val }
        default:
            return state
    }
}