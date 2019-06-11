
const domain = "https://newsapi.org/v2/";
const trending = "top-headlines?"
const everything = "everything?"
const apiKey = "72e487b123e242d9a19bd3359265a6c9";

const keywords = "mental health, wellness, wellbeing, mindfulness, meditation, therapy, tech, technology, apps";
const query = `${keywords.replace(/, /g, " OR ")}`
const queryURL = encodeURIComponent(query);

const antiKeywords = "NOT trump, NOT goop, NOT committed, NOT surveillance, NOT bof";
const antiQuery = `${antiKeywords.replace(/, /g, " AND ")}`
const antiQueryURL = encodeURIComponent(antiQuery);

const trendingURL = `${domain}${trending}q="mental%20health"`
const everythingURL = `${domain}${everything}q=${queryURL}%20AND%20${antiQueryURL}&sortBy=relevance`

//ie https://newsapi.org/v2/everything?q=mental%20health%20OR%20wellness%20OR%20mindfulness%20OR%20meditation%20OR%20tech%20OR%20apps%20AND%20NOT%20trump%20AND%20NOT%20goop%20AND%20NOT%20committed

const searchSection = document.querySelector(".search-section");
const trendingSection = document.querySelector(".trending-section");
const feedSection = document.querySelector(".feed-section");


// **************
// RENDER SEARCH
// **************

// const searchArticles = async (query) => {
//   const responseSearch = await axios(`${BASE_URL}q=${query}&`);
//   searchArticles.unshift(responseSearch.data);
//   render(searchArticles);
// };

// const btn = document.querySelector('button');
// btn.addEventListener('click', (ev) => {
//   ev.preventDefault();
//   const input = document.querySelector('input');
//   searchArticles(input.value);
// });


// ****************
// RENDER TRENDING
// ****************

const renderTrending = async () => {
  const responseTrending = await axios.get(trendingURL,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
    });
  const trendings = responseTrending.data.articles;

  for (let j = 0; j < trendings.length; j += 1) {

    const trendingImg = document.createElement('div');
    trendingImg.className = "trendingImgDiv";
    trendingImg.style.backgroundImage = `url(${trendings[j].urlToImage})`;

    trendingSection.append(trendingImg);

    const trendingSnippet = document.createElement(`div`);
    trendingSnippet.className = "trendingSnippetDiv"
    trendingSnippet.innerHTML = `
  <h3>${trendings[j].title}</h3>
  <p>${trendings[j].description}...</p>
  <a href="${trendings[j].url}" target="_blank">Read More</a>
  `;
    trendingSection.append(trendingSnippet);
  }
  // if (trendings === true) {
  //   renderTrending();
  // }
  // else {
  //   const emptyTrendings = document.querySelector(".trending-section");
  //   emptyTrendings.style.display = "none";
  // }
}

renderTrending();


// ************
// RENDER FEED
// ************

const renderArticles = async () => {
  const responseArticles = await axios.get(everythingURL,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

  const articles = responseArticles.data.articles;

  //

  for (let i = 0; i < 10; i += 1) {

    const featuredImg = document.createElement(`div`);
    featuredImg.className = "featuredImgDiv";
    featuredImg.style.backgroundImage = `url(${articles[i].urlToImage})`;

    feedSection.append(featuredImg);

    // const articleDate = document.createElement(`div`);
    // articleDate.className = "articleDateDiv";
    // articleDate.innerHTML = `${articles[i].publishedAt}.replace()`;

    // feedSection.append(articleDate);

    const articleSnippet = document.createElement(`div`);
    articleSnippet.className = "articleSnippetDiv"
    articleSnippet.innerHTML = `
    <h3>${articles[i].title}</h3>
    <p>${articles[i].description}...</p>
    <a href="${articles[i].url}" target="_blank">Read More</a>
    `;
    feedSection.append(articleSnippet);

  }
}

renderArticles();

