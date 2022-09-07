import "./index.css";

import { useContext, useState } from "react";
import { RiListSettingsLine } from "react-icons/ri";

import { GET_FILTERED_PROPERTY } from "../../context/propertyActionCreaters";
import { PropertyContext } from "../../context/PropertyContext";
// import { filterSearchData } from "../../utils/utils";
import Filter from "./Filter";

export default function SidebarHeader() {
  const { dispatch } = useContext(PropertyContext);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCaterogy, setSelectedCategory] = useState(0);

  const searchPropertyHandler = (event) => {
    const target = event.target;
    const searchText = target.value;
    dispatch(GET_FILTERED_PROPERTY(searchText));
  };

  return (
    <header className="sidebar-container__header flex flex-column flex-center">
      <section className="sidebar-container__filter flex flex-center">
        <div className="filter-input__container">
          <input type="text" className="filter-input" placeholder="Search by property ID or title" onChange={searchPropertyHandler} />
        </div>
        <div className="filter-btn__container">
          <button className="filter-button" onClick={() => setShowFilter((prev) => !prev)} variant="outlined">
            <RiListSettingsLine /> Filters
          </button>
        </div>
      </section>
      <section className="sidebar-container__filter-category flex flex-center">
        <button className={`${selectedCaterogy === 0 ? "selected-filter-category" : ""}`} onClick={() => setSelectedCategory(0)}>
          Comp set
        </button>
        <button className={`${selectedCaterogy === 1 ? "selected-filter-category" : ""}`} onClick={() => setSelectedCategory(1)}>
          Other properties
        </button>
        <button className={`${selectedCaterogy === 2 ? "selected-filter-category" : ""}`} onClick={() => setSelectedCategory(2)}>
          Hotels
        </button>
      </section>
      {showFilter && <Filter />}
    </header>
  );
}
