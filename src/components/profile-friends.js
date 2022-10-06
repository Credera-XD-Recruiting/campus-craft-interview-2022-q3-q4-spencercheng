import { removeChildNodes } from "../utils";

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */
const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data;
  const templateId = "friend-list-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const nameNode = clone.querySelector("p.page-paragraph");
  const titleNode = clone.querySelector("p.page-micro");
  const avatarNode = clone.querySelector(".profile-list-item-avatar");
  const friendNode = clone.querySelector("p.top-friend-flag");

  nameNode.innerHTML = `${name}`;
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`;
  avatarNode.src = avatarSrc;
  avatarNode.setAttribute("aria-label", `${name}`);

  if (topFriend) {
    friendNode.setAttribute('style', 'display:initial');
  }


  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${name}`);
    avatarNode.appendChild(avatarImg);
   } else {
    const names = name.split(' ');
    var initials = names[0].substring(0, 1).toUpperCase() + names[1].substring(0, 1).toUpperCase();
    const avatarImg = document.createElement("div");
    avatarImg.textContent = `${initials}`;
    avatarNode.appendChild(avatarImg);
    avatarImg.setAttribute("style",  "text-align: center; font-size: 4vh; color: white; margin-top:3.5vh;")
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateFriendsListFromTemplate = (resultsData) => {
  const friendsListSection = document.querySelector(
    "#profile-friends .profile-friends-list"
  );
  
  resultsData.friends.sort(function (x, y) {
    if (x.topFriend === y.topFriend) {
        return x.name.split(" ")[1].localeCompare(y.name.split(" ")[1]);
    } return x.topFriend ? -1 : 1
  });

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection);

    for (let i = 0; i < resultsData.friends.length; i++) {
      const friendsNode = generateListItemNode(resultsData.friends[i]);
      friendsListSection.appendChild(friendsNode);
    }
  }
};
