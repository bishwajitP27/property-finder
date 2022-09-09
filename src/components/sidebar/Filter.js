import { useContext, useEffect, useState } from "react";

import { GET_FILTER_APPLY_PROPERTY } from "../../context/propertyActionCreaters";
import { PropertyContext } from "../../context/PropertyContext";

export default function Filter() {
  const { dispatch } = useContext(PropertyContext);

  const [filterState, setFilterState] = useState({
    minBedroom: {
      val: 0,
      touched: false,
    },
    maxBedroom: { val: 0, touched: false },
    minBathroom: { val: 0, touched: false },
    maxBathroom: { val: 0, touched: false },
    minSleep: { val: 0, touched: false },
    maxSleep: { val: 0, touched: false },
  });

  const btnClickHandler = (event) => {
    const target = event.target;
    const id = target.dataset.id;
    const action = id.slice(0, 3);
    let filterTarget = id.slice(4);

    filterTarget = filterTarget
      .split("-")
      .map((item, index) => {
        if (index !== 0) {
          return item[0].toUpperCase() + item.slice(1);
        }
        return item;
      })
      .join("");
    if (action === "inc") {
      setFilterState((prev) => {
        return { ...prev, [filterTarget]: { val: prev[filterTarget].val + 1, touched: true } };
      });
    } else {
      setFilterState((prev) => {
        return { ...prev, [filterTarget]: { val: prev[filterTarget].val - 1, touched: true } };
      });
    }

    return;
  };

  const filterHandler = (event) => {
    dispatch(GET_FILTER_APPLY_PROPERTY(filterState));
  };

  return (
    <div className="filter-bar">
      <section className="btn-section flex ">
        <button className="filter-btn" onClick={filterHandler}>
          Apply
        </button>
      </section>

      <section className="bedrooms">
        <h4>Bedroom</h4>
        <div className="fiter-btns">
          <p>{filterState.minBedroom.val}</p>
          <p>Min Bedrooms</p>
          <button disabled={filterState.minBedroom.val === 0} data-id="dec-minBedroom" onClick={btnClickHandler}>
            -
          </button>
          <button data-id="inc-min-bedroom" onClick={btnClickHandler}>
            +
          </button>
        </div>
        <div className="fiter-btns">
          <p>{filterState.maxBedroom.val}</p>
          <p>Max Bedrooms</p>
          <button disabled={filterState.maxBedroom.val === 0} data-id="dec-maxBedroom" onClick={btnClickHandler}>
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
          <p>{filterState.minBathroom.val}</p>
          <p>Min Bathrooms</p>
          <button disabled={filterState.minBathroom.val === 0} data-id="dec-minBathroom" onClick={btnClickHandler}>
            -
          </button>
          <button data-id="inc-min-bathroom" onClick={btnClickHandler}>
            +
          </button>
        </div>
        <div className="fiter-btns">
          <p>{filterState.maxBathroom.val}</p>
          <p>Max Bathrooms</p>
          <button disabled={filterState.maxBathroom.val === 0} data-id="dec-maxBathroom" onClick={btnClickHandler}>
            -
          </button>
          <button data-id="inc-max-bathroom" onClick={btnClickHandler}>
            +
          </button>
        </div>
      </section>
      <section className="sleeps">
        <h4>Sleeps</h4>
        <div className="fiter-btns">
          <p>{filterState.minSleep.val}</p>
          <p>Min Sleeps</p>
          <button disabled={filterState.minSleep.val === 0} data-id="dec-minSleep" onClick={btnClickHandler}>
            -
          </button>
          <button data-id="inc-min-sleep" onClick={btnClickHandler}>
            +
          </button>
        </div>
        <div className="fiter-btns">
          <p>{filterState.maxSleep.val}</p>
          <p>Max Sleeps</p>
          <button disabled={filterState.maxSleep.val === 0} data-id="dec-maxSleep" onClick={btnClickHandler}>
            -
          </button>
          <button data-id="inc-max-sleep" onClick={btnClickHandler}>
            +
          </button>
        </div>
      </section>
    </div>
  );
}
