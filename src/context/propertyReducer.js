import { ACTIONS } from "./propertyActionCreaters";

export const PropertyReducer = (state, actions) => {
  switch (actions.type) {
    case ACTIONS.GET_PROPERTIES:
      return {
        ...state,
        apiData: actions.payload,
        propertyList: actions.payload,
        isFetching: false,
        error: {
          isError: false,
          message: "",
        },
      };
    case ACTIONS.SELECT_PROPERTIES:
      return {
        ...state,
        selectedPropertyList: actions.payload,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        isFetching: false,
        error: {
          isError: true,
          message: actions.payload.message,
        },
      };
    case ACTIONS.REMOVE_PROPERTY:
      return {
        ...state,
        propertyList: state.propertyList.filter(({ propertyId }) => {
          return propertyId !== actions.payload;
        }),
      };
    case ACTIONS.FILTER_PROPERTY:
      return {
        ...state,
        propertyList: filterSearchData(state.apiData, actions.payload),
      };
    case ACTIONS.FILTER_APPLY:
      return {
        ...state,
        propertyList: filterData(state.apiData, actions.payload),
      };
    default:
      return state;
  }
};

export function filterSearchData(propertyList, payload) {
  const searchText = payload.toLowerCase();

  return propertyList.filter((property) => {
    const { propertyMetadata } = { ...property };
    const { headline } = { ...propertyMetadata };
    return headline.toLowerCase().includes(searchText) || property.propertyId.includes(searchText);
  });
}

export function filterData(propertyList, payload) {
  const conditionsToCheck = [];
  for (let key in payload) {
    if (payload[key].touched) conditionsToCheck.push({ key: key, val: payload[key].val });
  }

  return propertyList.filter((property) => {
    const { bathrooms, sleeps, bedrooms } = { ...property };
    const { full: noOfBathrooms } = { ...bathrooms };
    let shouldInclude = true;
    conditionsToCheck.forEach((condition) => {
      const { key, val } = condition;

      if (key === "minBedroom") {
        if (bedrooms < val) {
          shouldInclude = false;
          return;
        }
      }

      if (key === "maxBedroom") {
        if (bedrooms > val) {
          shouldInclude = false;
          return;
        }
      }

      if (key === "minBathroom") {
        if (noOfBathrooms < val) {
          shouldInclude = false;
          return;
        }
      }

      if (key === "maxBathroom") {
        if (noOfBathrooms > val) {
          shouldInclude = false;
          return;
        }
      }

      if (key === "minSleep") {
        if (sleeps < val) {
          shouldInclude = false;
          return;
        }
      }

      if (key === "maxSleep") {
        if (sleeps > val) {
          shouldInclude = false;
          return;
        }
      }
    });
    return shouldInclude;
  });
}
