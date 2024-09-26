import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 

const ArticleList = ({ articles }) => {
  if (!articles) {
    return (
      <div className="article-list p-4 bg-blue-50">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="article border border-gray-300 p-4 my-4 flex flex-col md:flex-row justify-between items-start bg-white shadow-md rounded-lg transition duration-200 hover:shadow-lg"
          >
            <Skeleton className="w-full h-48 md:w-48 mb-4 md:mb-0" />

            <div className="flex-1 md:ml-4 text-blue-900">
              <h2 className="text-xl font-bold text-blue-900">
                <Skeleton width={200} />
              </h2> 
              <p className="text-sm text-blue-700 mb-1">
                <Skeleton width={100} />
              </p>
              <p className="text-gray-600">
                <Skeleton count={3} />
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return <p className="text-center text-gray-600">No articles found.</p>;
  }

  return (
    <div className="article-list p-4 bg-blue-50">
      {articles.map((article, index) =>
        article.urlToImage ? (
          <div
            key={index}
            className="article border border-gray-300 p-4 my-4 flex flex-col md:flex-row justify-between items-start bg-white shadow-md rounded-lg transition duration-200 hover:shadow-lg"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-auto object-cover rounded-md mb-4 md:mb-0 md:w-48"
              />
            )}

            <div className="flex-1 md:ml-4 text-blue-900">
              <h2 className="text-xl font-bold text-blue-900">
                {article.title}
              </h2>
              <p className="text-sm text-blue-700 mb-1">
                <strong>Source:</strong> {article.source}
              </p>
              <p className="text-gray-600">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
              >
                Read more
              </a>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ArticleList;
