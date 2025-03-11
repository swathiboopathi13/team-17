document.getElementById("newRegBtn").addEventListener("click", () => {
    document.getElementById("registrationForm").classList.toggle("hidden");
});

document.getElementById("registerBtn").addEventListener("click", async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        address: document.getElementById("address").value,
        guardian: document.getElementById("guardian").value,
        contact: document.getElementById("contact").value,
        bloodGroup: document.getElementById("bloodGroup").value,
        healthCondition: document.getElementById("healthCondition").value,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value,
        education: document.getElementById("education").value,
        vaccinationStatus: document.getElementById("vaccinationStatus").value,
        disabilities: document.getElementById("disabilities").value,
        birthCertificate: document.getElementById("birthCertificate").value
    };

    await fetch("http://localhost:5000/api/register-child", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    alert("Child registered successfully!");
});
document.getElementById("viewBtn").addEventListener("click", () => {
    fetch("http://localhost:5000/get-registrations")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data); // Debugging log
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response format");
            }

            const tableBody = document.getElementById("childTableBody");
            tableBody.innerHTML = ""; // Clear previous data

            if (data.length === 0) {
                alert("No registrations found!");
                return;
            }

            data.forEach(child => {
                const row = `<tr>
                    <td>${child.id}</td>
                    <td>${child.name}</td>
                    <td>${child.age}</td>
                    <td>${child.gender}</td>
                    <td>${child.address}</td>
                    <td>${child.guardian}</td>
                    <td>${child.contact}</td>
                    <td>${child.blood_group}</td>
                    <td>${child.health_condition}</td>
                    <td>${child.height}</td>
                    <td>${child.weight}</td>
                    <td>${child.vaccination_status}</td>
                    <td>${child.disabilities}</td>
                    <td><a href="${child.birth_certificate}" target="_blank">View</a></td>
                </tr>`;
                tableBody.innerHTML += row;
            });

            document.getElementById("childTable").classList.remove("hidden");
        })
        .catch(error => console.error("Error fetching registrations:", error));
});

