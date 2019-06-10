
const domain = "https://newsapi.org/v2/";
const trending = "top-headlines?"
const everything = "everything?"
const apiKey = "72e487b123e242d9a19bd3359265a6c9";

const keywords = "mental health, wellness, mindfulness, meditation, tech, apps";
const query = `${keywords.replace(/, /g, " OR ")}`
const queryURL = encodeURIComponent(query);

const antiKeywords = "NOT trump, NOT goop, NOT committed";
const antiQuery = `${antiKeywords.replace(/, /g, " AND ")}`
const antiQueryURL = encodeURIComponent(antiQuery);

const trendingURL = `${domain}${trending}q=wellbeing`
const everythingURL = `${domain}${everything}q=${queryURL}%20AND%20${antiQueryURL}`

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

    const featuredImg = document.createElement('div');
    featuredImg.className = "featuredImgDiv"
    featuredImg.innerHTML = `
  <img src="${trendings[j].urlToImage}" alt="Article Image for ${trendings[j].Title}">
  `
    trendingSection.append(featuredImg);

    const articleSnippet = document.createElement(`div`);
    articleSnippet.className = "articleSnippetDiv"
    articleSnippet.innerHTML = `
  <h2>${trendings[j].title}</h2>
  <p>${trendings[j].description}...</p>
  <a href="${trendings[j].url}" target="_blank">Read More</a>
  `;
    trendingSection.append(articleSnippet);
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

//button id hi

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

  for (let i = 0; i < articles.length; i += 1) {

    const featuredImg = document.createElement(`div`);
    featuredImg.className = "featuredImgDiv";
    featuredImg.style.backgroundImage = `url(${articles[i].urlToImage})`;

    feedSection.append(featuredImg);

    const articleSnippet = document.createElement(`div`);
    articleSnippet.className = "articleSnippetDiv"
    articleSnippet.innerHTML = `
    <h2>${articles[i].title}</h2>
    <p>${articles[i].description}...</p>
    <a href="${articles[i].url}" target="_blank">Read More</a>
    `;
    feedSection.append(articleSnippet);
  }
}

renderArticles();

