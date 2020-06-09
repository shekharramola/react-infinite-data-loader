import React from "react";
import  useInfiniteDataLoader  from "react-infinite-data-loader";
import ContentLoader from "./ContentLoader";
import InlineLoader from "./InlineLoader";

const App = () => {
  const URL = "https://api.thedogapi.com/v1/images/search?limit=6&order=Desc";
  // const URL =
  //   "https://hn.algolia.com/api/v1/search?query=curtis&page=20&hitsPerPage=50";
  const {
    isLoading,
    isViewMoreLoading,
    list,
    incrementPage,
    isLast,
    useButton,
  } = useInfiniteDataLoader({ url: URL, useButton: false, arrayName: null });
  const showMore = () => {
    incrementPage();
  };

  return isLoading ? (
    <ContentLoader />
  ) : (
    <React.Fragment>
      <div className="cards">
        {list &&
          list.map((dog, index) => {
            return (
              <div key={index} className="card">
                <img className="image" src={dog.url} />
                <div className="container">
                  <h4>
                    <b>
                      {dog.breeds.length > 0
                        ? dog.breeds[0].name
                        : "Unknown breed"}
                    </b>
                  </h4>
                  <p>
                    {" "}
                    {dog.breeds.length > 0
                      ? dog.breeds[0].life_span
                      : "Not known"}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="center">
        {isViewMoreLoading ? (
          <InlineLoader />
        ) : (
          useButton && (
            <button className="btn" onClick={showMore}>
              Show more
            </button>
          )
        )}
        {isLast && (
          <h1 style={{ color: "green", textAlign: "center" }}>
            NO MORE RECORDS
          </h1>
        )}
      </div>
    </React.Fragment>
  );
};
export default App;
