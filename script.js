const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";
const dropDown = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let element of dropDown) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (element.name === "From" && currCode === "USD") {
      newOption.selected = true;
    }
    if (element.name === "To" && currCode === "INR") {
      newOption.selected = true;
    }
    element.append(newOption);
  }
  element.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountVal = Number(amount.value);
  console.log("Raw value:", amount.value);
  console.log("Converted:", amountVal);
  if (amountVal == "" || amountVal < 0) {
    amountVal = 1;
    amount.value = 1;
  }
  const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  // console.log(rate);
  let finalVal = (amountVal * rate).toFixed(3);

  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;
});
