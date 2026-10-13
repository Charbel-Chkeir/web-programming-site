const form = document.getElementById("profile-form-2");

const reviewPanel = document.getElementById("review-panel");
const reviewContent = document.getElementById("review-content");
const editButton = document.getElementById("edit-button");
const confirmButton = document.getElementById("confirm-button");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

const studentId = document.getElementById("student_id").value;
const fullName = document.getElementById("fullname").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const birthdate = document.getElementById("birthdate").value;
const portfolio = document.getElementById("portfolio").value;
const gin446 = document.getElementById("gin446").value;

const formVersion = document.querySelector(
    'input[name="form_version"]'
).value;

const major = document.getElementById("major").value;
const gpa = document.getElementById("gpa").value;
const credits = document.getElementById("credits").value;
const graduationMonth = document.getElementById("graduation_month").value;

const language = document.getElementById("language").value;

const projectTitle = document.getElementById("project_title").value;
const projectArea = document.getElementById("project_area").value;
const description = document.getElementById("description").value;
const teamSize = document.getElementById("team_size").value;
const projectColor = document.getElementById("project_color").value;
const meetingDate = document.getElementById("meeting_date").value;
const meetingTime = document.getElementById("meeting_time").value;


const graduation = document.querySelector(
  'input[name="graduation"]:checked'
)?.value;

const internshipCompleted = document.querySelector(
  'input[name="internship_completed"]:checked'
)?.value;

const skills = [
  ...document.querySelectorAll('input[name="skills"]:checked')
].map(function (checkbox) {
  return checkbox.value;
});

const softwareSelect = document.getElementById("software");

const software = [
  ...softwareSelect.selectedOptions
].map(function (option) {
  return option.value;
});

reviewContent.textContent = "";

const studentIdLine = document.createElement("p");
studentIdLine.textContent = "Student ID: " + studentId;
reviewContent.appendChild(studentIdLine);

const fullNameLine = document.createElement("p");
fullNameLine.textContent = "Full Name: " + fullName;
reviewContent.appendChild(fullNameLine);

const emailLine = document.createElement("p");
emailLine.textContent = "USEK Email: " + email;
reviewContent.appendChild(emailLine);

const phoneLine = document.createElement("p");
phoneLine.textContent = "Mobile Number: " + phone;
reviewContent.appendChild(phoneLine);

const birthdateLine = document.createElement("p");
birthdateLine.textContent = "Date of Birth: " + birthdate;
reviewContent.appendChild(birthdateLine);

const portfolioLine = document.createElement("p");
portfolioLine.textContent = "GitHub: " + (portfolio || "Not provided");
reviewContent.appendChild(portfolioLine);

const gin446Line = document.createElement("p");
gin446Line.textContent = "GIN446 Website: " + (gin446 || "Not provided");
reviewContent.appendChild(gin446Line);

const majorLine = document.createElement("p");
majorLine.textContent = "Engineering Major: " + major;
reviewContent.appendChild(majorLine);

const gpaLine = document.createElement("p");
gpaLine.textContent = "GPA: " + gpa;
reviewContent.appendChild(gpaLine);

const creditsLine = document.createElement("p");
creditsLine.textContent = "Credits Completed: " + credits;
reviewContent.appendChild(creditsLine);

const graduationLine = document.createElement("p");
graduationLine.textContent =
  "Expected Graduation: " + (graduation || "Not selected");
reviewContent.appendChild(graduationLine);

const graduationMonthLine = document.createElement("p");
graduationMonthLine.textContent =
  "Graduation Month & Year: " + graduationMonth;
reviewContent.appendChild(graduationMonthLine);

const internshipLine = document.createElement("p");
internshipLine.textContent =
  "Engineering Internship Completed: " + internshipCompleted;
reviewContent.appendChild(internshipLine);

const skillsLine = document.createElement("p");
skillsLine.textContent =
  "Skills: " + (skills.length > 0 ? skills.join(", ") : "None selected");
reviewContent.appendChild(skillsLine);

const languageLine = document.createElement("p");
languageLine.textContent =
  "Primary Programming Language: " + language;
reviewContent.appendChild(languageLine);

const softwareLine = document.createElement("p");
softwareLine.textContent =
  "Engineering Software Used: " +
  (software.length > 0 ? software.join(", ") : "None selected");
reviewContent.appendChild(softwareLine);

const projectTitleLine = document.createElement("p");
projectTitleLine.textContent =
  "Proposed Project Title: " + projectTitle;
reviewContent.appendChild(projectTitleLine);

const projectAreaLine = document.createElement("p");
projectAreaLine.textContent =
  "Preferred Project Area: " + projectArea;
reviewContent.appendChild(projectAreaLine);

const descriptionLine = document.createElement("p");
descriptionLine.textContent =
  "Project Description: " + description;
reviewContent.appendChild(descriptionLine);

const teamSizeLine = document.createElement("p");
teamSizeLine.textContent =
  "Preferred Team Size: " + teamSize;
reviewContent.appendChild(teamSizeLine);

const projectColorLine = document.createElement("p");
projectColorLine.textContent =
  "Project Dashboard Color: " + projectColor;
reviewContent.appendChild(projectColorLine);

const meetingDateLine = document.createElement("p");
meetingDateLine.textContent =
  "Preferred Meeting Date: " + (meetingDate || "Not provided");
reviewContent.appendChild(meetingDateLine);

const meetingTimeLine = document.createElement("p");
meetingTimeLine.textContent =
  "Preferred Meeting Time: " + (meetingTime || "Not provided");
reviewContent.appendChild(meetingTimeLine);


const formVersionLine = document.createElement("p");
formVersionLine.textContent =
    "Form Version: " + formVersion;
reviewContent.appendChild(formVersionLine);

form.classList.add("hidden");
reviewPanel.classList.remove("hidden");

// Automatically scroll to the top of the page
window.scrollTo(0, 500);

});

editButton.addEventListener("click", function () {
  reviewPanel.classList.add("hidden");
  form.classList.remove("hidden");
  window.scrollTo(0, 450);
});

confirmButton.addEventListener("click", function () {
  form.submit();
});