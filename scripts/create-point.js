function pupulateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

pupulateUfs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOffSelected = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOffSelected].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// Items de coleta

const itemsToColected = document.querySelectorAll(".itens-grid li");

for (const item of itemsToColected) {
  item.addEventListener("click", handleSelectedItem);
}

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  itemLi.classList.toggle("selected");
  const itemId = itemLi.dataset.id;

  const alreadyISelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  if (alreadyISelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }
  collectedItems.value = selectedItems;
}
