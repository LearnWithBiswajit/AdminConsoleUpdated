// reducers/index.js (or root-reducer.js)
import { combineReducers } from 'redux'; // or '@reduxjs/toolkit' if using Redux Toolkit
import dashboardReducer from './dashboardReducer';
import deviceReducer from './device.reducer';
import userReducer from './users/user.reducer';
import { osReducer } from './os/os.reducer';
// import counterReducer from './counterReducer';
// import todoReducer from './todoReducer';

const rootReducer = combineReducers({
  dashboardReducer:dashboardReducer,
  deviceReducer:deviceReducer,
  userReducer:userReducer,
  osReducer:osReducer
  // Add more reducers as needed
});

export default rootReducer;
