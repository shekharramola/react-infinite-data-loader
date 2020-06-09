import React from "react";

const fakeItems = [1,2,3,4,5,6];

const ContentLoader = () => {
  return (
    <div className="cards">
      {fakeItems && fakeItems.map((item, index) => {
        return (
          <div className="wrapper" key={index}>
            <div className="card-loader card-loader--tabs"></div>
          </div>
        );
      })}
    </div>
  );
};
export default ContentLoader;