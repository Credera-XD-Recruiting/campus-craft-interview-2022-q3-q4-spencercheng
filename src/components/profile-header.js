import underlineSrc from "../assets/underline.svg";

export const updateProfileInformation = (data) => {
  const { firstName, lastName, avatarSrc} = data;
  const headerNode = document.querySelector("#profile-header .profile-header");
  const profileAvatarNode = headerNode.querySelector("img");
  const profileNameNode = headerNode.querySelector(".profile-avatar");
  const nameNode = headerNode.querySelector(".profile-info .profile-info-name");
  const underlineNode = headerNode.querySelector(".profile-underline");

  underlineNode.setAttribute("src", underlineSrc);

  nameNode.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--half"
  );

  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${firstName} ${lastName}`);
    profileAvatarNode.appendChild(avatarImg);
   } else {
    profileAvatarNode.remove()
    var initials = firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase();

    console.log(initials);
  
    const avatarImg = document.createElement("div");
    avatarImg.textContent = `${initials}`;
    profileNameNode.appendChild(avatarImg);
    avatarImg.setAttribute("style",  "text-align: center; font-size: 4vh; color: white; margin-top:3vh;")
  
  }

  nameNode.innerHTML = `${firstName} ${lastName}`;
  nameNode.appendChild(underlineNode);


  // if (!avatarSrc) {
  //   profileAvatarNode.remove();
  // }
};
