// Select elements
const attendanceVideo = document.getElementById("attendance-video");
const childVideo = document.getElementById("child-video");
const attendanceStatus = document.getElementById("attendance-status");
const childList = document.getElementById("child-list");

// Store registered children (Mock database)
let registeredChildren = JSON.parse(localStorage.getItem("children")) || [];

// Open Camera Function
function openCamera(videoElement) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoElement.srcObject = stream;
            videoElement.style.display = "block";
        })
        .catch(error => console.error("Error accessing webcam:", error));
}

// Attendance Camera Start
document.getElementById("start-attendance").addEventListener("click", () => {
    openCamera(attendanceVideo);
});

// New Child Camera Start
document.getElementById("start-child-camera").addEventListener("click", () => {
    openCamera(childVideo);
});

// Capture and Register Child
document.getElementById("capture-child").addEventListener("click", () => {
    const name = document.getElementById("child-name").value;
    const age = document.getElementById("child-age").value;
    const address = document.getElementById("child-address").value;

    if (!name || !age || !address) {
        alert("Please fill all fields!");
        return;
    }

    // Mock face registration (In actual implementation, store image and process face embedding)
    let newChild = { name, age, address, image: "mock_image_data" };
    registeredChildren.push(newChild);
    localStorage.setItem("children", JSON.stringify(registeredChildren));

    alert(`${name} Registered Successfully!`);
    updateChildList();
});

// Update Child List in View Details
function updateChildList() {
    childList.innerHTML = "";
    registeredChildren.forEach(child => {
        let li = document.createElement("li");
        li.textContent = `${child.name} (Age: ${child.age}) - ${child.address}`;
        childList.appendChild(li);
    });
}

// Mark Attendance (Mock Face Recognition)
document.getElementById("mark-attendance").addEventListener("click", () => {
    let detectedFace = "mock_image_data"; // Replace with actual face recognition logic

    let matchedChild = registeredChildren.find(child => child.image === detectedFace);
    if (matchedChild) {
        attendanceStatus.textContent = `Attendance Marked for ${matchedChild.name}`;
    } else {
        attendanceStatus.textContent = "Face Not Recognized!";
    }
});

// Load registered children on page load
updateChildList();
