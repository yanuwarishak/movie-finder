import {
    SEARCH_MOVIES,
    SEARCH_MOVIES_FAILED,
    GET_MORE_RESULTS
} from "../actions/types"

const initialState = {
    movies: [],
    loading: true,
    hasMore: false,
    error: {}
}

const searchReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SEARCH_MOVIES:
            return {
                ...state,
                movies: payload.Search,
                hasMore: payload.totalResults > 10,
                loading: false
            }
        case GET_MORE_RESULTS:
            return {
                ...state,
                movies: [...state.movies, ...payload.Search],
                hasMore: state.movies.length < payload.totalResults,
                loading: false
            }
        case SEARCH_MOVIES_FAILED:
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

export default searchReducer;