import React, { useState, useEffect } from "react";
import ArticleList from "./components/ArticleList";
import Filters from "./components/Filters";
import { fetchArticles, fetchGuardianArticles, fetchNYTimesArticles } from "./services/api";
import newsIcon from "./images/weather-news.png";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleFilter = async (filters) => {
    setLoading(true);
    const newsApiArticles = await fetchArticles({
      ...filters,
      keyword: searchKeyword,
    });// Fetch News API articles
    const guardianArticles = await fetchGuardianArticles(
      searchKeyword,
      filters.category,
      filters.date
    );// Fetch The Gaurdian articles
    const nyTimesArticles = await fetchNYTimesArticles(
      searchKeyword,
      filters.category,
      filters.date
    ); // Fetch NY Times articles
    setArticles([...newsApiArticles, ...guardianArticles, ...nyTimesArticles]);
    setLoading(false);
  };


  // Handling search 
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newsApiArticles = await fetchArticles({ keyword: searchKeyword });
    const guardianArticles = await fetchGuardianArticles(searchKeyword);
    const nyTimesArticles = await fetchNYTimesArticles(searchKeyword); 
    setArticles([...newsApiArticles, ...guardianArticles, ...nyTimesArticles]);
    setLoading(false);
  };

  useEffect(() => {
    const loadDefaultArticles = async () => {
      setLoading(true);
      const defaultFilters = {
        keyword: "latest",
        category: "",
        date: "",
        source: "",
      };
      const newsApiArticles = await fetchArticles(defaultFilters);
      const guardianArticles = await fetchGuardianArticles("latest");
      const nyTimesArticles = await fetchNYTimesArticles("latest"); 
      setArticles([...newsApiArticles, ...guardianArticles, ...nyTimesArticles]);
      setLoading(false);
    };
  loadDefaultArticles();
  }, []);

  return (
    <div className="App bg-blue-100 min-h-screen flex flex-col">
      <header className="bg-blue-100 p-4 shadow-md text-blue-900">
        <div className="flex items-center">
          <img
            src={newsIcon}
            alt="News Icon"
            className="w-10 h-10 mr-2" 
          />
          <h1 className="text-3xl font-bold mr-4">News Sphere</h1>
        </div>
        <form onSubmit={handleSearch} className="mt-2 flex">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
        </form>
        <Filters onFilter={handleFilter} />
      </header>
      <main className="p-4 flex-grow">
        {loading ? <p>Loading...</p> : <ArticleList articles={articles} />}
      </main>
      <footer className="bg-blue-100 p-4 text-center text-blue-900">
        <div className="flex items-center justify-center">
          <img
            src={newsIcon}
            alt="News Icon"
            className="w-10 h-10 mr-2" 
          />
          <p className="text-lg">© 2024 News Sphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
