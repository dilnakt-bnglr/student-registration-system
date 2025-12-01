const studentDataDiv = document.querySelector(".std-data");
const button = document.querySelector(".addBtn");
button.addEventListener("click", handleAddStudent);
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

function hasNumber(str) {
  for (let ch of str) {
    if (ch >= "0" && ch <= "9") {
      return true; // found a digit
    }
  }
  return false;
}

function isValidEmail(email) {
  return email.includes("@") && email.includes(".") && email.trim() === email;
}

function handleAddStudent() {
  const errorMsgs = document.querySelectorAll(".error-msg");
  if(errorMsgs && errorMsgs.length > 0){
  for(let msg of errorMsgs){
    msg.remove();
  }
}
  const studentDetails = {
    studentName: document.getElementById("stdname").value,
    studentId: document.getElementById("stdid").value,
    studentEmail: document.getElementById("stdemail").value,
    studentNumber: document.getElementById("stdnumber").value,
  };

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
    return;
  }

  if (hasNumber(studentDetails.studentName)) {
    const stdName = document.querySelector("#stdname");
    const validMsg = document.createElement("p");
    validMsg.classList.add("error-msg");
    validMsg.innerHTML = "Name should be in text format only.";
    stdName.insertAdjacentElement("afterend", validMsg);
    return;
  }
  if (studentDetails.studentNumber.length !== 10) {
    const stdNumber = document.querySelector("#stdnumber");
    const validMsg = document.createElement("p");
    validMsg.classList.add("error-msg");
    validMsg.innerHTML = "Mobile number should be of 10 digits.";
    stdNumber.insertAdjacentElement("afterend", validMsg);
    return;
  }

//   if(isValidEmail(studentDetails.studentEmail)){
//     const stdEmail=document.querySelector("#stdemail");
//     const validMsg = document.createElement("p");
//     validMsg.classList.add("error-msg");
//     validMsg.innerHTML="Enter a valid email";
//     stdEmail.insertAdjacentElement("afterend",validMsg);
//     return;
//   }

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("std-card");
  const a = getStudentCardHTML.call(studentDetails);
  cardDiv.innerHTML = a;
  const btnDiv = document.createElement("div");
  btnDiv.classList.add("std-card-btn");
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editButton.classList.add("edit-btn");
  editButton.addEventListener("click",editStudentCard);
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", deleteStudentCard);
  btnDiv.appendChild(editButton);
  btnDiv.appendChild(deleteButton);
  cardDiv.appendChild(btnDiv);
  studentDataDiv.appendChild(cardDiv);
}

function deleteStudentCard(e) {
  const cardDiv = e.target.closest(".std-card");
  if (cardDiv) {
    cardDiv.remove();
  }
}

function editStudentCard(e){
    const cardDiv = e.target.closest(".std-card");
    if (cardDiv) {
        const ddElements = cardDiv.querySelectorAll("dd");
        const values = Array.from(ddElements).map(dd => dd.textContent);
        console.log(values);
        document.getElementById("stdname").value=values[0]; 
        document.getElementById("stdid").value=values[1];
        document.getElementById("stdemail").value=values[2];
        document.getElementById("stdnumber").value=values[3];
        // [studentName, studentId, studentEmail, studentNumber]
    }
}
