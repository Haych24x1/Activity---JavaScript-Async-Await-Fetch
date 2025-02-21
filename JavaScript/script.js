async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayData(data, url);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("table-container").innerHTML = `<p style="color: red;">Error loading data.</p>`;
    }
}

function displayData(data, url) {
    let tableHTML = "<table><thead><tr>";

    if (url.includes("users")) {
        tableHTML += "<th>ID</th><th>Name</th><th>Email</th><th>Company</th>";
    } else {
        tableHTML += "<th>ID</th><th>Title</th><th>Body</th>";
    }

    tableHTML += "</tr></thead><tbody>";

    data.forEach(item => {
        tableHTML += "<tr>";
        if (url.includes("users")) {
            tableHTML += `<td>${item.id}</td><td>${item.name}</td><td>${item.email}</td><td>${item.company.name}</td>`;
        } else {
            tableHTML += `<td>${item.id}</td><td>${item.title}</td><td>${item.body}</td>`;
        }
        tableHTML += "</tr>";
    });

    tableHTML += "</tbody></table>";

    document.getElementById("table-container").innerHTML = tableHTML;
}