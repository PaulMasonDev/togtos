import TMDB_API_KEY from "./apikey.js";
import { titleCaseString } from "./utils.js";

const form = document.getElementById("search-form");

const imgBaseUrl = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";

const getShowId = async (showTitle) => {
  const searchShowUrl = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&language=en-US&page=1&query=${showTitle}&include_adult=false`;
  const showResponse = await fetch(searchShowUrl);
  const showData = await showResponse.json();
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
    .value.toLowerCase()
    .trim();
  const foundCast = castList.find((castMember) => {
    for (const character of castMember.characterNames) {
      if (character === characterInputValue) return true;
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
  //GET SHOW LOGIC
  const showTitleInput = document.getElementById("show-title-input");
  const showIdResults = await getShowId(
    showTitleInput.value.toLowerCase().trim()
  );
  if (showIdResults == null) {
    displayShowNotFoundMessage(showTitleInput.value);
    return;
  }
  const { tvShowId, showTitle } = showIdResults;
  const castData = await getCastData(tvShowId);
  const castList = generateCastList(castData.cast);
  const foundCastMember = searchCastList(castList);
  if (foundCastMember == null) {
    displayCharacterNotFoundMessage(
      document.getElementById("character-input").value
    );
    return;
  }
  const formattedCastMember = formatCastMember(foundCastMember, showTitle);
  sendToDisplay(formattedCastMember);
};

const displayShowNotFoundMessage = (show) => {
  alert(`Sorry, no results found for your search of "${show}".`);
  document.getElementById("show-title-input").focus();
};

const displayCharacterNotFoundMessage = (character) => {
  alert(`Sorry, no results found for your search of "${character}".`);
  document.getElementById("show-title-input").focus();
};

form.addEventListener("submit", handleFormSubmit);
