import "./../styles/main.scss";
import { fetchJoke } from "./fatch";
import {
  saveJokesLocalstorage,
  getSavedJokes,
  removeJokeFromLocalstorage,
} from "./local";

const removeJokeButton = document.querySelector(".saved-joke_remove-icon");
const saveJokeButton = document.querySelector(".current-joke_save");
const loadNewJokeButton = document.querySelector(".current-joke_generate");
const currentJokeElement = document.querySelector(".current-joke_text");
const savedJokeListElement = document.querySelector(".saved-jokes_list");

let currentJoke = "";

loadNewJokeButton.addEventListener("click", loadNewJoke);
saveJokeButton.addEventListener("click", saveNewJoke);

if (currentJoke) {
  saveJokesLocalstorage(currentJoke);
  renderSaveJokes();
}

async function loadNewJoke() {
  const joke = await fetchJoke();

  if (!currentJoke) {
    saveJokeButton.classList.remove("current-joke_save--disabled");
  }

  currentJoke = joke;
  currentJokeElement.innerText = joke;
}

function saveNewJoke() {
  if (currentJoke) {
    saveJokesLocalstorage(currentJoke);
    renderSaveJokes();
  }
}

function removeSavedJoke(index) {
  removeJokeFromLocalstorage(index);
  renderSaveJokes();
}

window.removeSavedJoke = removeSavedJoke; // Expose the function to the global scope

function renderSaveJokes() {
  const savedJokes = getSavedJokes();

  let html = "";

  savedJokes.forEach((joke, index) => {
    html += `<div class="saved-joke">
                <div class="saved-joke_text">
                ${joke}
                </div>
                <button class="saved-joke_remove" onclick="removeSavedJoke(${index})">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="saved-joke_remove-icon"
                >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                />
                </svg>
                </button>
              </div>`;
  });

  savedJokeListElement.innerHTML = html;
}

// removeJokeFromLocalstorage(joke);

renderSaveJokes();
