import { removeChildNodes } from "../utils";
import underlineSrc from "../assets/icons8-heart-30.png";
const activityStates = {
  active: "active",
  inactive: "inactive",
  moderate: "moderate",
  low: "low",
};
/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const { name, href, image, activity,favorite} = data;
  const templateId = "profile-group-results-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const titleNode = clone.querySelector("p.page-paragraph");
  const referenceNode = clone.querySelector("a.profile-group-results-card");
  const groupImageNode = clone.querySelector(
    "a.profile-group-results-card img"
  );
  const groupNode = clone.querySelector(
    "a.profile-group-results-card.content-card.fade-in"
  );
  const favoriteNode = clone.querySelector(
    ".profile-group-content"
  );

  if (favorite) {
    const avatarImg = document.createElement("img", "div");
    avatarImg.src = underlineSrc;
    avatarImg.setAttribute("z-index", "1000");
    avatarImg.setAttribute("height", "30px");
    favoriteNode.appendChild(avatarImg);
  }

  // activity colors
  switch(activity) {
    case 'active':
      groupNode.setAttribute('style', 'background-color:#52C1AD');
      break;
    case 'moderate':
      groupNode.setAttribute('style', 'background-color:#58B1C9');
      break;
    case 'low':
      groupNode.setAttribute('style', 'background-color:#C152A2');
      break;
    case 'inactive':
      groupNode.setAttribute('style', 'background-color:#C4C4C4');
      break;
  }


  titleNode.innerHTML = `${name}`;
  referenceNode.href = href;
  groupImageNode.src = image;

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateProfileGroupItemsFromTemplate = (resultsData) => {
  const profileGroupsList = document.querySelector(
    "#profile-groups .profile-group-results"
  );

  removeChildNodes(profileGroupsList);

  if (resultsData.groups && resultsData.groups.length > 0) {
    for (let i = 0; i < resultsData.groups.length; i++) {
      const groupNode = generateCardNode(resultsData.groups[i]);
      profileGroupsList.appendChild(groupNode);
    }
  }
};
