import { combineReducers } from 'redux';
import searchReducer from './search.reducer';
import movieReducer from './movie.reducer';

const rootReducer = combineReducers({
    searchRes: searchReducer,
    movie: movieReducer,
})

export default rootReducer;