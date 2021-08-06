import {
    GET_DETAIL,
    GET_DETAIL_FAILED,
    CLEAR_DETAIL
} from "../actions/types"

const initialState = {
    movie: [],
    loading: true,
    error: {}
}

const movieReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_DETAIL:
            return {
                ...state,
                movie: payload,
                loading: false
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                movie: [],
                loading: false
            }
        case GET_DETAIL_FAILED:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default:
            return {
                ...state
            }
    }
}

export default movieReducer;