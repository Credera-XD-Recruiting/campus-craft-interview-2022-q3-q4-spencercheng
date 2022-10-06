import { removeChildNodes } from "../utils";

/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const {
    authorFirstName,
    authorLastName,
    authorAvatarSrc,
    jobTitle,
    companyName,
    post,
    publishDate,
    city,
    state
  } = data;
  const templateId = "profile-post-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const publishDisplayDate = clone.querySelector(".page-date");
  const location = clone.querySelector(".page-location");
  const authorName = clone.querySelector(".post-author-info .page-paragraph");
  const jobDesc = clone.querySelector(".post-author-info .page-micro");
  const postNode = clone.querySelector(".content");
  const avatarNode = clone.querySelector(".post-author-avatar");
  const collapseNode = clone.querySelector(".collapsible");

  location.innerHTML = `${city}, ${state}`;
  publishDisplayDate.innerHTML = `${publishDate.split("T")[0]}`;
  authorName.innerHTML = `${authorFirstName} ${authorLastName}`;
  jobDesc.innerHTML = `${jobTitle} @ ${companyName}`;
  postNode.innerHTML = post;

  if (authorAvatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = authorAvatarSrc;
    avatarImg.setAttribute(
      "aria-label",
      `${authorFirstName} ${authorLastName}`
    );
    avatarNode.appendChild(avatarImg);
  } else {
    
    var initials = authorFirstName.substring(0, 1).toUpperCase() + authorLastName.substring(0, 1).toUpperCase();

    console.log(initials);
  
    const avatarImg = document.createElement("div");
    avatarImg.textContent = `${initials}`;
    avatarNode.appendChild(avatarImg);
    avatarImg.setAttribute("style",  "text-align: center; font-size: 4vh; color: white; margin-top:3vh;")
  
  }
  
  togglePostContent(collapseNode);
  
  return clone;
};

const togglePostContent = (collapseNode) => {
  collapseNode.addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generatePinnedPostsFromTemplate = (resultsData) => {
  const pinnedPostsList = document.querySelector(
    "#profile-posts .profile-post-results"
  );

  removeChildNodes(pinnedPostsList);

  if (resultsData.pinnedPost) {
    const postNode = generateCardNode(resultsData.pinnedPost);
    pinnedPostsList.appendChild(postNode);
  }
};
