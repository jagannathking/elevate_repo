import React, { useEffect, useState } from "react";
import UseFetch from "../hooks/UseFetch";
import "../App.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [currentPageUrl, setCurrentPageUrl] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState([]);

  const navigate = useNavigate();

  const { data, loading, error } = UseFetch(
    `https://rickandmortyapi.com/api/character?page=${currentPageUrl}`
  );

  useEffect(() => {
    if (data && data.results) {
      setAllData((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  console.log("All data", allData);

  // pagination
  let limit = 6;
  let lastIndex = limit * currentPage;
  let firstIndex = lastIndex - limit;
  let currentData = allData.slice(firstIndex, lastIndex);

  useEffect(() => {
    if (lastIndex > allData.length && data?.info?.next) {
      setCurrentPageUrl((prev) => prev + 1);
    }
  }, [currentPageUrl, allData, data]);

  // show details page
  const showAllDetails = (id) => {
    navigate(`/character/${id}`);
  };

  // loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>

      {/* Show the data */}
      <div>
        <ul className="data-container">
          {currentData &&
            currentData.map((da) => (
              <li key={da.id} className="single-container">
                <div>
                  <img src={da.image} alt={da.name} />
                </div>

                <p>Name : {da.name}</p>
                <p>{da.species}</p>
                <p>{da.status}</p>

                <div onClick={() => showAllDetails(da.id)}>View Details</div>
              </li>
            ))}
        </ul>

        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>
            {currentPage} of {}
          </span>
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
