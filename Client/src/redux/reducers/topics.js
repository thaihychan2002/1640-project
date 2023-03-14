import { INIT_STATE } from "../../constant";
import { getTopics, getType, updateTopics, deleteTopics, createTopics, updateTopicStatus } from "../actions";

export default function DepartmentsReducers(state = INIT_STATE.topics, action) {
    switch (action.type) {
        case getType(getTopics.getTopicsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getTopics.getTopicsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getTopics.getTopicsFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createTopics.createTopicsSuccess):
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case getType(updateTopics.updateTopicsSuccess):
            return {
                ...state,
                data: state.data.map((topic) =>
                    topic._id === action.payload._id ? action.payload : topic
                ),
            };
        case getType(updateTopicStatus.updateTopicStatusSuccess):
            return {
                ...state,
                data: state.data.map((topic) =>
                    topic._id === action.payload._id ? action.payload : topic
                ),
            };
        case getType(deleteTopics.deleteTopicsSuccess):
            const newData = state.data.filter((topic) => { return topic._id !== action.payload._id });
            return {
                ...state,
                data: newData,
            };
        default:
            return state;
    }
}