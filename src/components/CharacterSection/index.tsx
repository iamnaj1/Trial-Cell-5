import * as React from "react";
import "./index.scss";
import _ from "lodash";
import { Segment } from "semantic-ui-react";
import moogleImage from "../../assets/images/moogle.png";

interface CharacterSectionProps {
  charData: any;
}

const CharacterSection = (props: CharacterSectionProps) => {
  const { charData } = props; 
  return (
    <>
      {!_.isEmpty(charData) ? (
        <Segment className="character-section-wrapper">
          {_.map(charData, (data, index) => {
            return (
              <div
                className="character-section-wrapper__items-container"
                key={index}
              >
                <div className="character-section-wrapper__items-container__image">
                  <img src={data.pictures[0].url} alt={data.name} />
                </div>
                <div className="character-section-wrapper__items-container__details">
                  <h2>{data.name}</h2>
                  <p>{data.description}</p>
                  <div className="character-section-wrapper__items-container__details__sub-details"></div>

                  <div className="character-section-wrapper__items-container__details__sub-details row">
                    <div className="column">
                      <h4>
                        Origin: <span>{data.origin}</span>
                      </h4>
                      <h4>
                        Job: <span>{data.job}</span>
                      </h4>
                    </div>
                    <div className="column">
                      <h4>
                        Age: <span>{data.age}</span>
                      </h4>
                      <h4>
                        Race: <span>{data.race}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Segment>
      ) : (
        <div className="character-section-empty-content">
          <div className="character-section-empty-content__title">
            <span className="blue">M</span>
            <span className="red">O</span>
            <span className="yellow">O</span>
            <span className="blue">G</span>
            <span className="green">L</span>
            <span className="red">E</span>
          </div>
          <div className="character-section-empty-content__image">
            <img src={moogleImage} alt="All Hail King Moogle" />
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterSection;
