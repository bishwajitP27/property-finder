import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";

import { GET_REMOVE_PROPERTY, GET_SELECT_PROPERTIES_ACTION } from "../../context/propertyActionCreaters";
import { PropertyContext } from "../../context/PropertyContext";

//Generating random match as I could not find the relevant details in the API response
function generateRandomMatch() {
  return Math.floor(Math.random() * 100);
}

export default function Properties({ propertyInformation }) {
  const { dispatch, selectedPropertyList } = useContext(PropertyContext);
  const [isChecked, setIsChecked] = useState(() => {
    return selectedPropertyList.some((id) => {
      return propertyId === id;
    });
  });

  const { propertyMetadata, averageRating, reviewCount, bedrooms, sleeps, bathrooms, images, propertyId } = { ...propertyInformation };

  const { headline } = { ...propertyMetadata };
  const { full: bathroomCount } = { ...bathrooms };
  const imageInfo = images && images.length > 0 ? images[1] : null;

  const propertyMatch = useMemo(generateRandomMatch, []);

  useEffect(() => {
    setIsChecked(() => {
      return selectedPropertyList.some((id) => {
        return propertyId === id;
      });
    });
  }, [selectedPropertyList, propertyId]);

  const selectedPropertyHandler = (event) => {
    const target = event.target;
    const isChecked = target.checked;
    if (isChecked) {
      dispatch(GET_SELECT_PROPERTIES_ACTION([...selectedPropertyList, propertyId]));
    } else {
      const filteredPropertyList = selectedPropertyList.filter((id) => id !== propertyId);
      dispatch(GET_SELECT_PROPERTIES_ACTION(filteredPropertyList));
    }
  };

  const removePropertyHandler = () => {
    dispatch(GET_REMOVE_PROPERTY(propertyId));
  };

  return (
    <div className="property-container flex">
      <section className="property-checkbox">
        <input type="checkbox" checked={isChecked} onChange={selectedPropertyHandler} />
      </section>
      <section className="property-info flex">
        <figure className="property-logo__container">
          {imageInfo && (
            <img
              src={imageInfo.c6_uri ? imageInfo.c6_uri : ""}
              alt={imageInfo.altText ? imageInfo.altText : "property-image"}
              className="property-logo"
            />
          )}
        </figure>
        <div className="property-desc__container flex flex-column">
          <section className="property-header flex flex-column">
            {headline && (
              <p className="property-match">
                {propertyMatch}
                <span>% Match</span>
              </p>
            )}
            <p className="property-info">{headline}</p>
            <div className="property-room__info">
              <span className="bedroom">{`${bedrooms} br. `}</span>
              <span className="bathroom">{`${bathroomCount} ba. `}</span>
              <span className="sleeps">{`${sleeps} Sleeps`}</span>
            </div>
          </section>

          <section className="property-container__footer flex">
            <div className="property-ratings">
              <Rating readOnly size="small" name="size-small" value={averageRating} />
              <span className="property-review__count">({reviewCount})</span>
            </div>
            <button className="property-remove" onClick={removePropertyHandler}>
              Remove
            </button>
          </section>
        </div>
      </section>
    </div>
  );
}

Properties.propTypes = {
  propertyInformation: PropTypes.object.isRequired,
};
