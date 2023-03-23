import { INIT_STATE } from "../../constant";
import {
  getCategory,
  getType,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../actions";

export default function CategoryReducers(state = INIT_STATE.category, action) {
  switch (action.type) {
    case getType(getCategory.getCategoryRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getCategory.getCategorySuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getCategory.getCategoryFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createCategory.createCategorySuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updateCategory.updateCategorySuccess):
      return {
        ...state,
        data: state.data.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      };
    case getType(deleteCategory.deleteCategorySuccess):
      const newData = state.data.filter((category) => {
        return category._id !== action.payload._id;
      });
      console.log(newData);
      return {
        ...state,
        data: newData,
      };

    default:
      return state;
  }
}
