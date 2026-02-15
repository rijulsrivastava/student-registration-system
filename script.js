const form = document.getElementById("form");
const studentRecord = document.getElementById("studentRecord");

// Loading previously stored data when webpage reloads
let student = localStorage.getItem("student");

if (student) {
  student = JSON.parse(student);
} else {
  student = [];
}

// Displaying student record
function displayStudents() {
  studentRecord.innerHTML = "";

  student.forEach((s, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${s.name}</td>
        <td>${s.id}</td>
        <td>${s.email}</td>
        <td>${s.contactNumber}</td>
        <td>
        <div class="button-div">
            <button class="action-button edit-button" onclick="editStudent(${index})">
            <i class="fa-regular fa-pen-to-square"></i>
        
            </button>
            <button class="action-button delete-button" onclick="deleteStudent(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        </td>`;
    studentRecord.appendChild(row);
  });
}

// Validating input-field
function validateInputs(name, id, email, contactNumber) {
  const nameCheck = /^[A-Za-z\s]+$/;
  const numberCheck = /^\d+$/;
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !id || !email || !contactNumber) return false;
  if (!nameCheck.test(name)) return false;
  if (!numberCheck.test(id)) return false;
  if (!numberCheck.test(contactNumber) || contactNumber.length < 10)
    return false;
  if (!emailCheck.test(email)) return false;

  return true;
}

// updating record list

let editIndex = -1;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contactNumber = document.getElementById("contactNumber").value.trim();

  const name = (firstName + " " + lastName).trim();

  if (!validateInputs(name, id, email, contactNumber)) {
    alert("Invalid input");
    return;
  }

  const studentData = { name, id, email, contactNumber };

  if (editIndex === -1) {
    student.push(studentData);
  } else {
    student[editIndex] = studentData;
    editIndex = -1;
  }

  localStorage.setItem("student", JSON.stringify(student));
  form.reset();
  displayStudents();
});

// changes to record
function editStudent(index) {
  const s = student[index];

  const nameParts = s.name.split(" ");

  document.getElementById("firstName").value = nameParts[0] || "";
  document.getElementById("lastName").value =
    nameParts.slice(1).join(" ") || "";

  document.getElementById("studentId").value = s.id;
  document.getElementById("email").value = s.email;
  document.getElementById("contactNumber").value = s.contactNumber;

  editIndex = index;
}

// Removing a student
function deleteStudent(index) {
  if (confirm("Do you want to delete this student record?")) {
    student.splice(index, 1);
    localStorage.setItem("student", JSON.stringify(student));
    displayStudents();
  }
}

displayStudents();
