import axios from 'axios'

import { GET_DETAIL, GET_DETAIL_FAILED } from "./types";

export const searchMovies = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://www.omdbapi.com/?apikey=faf7e5bb&i=${id}`);
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