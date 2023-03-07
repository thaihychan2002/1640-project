export default function reducer(state, action) {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USER_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "FETCH_USER_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_ROLE_REQUEST":
      return { ...state, loading: true };
    case "FETCH_ROLE_SUCCESS":
      return { ...state, roles: action.payload, loading: false };
    case "FETCH_ROLE_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
