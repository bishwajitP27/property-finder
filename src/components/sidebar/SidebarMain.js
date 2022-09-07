import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";

import { GET_SELECT_PROPERTIES_ACTION } from "../../context/propertyActionCreaters";
import { PropertyContext } from "../../context/PropertyContext";
import Properties from "./Properties";

export default function SidebarMain() {
  const { propertyList, isFetching, error, selectedPropertyList, dispatch } = useContext(PropertyContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [showPlaces, setShowPlaces] = useState([]);
  const pageEnd = useRef(null);

  const selectAllHandler = (event) => {
    const target = event.target;
    const isChecked = target.checked;

    if (isChecked) {
      const selectedListings = propertyList.map(({ propertyId }) => propertyId);
      dispatch(GET_SELECT_PROPERTIES_ACTION(selectedListings));
    } else {
      dispatch(GET_SELECT_PROPERTIES_ACTION([]));
    }
  };

  const loadMore = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  useEffect(() => {
    // Added this setTimeout just to mimmick the behaviour of subsequent API calls in case of infinite Scrolling
    let timeoutId;
    if (propertyList.length > 0) {
      timeoutId = setTimeout(() => {
        const startIndex = 0;
        const endIndex = pageNumber * 10 + 10;
        setShowPlaces(propertyList.slice(startIndex, endIndex));
      }, 300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pageNumber, propertyList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1 }
    );
    pageEnd.current && observer.observe(pageEnd.current);

    return () => {
      pageEnd.current && observer.unobserve(pageEnd.current);
    };
  }, [pageEnd.current]);

  if (isFetching)
    return (
      <div className="no-property-data">
        <CircularProgress style={{ color: "black" }} color="success" size="8rem" />
        <h5 className="loading-text">Loading.....</h5>
      </div>
    );

  if (error.isError) return <h1 className="no-place-data">{error.message}</h1>;

  if (propertyList.length === 0) return <h1 className="no-property-filter">No Property Found</h1>;

  return (
    <main className="sidebar-container__main flex flex-column">
      <section className="property-checkbox__all">
        <input
          type="checkbox"
          id="select-all"
          onChange={selectAllHandler}
          checked={selectedPropertyList.length === propertyList.length && propertyList.length > 0}
        />
        <label htmlFor="select-all">Select all properties</label>
      </section>
      <section className="property-list flex flex-column">
        {showPlaces.map((property) => {
          const { propertyId } = { ...property };

          return <Properties key={propertyId} propertyInformation={property} />;
        })}
      </section>
      <div ref={pageEnd}>
        {showPlaces.length > 0 && showPlaces.length !== propertyList.length && (
          <div>
            <CircularProgress style={{ color: "black" }} color="success" size="2rem" />
            <h5 style={{ color: "black" }}>Loading...</h5>
          </div>
        )}
      </div>
    </main>
  );
}
