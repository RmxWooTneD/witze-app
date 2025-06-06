const LOCAL_STORAGE_KEY = "jokes";

export function getSavedJokes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

export function saveJokesLocalstorage(joke) {
  const savedJokes = getSavedJokes();

  if (savedJokes.find((savedJoke) => savedJoke === joke)) {
    alert("Witze wurde bereits gespeichert");
    return;
  }
  const newSavedJokes = [joke, ...savedJokes];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSavedJokes));
}

export function removeJokeFromLocalstorage(index) {
  const newSavedJokes = getSavedJokes();

  newSavedJokes.splice(index, 1);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSavedJokes));
}
