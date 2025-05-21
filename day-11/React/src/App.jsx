import React, { useEffect, useState } from "react";
import "./App.css";
import FetchApi from "./CustomHooks/FetchApi";
import UserDetails from "./components/UserDetails";
import Debounce from "./CustomHooks/Debounce";

const App = () => {
  const { data, loading, error } = FetchApi("https://dummyjson.com/users");

  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const debounceQuery = Debounce(search, 400);
  const [suggestions, setSuggestions] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  // Search and sort together
  useEffect(() => {
    if (!data) return;

    let filtered = [...data];

    // Apply search
    if (debounceQuery) {
      filtered = filtered.filter((user) =>
        user.firstName.toLowerCase().includes(debounceQuery.toLowerCase())
      );
    }

    // Apply sort
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortOrder === "dsc") {
      filtered.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }

    setSearchedData(filtered);
  }, [debounceQuery, data, sortOrder]);

  // Display suggestions for dropdown
  useEffect(() => {
    if (!data) return;

    const filterData = data.filter((user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestions(filterData);
  }, [search, data]);

  const handleFilter = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="search-container">
        <input
          type="search"
          placeholder="Search..."
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Suggestions */}
      <div>
        <ul className="suggestion-container">
          {suggestions.slice(0, 3).map((d) => (
            <li key={d.id} onClick={() => setSearch(d.firstName)}>
              {d.firstName}
            </li>
          ))}
        </ul>
      </div>

      {/* Filter by name */}
      <div>
        <select onChange={handleFilter}>
          <option value="">Filter by name</option>
          <option value="asc">ASC</option>
          <option value="dsc">DES</option>
        </select>
      </div>

      {/* Display filtered users */}
      <ul className="users-container">
        {searchedData.map((user) => (
          <li key={user.id}>
            <UserDetails user={user} />
          </li>
        ))}
      </ul>

      {/* Error display */}
      {error && <div>{error}</div>}
    </div>
  );
};

export default App;
