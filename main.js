const APIURL = "https:/api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("varunvenky99");
async function getUser(username) {
  const res = await fetch(APIURL + username);
  const data = await res.json();

  createUserCard(data);
  getRepos(username);
}

async function getRepos(username) {
  const res = await fetch(APIURL + username + "/repos");
  const data = await res.json();

  addReposToCard(data);
}

function createUserCard(user) {
  const cardHtml = `
   <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
            <li> ${user.followers} <strong>Followers</strong></li>
            <li> ${user.following} <strong>Following</strong></li>
            <li> ${user.public_repos} <strong>Repos</strong></li>
            </ul>
            <h4>Repos:</h4>
            <div id="repos"></udiv>
        </div>
        </div>
    `;

  main.innerHTML = cardHtml;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 10).forEach((repo) => {
    const repoEl = document.createElement("a");

    repoEl.classList.add("repo");

    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
