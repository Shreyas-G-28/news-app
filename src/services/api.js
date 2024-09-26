import axios from 'axios';

const NEWS_API_KEY = '48eae3304f274d8fa5beefb53255b409'; 
const GUARDIAN_API_KEY = 'eb199f3c-7a9f-412e-bec0-448410580558'; 
const NYTIMES_API_KEY = 'VVpvFIakoXfHm1YGvyn7hpoNBOyjrDHx'; 

const BASE_URL_NEWS_API = 'https://newsapi.org/v2';
const BASE_URL_GUARDIAN_API = 'https://content.guardianapis.com';
const BASE_URL_NYTIMES_API = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

export const fetchArticles = async ({ keyword, date, category, source }) => {
  try {
    const response = await axios.get(`${BASE_URL_NEWS_API}/everything`, {
      params: {
        q: keyword || 'latest',
        from: date || undefined,
        category: category || undefined, 
        sources: source || undefined, 
        apiKey: NEWS_API_KEY,
      },
    });
    return response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      source: article.source.name,
    }));
  } catch (error) {
    console.error('Error fetching articles from NewsAPI:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const fetchGuardianArticles = async (keyword, category, date) => {
  try {
    const response = await axios.get(`${BASE_URL_GUARDIAN_API}/search`, {
      params: {
        q: keyword || 'latest',
        'api-key': GUARDIAN_API_KEY,
        'show-fields': 'thumbnail,headline,trailText',
        pageSize: 10,
        section: category || undefined,
        'from-date': date || undefined, 
      },
    });

    return response.data.response.results.map(article => ({
      title: article.webTitle,
      description: article.fields.trailText || 'No description available.',
      url: article.webUrl,
      urlToImage: article.fields.thumbnail || '',
      source: 'The Guardian',
    }));
  } catch (error) {
    console.error('Error fetching articles from The Guardian:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const fetchNYTimesArticles = async (keyword, category, date) => {
  try {
    const response = await axios.get(BASE_URL_NYTIMES_API, {
      params: {
        q: keyword || 'latest',
        'api-key': NYTIMES_API_KEY,
        fq: category ? `news_desk:("${category}")` : undefined, 
        begin_date: date ? date.replace(/-/g, '') : undefined, 
      },
    });

    return response.data.response.docs.map(article => ({
      title: article.headline.main,
      description: article.abstract || 'No description available.',
      url: article.web_url,
      urlToImage: article.multimedia.length
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : '',
      source: 'The New York Times',
    }));
  } catch (error) {
    console.error('Error fetching articles from The New York Times:', error.response ? error.response.data : error.message);
    return [];
  }
};

export const fetchAllArticles = async ({ keyword, date, category, source }) => {
  const [newsAPIArticles, guardianArticles, nyTimesArticles] = await Promise.all([
    fetchArticles({ keyword, date, category, source }),
    fetchGuardianArticles(keyword, category, date),
    fetchNYTimesArticles(keyword, category, date),
  ]);

  return [...newsAPIArticles, ...guardianArticles, ...nyTimesArticles];
};
