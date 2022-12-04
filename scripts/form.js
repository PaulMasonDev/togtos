import TMDB_API_KEY from "./apikey.js";
import { titleCaseString } from "./utils.js";

const form = document.getElementById("search-form");

const imgBaseUrl = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";

const getShowId = async (showTitle) => {
  const searchShowUrl = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&language=en-US&page=1&query=${showTitle}&include_adult=false`;
  const showResponse = await fetch(searchShowUrl);
  const showData = await showResponse.json();
  // const showTitleDisplay = document.getElementById("show-title");
  // showTitleDisplay.innerText = showData.results[0].name;
  console.log({ showData });
  if (showData.results.length > 0) {
    return {
      tvShowId: showData.results[0].id,
      showTitle: showData.results[0].name,
    };
  }
  return null;
};

const getCastData = async (tvShowId) => {
  const searchCastUrl = `https://api.themoviedb.org/3/tv/${tvShowId}/aggregate_credits?api_key=${TMDB_API_KEY}&language=en-US`;
  const castResponse = await fetch(searchCastUrl);
  const castData = await castResponse.json();
  return castData;
};

const generateCastList = (cast) => {
  const castList = [];
  for (const castMember of cast) {
    castList.push({
      actorName: castMember.name,
      characterNames: [
        ...castMember.roles.map((role) => role.character.toLowerCase()),
      ],
      imageUrl: `${imgBaseUrl}${castMember.profile_path}`,
    });
  }
  return castList;
};

const searchCastList = (castList) => {
  const characterInputValue = document
    .getElementById("character-input")
    .value.toLowerCase();
  const foundCast = castList.find((castMember) => {
    for (const character of castMember.characterNames) {
      const individualNames = character.split(" ");
      for (const name of individualNames) {
        if (name !== "the" && name !== "mr." && name !== "mrs.") {
          return name === characterInputValue;
        }
      }
    }
  });
  if (foundCast) return foundCast;
  return null;
};

const formatCastMember = (castMember, showTitle) => {
  let formattedCastMember = {
    ...castMember,
    characterNames: [
      ...castMember.characterNames?.map((character) =>
        titleCaseString(character)
      ),
    ],
    showTitle,
  };
  return formattedCastMember;
};

const sendToDisplay = (character) => {
  const characterName = document.getElementById("character-name");
  const showTitle = document.getElementById("show-title");
  const actorImg = document.getElementById("actor-img");
  const actorName = document.getElementById("actor-name");
  characterName.innerText = character.characterNames[0];
  showTitle.innerText = character.showTitle;
  actorImg.src = character.imageUrl;
  actorName.innerText = character.actorName;
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const showTitleInputValue = document
    .getElementById("show-title-input")
    .value.toLowerCase();
  if (showTitleInputValue === "") {
    nullResults();
    return;
  }
  const showIdResults = await getShowId(showTitleInputValue);
  if (showIdResults == null) {
    nullResults();
    return;
  }
  const { tvShowId, showTitle } = showIdResults;
  const castData = await getCastData(tvShowId);
  const castList = generateCastList(castData.cast);
  const foundCastMember = searchCastList(castList);
  if (foundCastMember == null) {
    nullResults();
    return;
  }
  const formattedCastMember = formatCastMember(foundCastMember, showTitle);
  sendToDisplay(formattedCastMember);
  console.log({
    tvShowId,
    castData,
    castList,
    foundCastMember,
    formattedCastMember,
  });
};

const displayResultsNotFoundMessage = (show, character) => {
  const nullValue = "<nothing entered>";
  alert(
    `Sorry, no results found for your show search of ${
      show ? show : nullValue
    } and/or your character search of ${
      character ? character : nullValue
    }. Please double check your spelling.`
  );
  document.getElementById("show-title-input").value = "";
  document.getElementById("character-input").value = "";
};

const nullResults = () => {
  const showTitleInputValue = document
    .getElementById("show-title-input")
    .value.toLowerCase();
  const characterInputValue = document
    .getElementById("character-input")
    .value.toLowerCase();
  displayResultsNotFoundMessage(showTitleInputValue, characterInputValue);
};

form.addEventListener("submit", handleFormSubmit);
