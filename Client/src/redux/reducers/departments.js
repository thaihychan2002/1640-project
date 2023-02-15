import { INIT_STATE } from "../../constant";
import { getDepartments, getType } from "../actions";

export default function DepartmentsReducers(state = INIT_STATE.departments, action) {
    switch (action.type) {
        case getType(getDepartments.getDepartmentsRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getDepartments.getDepartmentsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            }
        case getType(getDepartments.getDepartmentsFailure):
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}