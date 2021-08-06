import axios from 'axios'

import { GET_DETAIL, GET_DETAIL_FAILED, CLEAR_DETAIL } from "./types";

export const getMovieDetails = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://www.omdbapi.com/?apikey=2a818054&i=${id}`);
        dispatch({
            type: GET_DETAIL,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_DETAIL_FAILED,
            payload: err
        })
    }
}

export const clearDetailPage = () => async dispatch => {
    dispatch({
        type: CLEAR_DETAIL,
    })
}