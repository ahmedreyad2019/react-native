import * as actionTypes from "../actionConstants/action-types";
const initialState = {
  companies: {
    approved: [],
    requested: []
  },
  allCompanies: [],
  selectedCompany: "",
  companyModalVisible: false,
  filterModalVisible: false,
  searchModalVisible: false,
  dateModalVisible: false,
  order: "asc",
  source:'feed'
};
export default (companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COMPANIES:
      return {
        ...state,
        companies: { ...state.companies, approved: action.companies }
      };
    case actionTypes.SET_ALL_COMPANIES:
      return {
        ...state,
        allCompanies: action.allCompanies
      };
    case actionTypes.SET_REQUESTS:
      return {
        ...state,
        companies: { ...state.companies, requested: action.requests }
      };
    case actionTypes.SELECT_COMPANY:
      return {
        ...state,
        selectedCompany: action.company
      };
    case actionTypes.CLOSE_COMPANY_MODAL:
      return {
        ...state,
        companyModalVisible: false
      };
    case actionTypes.CLEAR:
      return {
        state
      };
    case actionTypes.SET_ORDER:
      return {
        ...state,
        order: state.order === "asc" ? "desc" : "asc"
      };
    case actionTypes.SET_SOURCE:
      return {
        ...state,
        source:action.source
      };
    case actionTypes.OPEN_COMPANY_MODAL:
      return {
        ...state,
        companyModalVisible: true
      };
    case actionTypes.CLOSE_FILTER_MODAL:
      return {
        ...state,
        filterModalVisible: false
      };
    case actionTypes.OPEN_FILTER_MODAL:
      return {
        ...state,
        filterModalVisible: true
      };
    case actionTypes.CLOSE_DATE_MODAL:
      return {
        ...state,
        dateModalVisible: false
      };
    case actionTypes.OPEN_DATE_MODAL:
      return {
        ...state,
        dateModalVisible: true
      };
    case actionTypes.CLOSE_SEARCH_MODAL:
      return {
        ...state,
        searchModalVisible: false
      };
    case actionTypes.OPEN_SEARCH_MODAL:
      return {
        ...state,
        searchModalVisible: true
      };
    default:
      return state;
  }
});
