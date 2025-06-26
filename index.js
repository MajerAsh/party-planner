const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2506-FTB-ET-WEB-FT-A-ash/events";

let events = [];
let selectedEvent = null;

async function getEvents() {
  try {
    const response = await fetch(`${API}/events`);
    const result = await response.json();
    artists = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
  render();
}

async function getEvent(id) {
  try {
    const response = await fetch(`${API}/events/${id}`);
    const result = await response.json();
    selectedArtist = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

function eventListItem(event) {
  const $li = document.createElement("li");

  if (event.id === selectedEvent?.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `
    <a href="#selected">${event.name}</a>
  `;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("parties");

  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);

  return $ul;
}

/** Detailed information about the selected party */
function SelectedParty() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $party = document.createElement("section");
  $party.innerHTML = `
    <h3>${selectedParty.name} #${selectedParty.id}</h3>
    <time datetime="${selectedParty.date}">
      ${selectedParty.date.slice(0, 10)}
    </time>
    <address>${selectedParty.location}</address>
    <p>${selectedParty.description}</p>
    <GuestList></GuestList>
  `;
  $party.querySelector("GuestList").replaceWith(GuestList());

  return $party;
}
// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <SelectedParty></SelectedParty>
      </section>
    </main>
  `;

  $app.querySelector("eventList").replaceWith(PartyList());
  $app.querySelector("selectedEvent").replaceWith(SelectedParty());
}

async function init() {
  await getEvents();
  render();
}

init();
