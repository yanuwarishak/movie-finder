import { combineReducers } from 'redux';
import searchReducer from './search.reducer';
// import authReducer from './auth.reducer';
// import profileReducer from './profile.reducer';
// import postReducer from './post.reducer';

const rootReducer = combineReducers({
    searchRes: searchReducer,
    // auth: authReducer,
    // profile: profileReducer,
    // post: postReducer,
})

export default rootReducer;