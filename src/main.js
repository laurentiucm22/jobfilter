"use strict";
import data from "../assets/static-job-listings-master/data.json";
const header = document.querySelector("#header");
const companyJobs = document.querySelector(".company-jobs");

const filterBarText = [];

function displayHeader() {
  header.innerHTML = "";

  const baseImageSrc = "./assets/static-job-listings-master/images/bg-header";

  if (window.innerWidth < 400) {
    header.innerHTML = `<img class="header_image width_full" src="${baseImageSrc}-mobile.svg" alt="header image" />`;
  } else {
    header.innerHTML = `<img class="header_image width_full" src="${baseImageSrc}-desktop.svg" alt="header image" />`;
  }
}
displayHeader();
window.addEventListener("resize", displayHeader);

// Redo everything
const companysJobDataCopy = [...data];

function displayJobsCards(companysJobData = companysJobDataCopy) {
  companyJobs.innerHTML = "";
  const baseImgPath = "./assets/static-job-listings-master/";

  companysJobData.forEach((companyJob) => {
    const {
      id,
      company,
      logo,
      new: newJob,
      featured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
    } = companyJob;

    const html = `
      <div class="company-card flex bg-white">
        <div class="flex">
          <div class="company-image">
            <img src=${baseImgPath}${logo} alt="company logo" />
          </div>
          <div>
            <div class="company-info flex">
              <h3 class="clr-primary">${company}</h3>
              <p>${newJob ? "NEW!" : ""}</p>
              <p>${featured ? "FEATURED" : ""}</p>
            </div>
            <div class="company-role">${position}</div>
            <div class="company-role_desc">
              <span>${postedAt}</span>
              <span>${contract}</span>
              <span>${location}</span>
            </div>
          </div>
        </div>
        <div>

          <form class="filter-form">
            <fieldset>
              <ul class="filters flex">
                <li>
                <input class="none" type="checkbox" value="${role}" id="${id}" />
                  <label for="role" class="jobs-buttons bg-filter_tablets">${role}</label>
                </li>

                <li>
                  <input class="none" type="checkbox" value="${level}" id="${id}" />
                  <label for="level" class="jobs-buttons bg-filter_tablets">${level}</label>
                </li>

                ${languages
                  .map(
                    (language, index) =>
                      `<li>
                        <input class="none" type="checkbox" value="${languages[index]}" id="${id}" />
                        <label for="languages" class="jobs-buttons bg-filter_tablets">${language}</label>
                      </li>`
                  )
                  .join("")}
                  
                ${tools
                  .map(
                    (tool, index) =>
                      `<li>
                        <input class="none" type="checkbox" value="${tool[index]}" id="${tool}" />
                        <label for="tools" class="jobs-buttons bg-filter_tablets">${tool}</label>
                      </li>`
                  )
                  .join("")}
              </ul>
            </fieldset>
          </form>
        </div>
      </div>
      `;

    companyJobs.insertAdjacentHTML("beforeend", html);
  });
}
displayJobsCards(companysJobDataCopy);
handleButtons();

const filterJobsByText = (text) => {
  const filteredJobs = companysJobDataCopy.filter((job) => {
    // form, cu checkbox
    // on every click submit form
    return (
      job.role === text ||
      job.level === text ||
      job.languages.includes(text) ||
      job.tools.includes(text)
    );
  });

  displayJobsCards(filteredJobs);
  handleButtons();
};

function handleButtons() {
  const jobButtonsLabel = document.querySelectorAll(".jobs-buttons");
  const filterCheckboxes = document.querySelectorAll("input[type='checkbox']");

  jobButtonsLabel.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      console.log(filterCheckboxes);
      filterCheckboxes[index].click();

      const buttonText = e.currentTarget.textContent;

      if (buttonText) {
        filterJobsByText(buttonText);

        filterBarText.push(buttonText);
        console.log(filterBarText);
      }
    });
  });
}
