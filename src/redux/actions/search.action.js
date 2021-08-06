import axios from 'axios'

import { SEARCH_MOVIES, SEARCH_MOVIES_FAILED, GET_MORE_RESULTS } from "./types";

export const searchMovies = (title) => async dispatch => {
    try {
        const res = await axios.get(`http://www.omdbapi.com/?apikey=2a818054&s=${title}`);
        dispatch({
            type: SEARCH_MOVIES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: SEARCH_MOVIES_FAILED,
            payload: err
        })
    }
}

export const getMoreResults = (title, page) => async dispatch => {
    try {
        const res = await axios.get(`http://www.omdbapi.com/?apikey=2a818054&s=${title}&page=${page}`);
        dispatch({
            type: GET_MORE_RESULTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: SEARCH_MOVIES_FAILED,
            payload: err
        })
    }
}