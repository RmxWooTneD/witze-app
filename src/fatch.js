const API_ENDPOINT = "https://witzapi.de/api/joke";

export async function fetchJoke() {
  const response = await fetch(API_ENDPOINT);

  const data = await response.json();
  return data[0].text;
}
