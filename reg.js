document.addEventListener("DOMContentLoaded", () => {
    // Show and Hide Forms
    document.getElementById("registerBtn").addEventListener("click", function () {
        document.getElementById("registrationForm").style.display = "block";
        document.getElementById("viewRegistration").style.display = "none";
    });

    document.getElementById("viewBtn").addEventListener("click", function () {
        document.getElementById("registrationForm").style.display = "none";
        document.getElementById("viewRegistration").style.display = "block";
        fetchRegisteredChildren();
    });

    document.getElementById("cancelBtn").addEventListener("click", function () {
        document.getElementById("registrationForm").style.display = "none";
    });

    // Register Child
    document.getElementById("registerForm").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent page refresh

        const formData = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            dob: document.getElementById("dob").value,
            gender: document.getElementById("gender").value,
            bloodGroup: document.getElementById("bloodGroup").value,
            fatherName: document.getElementById("fatherName").value,
            motherName: document.getElementById("motherName").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
        };

        try {
            const response = await fetch("http://localhost:5000/registerChild", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            alert(result.message); // Show success message
            document.getElementById("registerForm").reset(); // Clear form after submission
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed!");
        }
    });

    // Fetch Registered Children
    async function fetchRegisteredChildren() {
        try {
            const response = await fetch("http://localhost:5000/getChildren");
            const children = await response.json();

            const container = document.getElementById("childList");
            container.innerHTML = ""; // Clear previous data

            children.forEach((child) => {
                const childCard = document.createElement("div");
                childCard.classList.add("child-card");
                childCard.innerHTML = `
                    <p><strong>Name:</strong> ${child.name}</p>
                    <p><strong>Age:</strong> ${child.age}</p>
                    <p><strong>DOB:</strong> ${child.dob}</p>
                    <p><strong>Gender:</strong> ${child.gender}</p>
                    <p><strong>Blood Group:</strong> ${child.bloodGroup}</p>
                    <p><strong>Father:</strong> ${child.fatherName}</p>
                    <p><strong>Mother:</strong> ${child.motherName}</p>
                    <p><strong>Phone:</strong> ${child.phone}</p>
                    <p><strong>Address:</strong> ${child.address}</p>
                `;
                container.appendChild(childCard);
            });
        } catch (error) {
            console.error("Error fetching children:", error);
        }
    }
});
