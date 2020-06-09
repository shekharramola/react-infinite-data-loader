import * as React from "react";
 const useInfiniteDataLoader = ({url, useButton, arrayName}) => {
  const [isLoading, setLoading] = React.useState(false);
  const [isViewMoreLoading, setViewMoreLoading] = React.useState(false);
  const [pageNo, setPageNo] = React.useState(1);
  const [list, setList] = React.useState([]);
  const [isLast, setLast] = React.useState(false);

  React.useEffect(() => {
    !useButton && window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [useButton]);

  React.useEffect(() => {
    !isLast && fetchData();
  }, [pageNo]);
  const fetchData = async () => {
    pageNo === 1 ? setLoading(true) : setViewMoreLoading(true);
    const result = await fetch(`${url}&page=${pageNo}`);
    let data = await result.json();
    if (arrayName) {
      data = data[arrayName];
    }
    if (data.length === 0) {
      setLast(true);
    }
    setLoading(false);
    setViewMoreLoading(false);
    setList(list.concat(data));
  };

  const incrementPage = () => {
    setPageNo((page) => page + 1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    !useButton && incrementPage();
  };
  return { incrementPage, isLoading, isViewMoreLoading, list, isLast,useButton };
};
export default useInfiniteDataLoader;