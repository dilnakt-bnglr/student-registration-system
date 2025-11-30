const studentDataDiv=document.querySelector(".std-data");
const button=document.querySelector(".addBtn");
button.addEventListener("click", handleAddStudent);
function getStudentCardHTML(){
    const studentName=document.getElementById("stdname").value;
    const studentId=document.getElementById("stdid").value;
    const studentEmail=document.getElementById("stdemail").value;
    const studentNumber=document.getElementById("stdnumber").value;

    return `<dl>
        <dt>Name:</dt>
        <dd>${studentName}</dd>
        <dt>ID:</dt>
        <dd>${studentId}</dd>
        <dt>Email</dt>
        <dd>${studentEmail}</dd>
        <dt>Mobile Number</dt>
        <dd>${studentNumber}</dd>
    </dl>`;
}

function handleAddStudent(){
    debugger
    console.log(studentDataDiv);
    const cardDiv=document.createElement("div");
    cardDiv.classList.add("std-card");
    const a = getStudentCardHTML();
    cardDiv.innerHTML = a;
    const btnDiv=document.createElement("div");
    btnDiv.classList.add("std-card-btn");
    const editButton = document.createElement("button");
    editButton.innerHTML='<i class="fa-solid fa-pen-to-square"></i>';
    const deleteButton=document.createElement("button");
    deleteButton.innerHTML='<i class="fa-solid fa-trash"></i>';
    btnDiv.appendChild(editButton);
    btnDiv.appendChild(deleteButton);
    cardDiv.appendChild(btnDiv);
    studentDataDiv.appendChild(cardDiv);
}