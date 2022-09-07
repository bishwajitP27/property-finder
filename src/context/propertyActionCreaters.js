export const ACTIONS = {
  GET_PROPERTIES: "GET_PROPERTIES",
  ERROR: "ERROR",
  FILTER_PROPERTY: "FILTER_PROPERTY",
  SELECT_PROPERTIES: "SELECT_PROPERTIES",
  REMOVE_PROPERTY: "REMOVE_PROPERTY",
};

export const GET_PROPERTIES_ACTION = (payload) => {
  return {
    type: ACTIONS.GET_PROPERTIES,
    payload,
  };
};

export const GET_ERROR_ACTION = (payload) => {
  return {
    type: ACTIONS.ERROR,
    payload,
  };
};

export const GET_SELECT_PROPERTIES_ACTION = (payload) => {
  return {
    type: ACTIONS.SELECT_PROPERTIES,
    payload,
  };
};

export const GET_REMOVE_PROPERTY = (payload) => {
  return {
    type: ACTIONS.REMOVE_PROPERTY,
    payload,
  };
};

export const GET_FILTERED_PROPERTY = (payload) => {
  return {
    type: ACTIONS.FILTER_PROPERTY,
    payload,
  };
};
