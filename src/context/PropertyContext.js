import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";

import { getProperties } from "../utils/utils";
import { PropertyReducer } from "./propertyReducer";

const INITIAL_STATE = {
  apiData: [],
  propertyList: [],
  selectedPropertyList: [],
  isFetching: true,
  error: {
    isError: false,
    message: "",
  },
};

export const PropertyContext = createContext(INITIAL_STATE);

export default function PropertyContextProvider({ children }) {
  const [state, dispatch] = useReducer(PropertyReducer, INITIAL_STATE);

  useEffect(() => {
    getProperties(dispatch);
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        propertyList: state.propertyList,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        selectedPropertyList: state.selectedPropertyList,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

PropertyContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
