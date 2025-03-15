const images = [
    { id: 1, name: "John", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtLZs1Q8tDiMlf0bx03pRzTKpz8ekwap9m7A&s" },
    { id: 2, name: "Joe", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4CpRFl_o1Ze3m4V6cbYTr763tPBP47LDUHw&s" },
    { id: 3, name: "Grey", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSkg4GTTqmrEhQTDUqj6QW2BoqNBOUxHmWhg&s" },
    { id: 4, name: "Emma", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhdNYszWqNSoUjNwQ3RVGpJq-IA8HVEcXDbw&s" },
    { id: 5, name: "Noah", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdCCltvH_TAjByrcuDKHLs2PGiVPOgnnq5A&s" },
    { id: 6, name: "Ava", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoEV8gtK1h08xWMdSiIJ_Cbv8n_yfLT7WsFA&s" },
    { id: 7, name: "Liam", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-PLT11JwQ24jXtRfbwG9BIdR9HDrvHsDAg&s" },
    { id: 8, name: "Sophia", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSblA4BSdxc7CgnmZZu-172Ouj1DneQwaC6UA&s" },
    { id: 9, name: "Lucas", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Sx1nCSqexdRuCweqKDjUbo-bTHPetzL-nQ&s" },
    { id: 10, name: "Mia", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vCE_LbDl0UPMUnd9z_IC-Fo7v_TjK-yGw&s" },
    { id: 11, name: "Ethan", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREwS9weEItXYKJ9l9k9IyNhkK6jwRzb50hog&s" },
    { id: 12, name: "Isabella", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScXApWwKrvi6nZCdzHg4u8-XnznCCeyU67rQ&s" },
    { id: 13, name: "Mason", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQznWbI7poxaFz7686cAVNPcz1r_867ZcQU0Q&s" },
    { id: 14, name: "Oliver", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG2uYDm3yhQr-Zjy6tR5vT65En0BGdFDZLww&s" },
    { id: 15, name: "Ella", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1uVvMmr33oOCduEqggjoC81yDuAr9v7cUHQ&s" },
    { id: 16, name: "Elijah", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDoYKyokfeL48EvN09rzMR852CnapkWPDvaQ&s" },
    { id: 17, name: "Charlotte", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoEV8gtK1h08xWMdSiIJ_Cbv8n_yfLT7WsFA&s" },
    { id: 18, name: "James", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkFfliQuXn6CehPhxS_sov5ReaHqMm9m2PPw&s" },
    { id: 19, name: "Amelia", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SLUjT9AbxI42cAgewhr1m2_3C1-mM9nHVw&s" },
    { id: 20, name: "Benjamin", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJ4Gis4iO7EW2WFitJMTJW9ICaiJOjV4pqg&s" }
];

let currentIndex = 0;
const imageContainer = document.getElementById("imageContainer");
const presentList = document.getElementById("presentList");
const absentList = document.getElementById("absentList");

function showImage(index) {
    imageContainer.innerHTML = `
        <img src="${images[index].src}" alt="${images[index].name}">
        <h3>${images[index].name}</h3>
        <button onclick="markAttendance(${index}, 'Present')">Present</button>
        <button onclick="markAttendance(${index}, 'Absent')">Absent</button>
    `;
}

function markAttendance(index, status) {
    const child = images[index];

    fetch("/mark-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: child.id, name: child.name, status, image: child.src })
    });

    const card = document.createElement("div");
    card.classList.add("child-card");
    card.innerHTML = `<img src="${child.src}"><p>${child.name}</p>`;

    if (status === "Present") {
        presentList.appendChild(card);
    } else {
        absentList.appendChild(card);
    }
}

document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

showImage(currentIndex);
