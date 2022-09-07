import { useContext, useEffect, useState } from "react";

import { PropertyContext } from "../../context/PropertyContext";

export default function Filter() {
  const { propertyList } = useContext(PropertyContext);
  const [filterState, setFilterState] = useState({
    minBedroom: 0,
    maxBedroom: 0,
    minBathroom: 0,
    maxBathroom: 0,
    minSleep: 0,
    maxSleep: 0,
  });

  useEffect(() => {
    const filteredList = propertyList.filter((property) => {
      const { bathrooms, bedrooms, sleeps } = { ...property };

      return bedrooms > filterState.minBathroom;
    });

    // dispatch();
  }, [filterState, propertyList]);

  const btnClickHandler = (event) => {
    const target = event.target;
    const id = target.dataset.id;

    if (id === "inc-min-bedroom") {
      setFilterState((prev) => {
        return { ...prev, minBedroom: prev.minBedroom + 1 };
      });
    }

    if (id === "dec-min-bedroom") {
      setFilterState((prev) => {
        return { ...prev, minBedroom: prev.minBedroom - 1 };
      });
    }

    if (id === "inc-max-bedroom") {
      setFilterState((prev) => {
        return { ...prev, maxBedroom: prev.maxBedroom + 1 };
      });
    }

    if (id === "dec-max-bedroom") {
      setFilterState((prev) => {
        return { ...prev, maxBedroom: prev.maxBedroom - 1 };
      });
    }
  };

  return (
    <div className="filter-bar">
      <section className="bedrooms">
        <h4>Bedroom</h4>
        <div className="fiter-btns">
          <p>{filterState.minBedroom}</p>
          <p>Min Bedrooms</p>
          <button disabled={filterState.minBedroom === 0} data-id="dec-min-bedroom" onClick={btnClickHandler}>
            -
          </button>
          <button data-id="inc-min-bedroom" onClick={btnClickHandler}>
            +
          </button>
        </div>
        <div className="fiter-btns">
          <p>{filterState.maxBedroom}</p>
          <p>Max Bedrooms</p>
          <button disabled={filterState.maxBedroom === 0} data-id="dec-max-bedroom" onClick={btnClickHandler}>
            -
          </button>
          <button data-id="inc-max-bedroom" onClick={btnClickHandler}>
            +
          </button>
        </div>
      </section>
      <section className="bathroom">
        <h4>Bathroom</h4>
        <div className="fiter-btns">
          <p>{filterState.minBathroom}</p>
          <p>Min Bathrooms</p>
          <button disabled={filterState.minBathroom === 0}>-</button>
          <button>+</button>
        </div>
        <div className="fiter-btns">
          <p>{filterState.maxBathroom}</p>
          <p>Max Bathrooms</p>
          <button disabled={filterState.maxBathroom === 0}>-</button>
          <button>+</button>
        </div>
      </section>
      <section className="sleeps">
        <h4>Sleeps</h4>
        <div className="fiter-btns">
          <p>{filterState.minSleep}</p>
          <p>Min Sleeps</p>
          <button disabled={filterState.minSleep === 0}>-</button>
          <button>+</button>
        </div>
        <div className="fiter-btns">
          <p>{filterState.maxSleep}</p>
          <p>Max Sleeps</p>
          <button disabled={filterState.maxSleep === 0}>-</button>
          <button>+</button>
        </div>
      </section>
    </div>
  );
}
