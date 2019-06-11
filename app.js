
const domain = "https://newsapi.org/v2/";
const trending = "top-headlines?"
const everything = "everything?"
const apiKey = "72e487b123e242d9a19bd3359265a6c9";

const keywords = "mental health, wellness, wellbeing, mindfulness, meditation, therapy, tech, technology, apps";
const query = `${keywords.replace(/, /g, " OR ")}`
const queryURL = encodeURIComponent(query);

const antiKeywords = "NOT trump, NOT goop, NOT committed";
const antiQuery = `${antiKeywords.replace(/, /g, " AND ")}`
const antiQueryURL = encodeURIComponent(antiQuery);

const searchURL = `${domain}${everything}sortBy=popularity&q=${antiKeywords}%20AND%20`
const trendingURL = `${domain}${trending}q=mental%20health`
const everythingURL = `${domain}${everything}q=${queryURL}%20AND%20${antiQueryURL}&sortBy=popularity`

//ie https://newsapi.org/v2/everything?q=mental%20health%20OR%20wellness%20OR%20mindfulness%20OR%20meditation%20OR%20tech%20OR%20apps%20AND%20NOT%20trump%20AND%20NOT%20goop%20AND%20NOT%20committed

const footerSection = document.querySelector("#footerbar")
const searchSection = document.querySelector(".search-section");
const trendingSection = document.querySelector(".trending-section");
const feedSection = document.querySelector(".feed-section");

// **************
// RENDER SEARCH
// **************

const renderSearch = async (input) => {

  searchSection.innerHTML = [];
  const searchResponse = await axios.get(`${searchURL}q="mental%20health"%20AND%20${input.replace(/" "/g, "%20")}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
    }
  );

  const searches = searchResponse.data.articles;

  for (let n = 0; n < searches.length; n += 1) {

    const resultImg = document.createElement('div');
    resultImg.className = "resultingImgDiv";
    resultImg.style.backgroundImage = `url(${searches[n].urlToImage})`;

    searchSection.append(resultImg);

    const resultSnippet = document.createElement('div');
    resultSnippet.className = "resultingSnippetDiv";
    resultSnippet.innerHTML = `
    <h3>${searches[n].title}</h3>
    <h5>from ${searches[n].source.name}</h5>
    <p>${searches[n].description}...</p>
    <a href="${searches[n].url}" target="_blank">Read More</a>
    `;

    searchSection.append(resultSnippet);
  }
}

const searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  const input = document.querySelector('#queryBox');
  renderSearch(input.value);
});

// ****************
// RENDER TRENDING
// ****************

const renderTrending = async () => {
  const trendingResponse = await axios.get(trendingURL,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
    });

  const trendings = trendingResponse.data.articles;

  for (let j = 0; j < trendings.length; j += 1) {

    const trendingImg = document.createElement('div');
    trendingImg.className = "trendingImgDiv";
    trendingImg.style.backgroundImage = `url(${trendings[j].urlToImage})`;

    trendingSection.append(trendingImg);

    const trendingSnippet = document.createElement(`div`);
    trendingSnippet.className = "trendingSnippetDiv"
    trendingSnippet.innerHTML = `
    <h3>${trendings[j].title}</h3>
    <h5>from ${trendings[j].source.name}</h5>
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
    <h5>from ${articles[i].source.name}</h5>
    <p>${articles[i].description}...</p>
    <a href="${articles[i].url}" target="_blank">Read More</a>
    `;
    feedSection.append(articleSnippet);

  }
}

renderArticles();



// const hiBtn = document.querySelector('#hi');
// hiBtn.addEventListener('click', (ev) => {
//   console.log("clicked");
//   ev.preventDefault();
//   const hiPanda = document.createElement('div');
//   hiPanda.className = "hiPanda";
//   hiPanda.innerHTML = `<img src="https://media.giphy.com/media/oVpjKztlM9joc/giphy.gif">`;
//   const hiPandaImg = hiPanda.img;
//   hiPanda.style.position = "absolute";
//   hiPanda.style.Width = "100vw";
//   hiPanda.style.Height = "100vh";
//   hiPanda.style.top = 5;
//   hiPanda.style.zIndex = 10;

//   footerSection.appendChild(hiPanda);
// });



// *******************
// FOOTER MENU SCROLL
// *******************
// By W3 Schools

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;

  if (prevScrollpos < currentScrollPos) {
    document.querySelector("#footerbar").style.bottom = "-60px";
  } else {
    document.querySelector("#footerbar").style.bottom = "0";
  }
  prevScrollpos = currentScrollPos;
}