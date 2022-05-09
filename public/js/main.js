var self = this;

const loader = document.getElementsByClassName("loader")[0];

self.jokeOptions = {
  jokesType: null,
  jokesStorage: [],
  joke: null,
};

const generateJokeOptions = (jokesTypes) => {
  const optionWrapper = document.getElementsByClassName("header")[0];
  jokesTypes.forEach((jokeType) => {
    const option = document.createElement("input");
    option.type = "radio";
    option.name = "jokeType";
    option.value = jokeType.type;
    option.addEventListener("change", setSelectJokeType);
    const label = document.createElement("label");
    label.for = jokeType.type;
    label.textContent = jokeType.type;
    optionWrapper.appendChild(option);
    optionWrapper.appendChild(label);
  });
  const option = document.createElement("input");
  option.type = "radio";
  option.name = "jokeType";
  option.value = "any";
  option.addEventListener("change", setSelectJokeType);
  const label = document.createElement("label");
  label.for = "any";
  label.textContent = "any";
  optionWrapper.appendChild(option);
  optionWrapper.appendChild(label);
};

const setSelectJokeType = (event) => {
  self.jokeOptions = {
    jokesType: event.target.value == "any" ? "" : event.target.value,
    jokesStorage: [],
    joke: null,
  };
  const jokeSelection = document.getElementsByClassName("title")[0];
  jokeSelection.innerHTML =
    event.target.value[0].toUpperCase() +
    event.target.value.slice(1).toLowerCase();
  loader.style.opacity = 0.8;
  getJoke();
};

const getJoke = () => {
  loader.style.display = "flex";
  const urlString =
    "/getJoke?" +
    new URLSearchParams({
      jokesType: self.jokeOptions.jokesType,
      jokes: self.jokeOptions.jokesStorage.join(","),
    });
  fetch(urlString, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      const jokeSelection = document.getElementsByClassName("title")[0];
      jokeSelection.innerHTML =
        data.data.joke[0].setup[0].toUpperCase() +
        data.data.joke[0].setup.slice(1).toLowerCase();
      self.jokeOptions.jokesStorage.push(data.data.joke[0].id);
      self.jokeOptions.joke = data.data.joke[0];
      displayJoke(data.data.joke[0]);
    })
    .catch((error) => {
      console.error(error);
    });
};

const displayJoke = (jokeInfo) => {
  const joke = document.getElementsByClassName("card-body")[0];
  joke.innerHTML =
    jokeInfo.setup[0].toUpperCase() + jokeInfo.setup.slice(1).toLowerCase();
  const nextStep = document.getElementsByClassName("next")[0];
  nextStep.innerHTML = "Read";
};

const cardAction = (event) => {
  const actionCard = document.getElementsByClassName("next")[0];
  if (actionCard.textContent === "Read") {
    const joke = document.getElementsByClassName("card-body")[0];
    joke.innerHTML =
      self.jokeOptions.joke.punchline[0].toUpperCase() +
      self.jokeOptions.joke.punchline.slice(1).toLowerCase();
    const nextStep = document.getElementsByClassName("next")[0];
    nextStep.innerHTML = "Next joke";
  } else {
    getJoke();
  }
};

window.addEventListener("load", function () {
  var actionCard = document.getElementsByClassName("next")[0];
  actionCard.addEventListener("click", cardAction);

  fetch("/getJokesTypes", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      generateJokeOptions(data.data.jokesTypes);
    })
    .catch((error) => {
      console.error(error);
    });
});
