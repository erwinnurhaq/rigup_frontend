const initialState = {
    courierList: null,
    selectedCourier: 2
}

export default (state=initialState, action) => {
    switch(action.type){
        case 'COURIER_FETCHED':
            return {...state, courierList: action.payload}
        case 'SELECT_COURIER':
            return {...state, selectedCourier: action.payload}
        case 'COURIER_EMPTY':
            return initialState
        default:
            return state
    }
}