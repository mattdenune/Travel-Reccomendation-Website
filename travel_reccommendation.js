const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");
const searchInput = document.getElementById("conditionDestination").value;

function searchLocation() {
  const input = document
    .getElementById("conditionDestination")
    .value.toLowerCase();
  console.log("Input:", input);
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("travel_reccommendation_api.json")
    .then((response) => response.json())
    .then((data) => {

      const beaches = [...data.beaches];
      const temples = [...data.temples];
      const countries = [...data.countries[1].cities];

      if (input === "beaches" || input === "beach") {
        destination = beaches;
      } else if (input === "temples" || input === "temple") {
        destination = temples;
      } else if (input === "countries" || input === "country") {
        destination = countries;
      }

      if (destination) {
        destination.map((item) => {
          console.log(typeof destination.toString());
          resultDiv.style.display = "block";

          const name = item.name;
          const image = item.imageUrl;
          const description = item.description;

          resultDiv.innerHTML += `<img class='resultImage' src="${image}" alt="hjh">`;
          resultDiv.innerHTML += `<h2 class='resultName' >${name}</h2>`;
          resultDiv.innerHTML += `<p class='resultDescription' > ${description}</p>`;
          resultDiv.innerHTML += `<div class="textContainer_btn resultBtn">
                  <button>Book Now</button>
                </div>`;
        });
      } else {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "Destination not found.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}

function clearSearch() {
  const resultDiv = document.getElementById("result");
  document.getElementById("conditionDestination").value = "";
  resultDiv.style.display = "none";
}

btnSearch.addEventListener("click", searchLocation);
btnReset.addEventListener("click", clearSearch);
