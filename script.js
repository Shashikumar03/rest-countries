async function fetchingApi(api) {
  try {
    const jsonData = await fetch(api);
    const jsonObject = await jsonData.json();
    return jsonObject;
  } catch (error) {}
}

fetchingApi("https://restcountries.com/v3.1/all")
  .then((countries) => takeEssentialData(countries))
  .then((countryWiseInformations) =>
    displayCountryDetails(countryWiseInformations)
  )
  .catch((error) => console.error(error));

function takeEssentialData(countries) {
  return new Promise((resolve, reject) => {
    const countryWiseInformations = countries.reduce((accumulator, country) => {
      // accumulator.push(country.name.common);
      accumulator[country.name.common] = {};
      accumulator[country.name.common]["population"] = country.population;
      accumulator[country.name.common]["region"] = country.region;
      accumulator[country.name.common]["subregion"] = country.subregion;
      accumulator[country.name.common]["capital"] = country.capital;
      if (country.currencies != null || countries.currencies != undefined) {
        const currencyArray = Object.keys(country.currencies);
        const currencyNameArray = [];
        currencyArray.forEach((currencyCode) => {
          const currecyName = country.currencies[currencyCode].name;
          currencyNameArray.push(currecyName);
        });
        accumulator[country.name.common]["currency"] = currencyNameArray;
      }
      if (country.languages != null || country.languages != undefined) {
        accumulator[country.name.common]["language"] = Object.values(
          country.languages
        );
      }
      accumulator[country.name.common]["flags"] = country.flags.png;
      return accumulator;
    }, {});
    if (Object.keys(countryWiseInformations).length < 1) {
      reject("no data found ");
    } else {
      resolve(countryWiseInformations);
    }
  });
}
function displayCountryDetails(countryWiseInformations) {
  // console.log(countryWiseInformations);
  Object.keys(countryWiseInformations).forEach((countryName) => {
    const { population, region, capital, flags } =
      countryWiseInformations[countryName];

    const countryDiv = document.createElement("div");
    countryDiv.className = "country";
    const imgTag = document.createElement("img");
    const countryInformationTextDiv = document.createElement("div");

    countryInformationTextDiv.className = "country-detail-text";
    //image dalna hai
    imgTag.src = `${flags}`;
    countryDiv.appendChild(imgTag);
    //  country ka name dalna hai
    const countryDetailNameDiv = document.createElement("div");
    countryDetailNameDiv.className = "country-name";
    const h2Tag = document.createElement("h2");
    h2Tag.appendChild(document.createTextNode(countryName));
    countryDetailNameDiv.append(h2Tag);
    countryInformationTextDiv.append(countryDetailNameDiv);

    const countryAllDetailsTextDiv = document.createElement("div"); //dalna hai pop,region and capiptal;
    countryAllDetailsTextDiv.className = "country-left-details";
    //population dalna hai
    const populationPTag = document.createElement("p");
    const populationSpan = document.createElement("span");
    populationSpan.className = "details";
    populationSpan.appendChild(document.createTextNode("Population:"));
    populationPTag.append(populationSpan);
    populationPTag.appendChild(document.createTextNode(` ${population}`));
    countryAllDetailsTextDiv.appendChild(populationPTag);
    // region dalna hai
    const regionPTag = document.createElement("p");
    const regionSpan = document.createElement("span");
    regionSpan.className = "details";
    regionSpan.appendChild(document.createTextNode("Region:"));
    regionPTag.append(regionSpan);
    const regionText = document.createTextNode(` ${region}`);
    regionPTag.appendChild(regionText);
    countryAllDetailsTextDiv.appendChild(regionPTag);

    //capital
    const capitalPTag = document.createElement("p");
    const capitalSpan = document.createElement("span");
    capitalSpan.className = "details";
    capitalSpan.appendChild(document.createTextNode("Capital:"));
    capitalPTag.append(capitalSpan);
    const capitalText = document.createTextNode(` ${capital}`);
    capitalPTag.appendChild(capitalText);
    countryAllDetailsTextDiv.appendChild(capitalPTag);

    //  information div me dalna hai
    countryInformationTextDiv.append(countryAllDetailsTextDiv);
    countryDiv.appendChild(countryInformationTextDiv);
    // html me dal do
    const container = document.getElementById("firstDiv");
    container.appendChild(countryDiv);

    console.log(container);
  });
}
