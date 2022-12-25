const inputBtn = document.getElementById("input-btn");
const clearBtn = document.getElementById("clear-btn");
const tabBtn = document.getElementById("tab-btn");
const inputEl = document.getElementById("input-el");
const listEl = document.getElementById("list-el");
let myLeads = [];
const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromStorage) {
  myLeads = leadsFromStorage;
  render(myLeads);
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  console.log("Button clicked");
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

clearBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  // Clear the list element
  listEl.innerHTML = "";
  // Iterate over the myLeads array and append each item to the list element
  for (let i = 0; i < leads.length; i++) {
    listEl.innerHTML += `
    <li>
    <a href= "${leads[i]}" target="_blank"> ${leads[i]} </a>
    </li>`;
  }
}
