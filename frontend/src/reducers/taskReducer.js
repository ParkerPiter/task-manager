import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    FETCH_TASK_DETAIL_REQUEST,
    FETCH_TASK_DETAIL_SUCCESS,
    FETCH_TASK_DETAIL_FAILURE,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAILURE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
    SET_FILTER,
  } from '../actions/taskActions';
  
  const initialState = {
    loading: false,
    tasks: [],
    task: {},
    error: '',
    filter: 'all',
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TASKS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_TASKS_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: action.payload,
          error: '',
        };
      case FETCH_TASKS_FAILURE:
        return {
          ...state,
          loading: false,
          tasks: [],
          error: action.payload,
        };
      case FETCH_TASK_DETAIL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_TASK_DETAIL_SUCCESS:
        return {
          ...state,
          loading: false,
          task: action.payload,
          error: '',
        };
      case FETCH_TASK_DETAIL_FAILURE:
        return {
          ...state,
          loading: false,
          task: {},
          error: action.payload,
        };
      case CREATE_TASK_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: [...state.tasks, action.payload],
          error: '',
        };
      case CREATE_TASK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_TASK_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: state.tasks.filter(task => task._id !== action.payload),
          error: '',
        };
      case DELETE_TASK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SET_FILTER:
        return {
            ...state,
            filter: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default taskReducer;