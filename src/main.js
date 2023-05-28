import data from "../assets/static-job-listings-master/data.json";
import { displayHeader } from "./header/header.js";
import { displayJobsCards } from "./jobs/jobs";

const body = document.querySelector("body");

body.onload = function () {
  displayHeader();
  displayJobsCards(data);
};
