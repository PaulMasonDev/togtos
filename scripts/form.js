import TMDB_API_KEY from "./apikey.js";
import { titleCaseString } from "./utils.js";

const form = document.getElementById("search-form");

const imgBaseUrl = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";

const getShowId = async (showTitle) => {
  const searchShowUrl = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&language=en-US&page=1&query=${showTitle}&include_adult=false`;
  const showResponse = await fetch(searchShowUrl);
  const showData = await showResponse.json();
  return showData.results[0].id;
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
  return "None found";
};

const formatCastMember = (castMember) => {
  let formattedCastMember = {
    ...castMember,
    characterNames: [
      ...castMember.characterNames?.map((character) =>
        titleCaseString(character)
      ),
    ],
  };
  return formattedCastMember;
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const showTitleInputValue = document
    .getElementById("show-title-input")
    .value.toLowerCase();
  const tvShowId = await getShowId(showTitleInputValue);
  const castData = await getCastData(tvShowId);
  const castList = generateCastList(castData.cast);
  const foundCastMember = searchCastList(castList);
  const formattedCastMember = formatCastMember(foundCastMember);
  console.log({
    tvShowId,
    castData,
    castList,
    foundCastMember,
    formattedCastMember,
  });
};

form.addEventListener("submit", handleFormSubmit);
