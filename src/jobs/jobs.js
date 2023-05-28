const companyJobs = document.querySelector(".company-jobs");

export function displayJobsCards(companysJobData) {
  companyJobs.innerHTML = "";
  const baseImgPath = "./assets/static-job-listings-master/";

  companysJobData.forEach((companyJob, index) => {
    const {
      id,
      company,
      logo,
      new: companyNew,
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
      <div class="company-card">
        <div class="company-image">
          <img src=${baseImgPath}${logo} alt="company logo" />
        </div>
        <div class="company-info flex">
          <h3>${company}</h3>
          <p>${companyNew ? "NEW!" : ""}</p>
          <p>${featured ? "FEATURED" : ""}</p>
        </div>
        <div class="company-role">${position}</div>
        <div class="company-role_desc">
          <span>${postedAt}</span>
          <span>${contract}</span>
          <span>${location}</span>
        </div>
        <p>Filters: </p>
        <ul class="filters flex">
          <li>
            <button class="buttons">${role}</button>
          </li>
          <li>
            <button class="buttons">${level}</button>
          </li>
        </ul>
      </div>
      `;
    companyJobs.insertAdjacentHTML("beforeend", html);

    const filters = companyJobs.querySelectorAll(".filters");
    const currentFilters = filters[index];

    languages.forEach((language) => {
      const html = `<li><button class="buttons">${language}</button></li>`;
      currentFilters.insertAdjacentHTML("beforeend", html);
    });

    tools.forEach((tool) => {
      const html = `<li><button class="buttons">${tool}</button></li>` || [];
      currentFilters.insertAdjacentHTML("beforeend", html);
    });
  });
}
