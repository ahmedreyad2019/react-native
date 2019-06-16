import * as actionTypes from "../actionConstants/action-types";
const initialState = {
  companies: {
    approved: [],
    requested: []
  },
  allCompanies: [],
  selectedCompany: "",
  companyModalVisible: false,
  dateModalVisible: false
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
        allCompanies: action.companies
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
    case actionTypes.OPEN_COMPANY_MODAL:
      return {
        ...state,
        companyModalVisible: true
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
    default:
      return state;
  }
});
