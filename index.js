// My GitHub Link :- https://github.com/dilnakt-bnglr/student-registration-system

var selectedCardToEdit;
const studentDataDiv = document.querySelector(".std-data");
const button = document.querySelector(".addBtn");
button.addEventListener("click", handleAddStudent);

document.addEventListener('DOMContentLoaded', function() {
    loadStudentsFromLocalStorage();
    studentDataDiv.style.overflowY='auto';
    studentDataDiv.style.height='80vh';
});

// To get the details og student
function getStudentCardHTML() {
  return `<dl>
        <dt>Name:</dt>
        <dd>${this.studentName}</dd>
        <dt>ID:</dt>
        <dd>${this.studentId}</dd>
        <dt>Email</dt>
        <dd>${this.studentEmail}</dd>
        <dt>Mobile Number</dt>
        <dd>${this.studentNumber}</dd>
    </dl>`;
}

// Validation for name
function hasNumber(str) {
  for (let ch of str) {
    if (ch >= "0" && ch <= "9") {
      return true;
    }
  }
  return false;
}

// Validation for User Details
function validateUserDetails(studentDetails) {
  const errorMsgs = document.querySelectorAll(".error-msg");
  if (errorMsgs && errorMsgs.length > 0) {
    for (let msg of errorMsgs) {
      msg.remove();
    }
  }
  let isvalid = true;

  if (
    !studentDetails.studentName ||
    !studentDetails.studentId ||
    !studentDetails.studentEmail ||
    !studentDetails.studentNumber
  ) {
    const formDiv = document.querySelector(".formContainer");
    const formbtn = document.querySelector(".btn");
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error-msg");
    errorMsg.innerHTML = "All fields are required";
    formDiv.insertBefore(errorMsg, formbtn);
    isvalid = false;
  }

  if (hasNumber(studentDetails.studentName)) {
    const stdName = document.querySelector("#stdname");
    const validMsg = document.createElement("p");
    validMsg.classList.add("error-msg");
    validMsg.innerHTML = "Name should be in text format only.";
    stdName.insertAdjacentElement("afterend", validMsg);
    isvalid = false;
  }
  if (
    studentDetails.studentNumber &&
    studentDetails.studentNumber.length !== 10
  ) {
    const stdNumber = document.querySelector("#stdnumber");
    const validMsg = document.createElement("p");
    validMsg.classList.add("error-msg");
    validMsg.innerHTML = "Mobile number should be of 10 digits.";
    stdNumber.insertAdjacentElement("afterend", validMsg);
    isvalid = false;
  }
  return isvalid;
}

// Reset Input Field
function resetInputField() {
  document.getElementById("stdname").value = "";
  document.getElementById("stdid").value = "";
  document.getElementById("stdemail").value = "";
  document.getElementById("stdnumber").value = "";
}

// Add a student
function handleAddStudent() {
  const studentDetails = {
    studentName: document.getElementById("stdname").value,
    studentId: document.getElementById("stdid").value,
    studentEmail: document.getElementById("stdemail").value,
    studentNumber: document.getElementById("stdnumber").value,
  };

  const validate = validateUserDetails(studentDetails);
  if (!validate) return;
  createStudentCard(studentDetails);
  resetInputField();
  setStudentDetailsToLocalStorage();
}

// Delete a student card
function deleteStudentCard(e) {
  const cardDiv = e.target.closest(".std-card");
  if (cardDiv) {
    cardDiv.remove();
    setStudentDetailsToLocalStorage();
  }
}

// Edit button functionalities
function editStudentCard(e) {
  selectedCardToEdit = e.target.closest(".std-card");
  if (selectedCardToEdit) {
    const ddElements = selectedCardToEdit.querySelectorAll("dd");
    const values = Array.from(ddElements).map((dd) => dd.textContent);
    document.getElementById("stdname").value = values[0];
    document.getElementById("stdid").value = values[1];
    document.getElementById("stdemail").value = values[2];
    document.getElementById("stdnumber").value = values[3];
  }
  document.querySelector(".addBtn").hidden = true;
  const mainBtnDiv = document.querySelector(".btn");
  const oldUpdateBtn = mainBtnDiv.querySelector(".updatebtn");
  if (oldUpdateBtn) {
    oldUpdateBtn.remove();
  }
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("updatebtn");
  updateBtn.innerHTML = "Update";
  updateBtn.addEventListener("click", updateStudentData);
  mainBtnDiv.appendChild(updateBtn);
}

// Updates student card with new details
function updateStudentData() {
  const updatedStudentDetails = {
    studentName: document.getElementById("stdname").value,
    studentId: document.getElementById("stdid").value,
    studentEmail: document.getElementById("stdemail").value,
    studentNumber: document.getElementById("stdnumber").value,
  };
  const validate = validateUserDetails(updatedStudentDetails);
  if (!validate) return;
  const existingStudentDetailsElement = selectedCardToEdit.querySelector("dl");
  const updatedStudentDetailsElement = getStudentCardHTML.call(
    updatedStudentDetails
  );
  const newStudentElement = document.createElement("div");
  newStudentElement.innerHTML = updatedStudentDetailsElement;
  selectedCardToEdit.replaceChild(
    newStudentElement,
    existingStudentDetailsElement
  );
  document.querySelector(".updatebtn").hidden = true;
  document.querySelector(".addBtn").hidden = false;
  resetInputField();
  setStudentDetailsToLocalStorage();
}

// Adding array of students to local storage
function setStudentDetailsToLocalStorage() {
  const stdCards = document.querySelectorAll(".std-card");
  const students = [];
  stdCards.forEach((card) => {
    const dd = card.querySelectorAll("dd");
    students.push({
      studentName: dd[0].textContent,
      studentId: dd[1].textContent,
      studentEmail: dd[2].textContent,
      studentNumber: dd[3].textContent,
    });
  });
  localStorage.setItem("students", JSON.stringify(students));
}

// Getting student Details from local storage
function loadStudentsFromLocalStorage() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach((student) => {
    createStudentCard(student);
  });
}

// Student card creation
function createStudentCard(studentDetails){
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("std-card");
  const studentValue = getStudentCardHTML.call(studentDetails);
  cardDiv.innerHTML = studentValue;
  const btnDiv = document.createElement("div");
  btnDiv.classList.add("std-card-btn");
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editButton.classList.add("edit-btn");
  editButton.addEventListener("click", editStudentCard);
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", deleteStudentCard);
  btnDiv.appendChild(editButton);
  btnDiv.appendChild(deleteButton);
  cardDiv.appendChild(btnDiv);
  studentDataDiv.appendChild(cardDiv);
}
