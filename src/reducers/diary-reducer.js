import {
  FETCH_DIARY_REQUEST,
  FETCH_DIARY_SUCCESS,
  FETCH_DIARY_ERROR,
  SET_DATE,
  SET_ENTRIES
} from '../actions/diary-actions';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const yyyymmddd = year * 10000 + month * 100 + day;

const initialState = {
  date: yyyymmddd,
  diaries: [],
  currentDiary: null,
  entries: [],
  loading: true,
  error: null
};

export default function reducer(state = initialState, action) {
  // console.log(action);
  if (action.type === SET_DATE) {
    return Object.assign({}, state, {
      date: action.date
    });
  } else if (action.type === FETCH_DIARY_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_DIARY_SUCCESS) {
    return Object.assign({}, state, {
      currentDiary: action.diary,
      loading: false,
      error: null
    });
  } else if (action.type === FETCH_DIARY_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === SET_ENTRIES) {
    console.log(state);
    return Object.assign({}, state, {
      entries: state.currentDiary.entries
    });
  }
  return state;
}

