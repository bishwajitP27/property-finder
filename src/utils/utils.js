import { GET_ERROR_ACTION, GET_PROPERTIES_ACTION } from "../context/propertyActionCreaters";
import { Headers, Query } from "../utils/graphQlQuery";

export async function makeRequest(URL, options = {}, params = {}) {
  try {
    const paramString = new URLSearchParams(params);
    const response = await fetch(`${URL}?${paramString}`, options);
    if (response.ok) {
      const responseData = await response.json();
      const jsonData = responseData.data;
      return jsonData ? jsonData.results : [];
    } else {
      const error = new Error("Something Went Wrong. Please try again.");
      return error;
    }
  } catch (err) {
    const error = new Error("Something Went Wrong. Please try again.");
    return error;
  }
}

export async function getProperties(dispatch) {
  try {
    const URL = "serp/g";
    const options = {
      method: "POST",
      body: JSON.stringify(Query),
      headers: Headers,
    };

    const results = await makeRequest(URL, options);

    if (results === undefined || results === null || results.name === "Error") {
      const errorMessage = "Something Went Wrong. Please try again.";
      dispatch(GET_ERROR_ACTION({ message: errorMessage }));
      return;
    }

    const payload = results.listings ? results.listings : [];
    dispatch(GET_PROPERTIES_ACTION(payload));
  } catch (err) {
    const errorMessage = "Something Went Wrong. Please try again.";
    dispatch(GET_ERROR_ACTION({ message: errorMessage }));
  }
}

export function filterSearchData(data, payload) {
  const searchText = payload.searchText.toLowerCase();
  return data.filter((place) => {
    return place.name.toLowerCase().includes(searchText);
  });
}
