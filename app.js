
const domain = "https://newsapi.org/v2/everything?";
const apiKey = "72e487b123e242d9a19bd3359265a6c9";
const keywords = "mental health, technology";
const query = `${keywords.replace(", ", "%20AND%20")}`
const queryURL = `q=${query.replace(" ", "%20")}`
const baseURL = `${domain}${queryURL}`

const trending = document.querySelector(".trending-section");
const feedSection = document.querySelector(".feed-section");

const renderArticles = async () => {
  const response = await axios.get(baseURL,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

  const articles = response.data.articles;

  for (let i = 0; i < articles.length; i += 1) {

    const featuredImg = document.createElement(`div`);

    featuredImg.innerHTML = `
    <img src="${articles[i].urlToImage}" alt="Article Image for ${articles[i].Title}">
    `
    feedSection.append(featuredImg);

    const articleSnippet = document.createElement(`div`);

    articleSnippet.innerHTML = `
    <h2>${articles[i].title}</h2>
    <p>${articles[i].content}...</p>
    <a href="${articles[i].url}" target="_blank">Read More</a>
    `;
    feedSection.append(articleSnippet);
  }
}

renderArticles();