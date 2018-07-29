let start;
let wf;
const cities = ["Lviv", "Kyiv", "London", "New York"];
const temperatures = ["C", "F"];
const apiKey = "5140914bfb0847d1752cd225b5311a51";

function Form(name, content) {
	let newForm;
	let newSelect;
	let newOption;
	let valueOption;

	newSelect = document.createElement("select");
	if (name === "city") {
		newSelect.setAttribute("onclick", "loadData()");
	}

	for(let index in content) {
		newOption = document.createElement("option");
		if (index == 0 ) {
			newOption.setAttribute("selected", "selected");
		}
		newOption.setAttribute("value", content[index]);
		valueOption = document.createTextNode(content[index]);
		newOption.appendChild(valueOption);
		newSelect.appendChild(newOption);
	}

	newForm = document.createElement("form");

	newForm.appendChild(newSelect);
	document.getElementsByTagName("div")[1].appendChild(newForm);
}

function WeatherForecast() {
	console.log('weather forecast is showed');
	let formsBlock;
	let formCity;
	let formTemperature;
	let sliderBlock;

	formsBlock = document.createElement("div");
	formsBlock.setAttribute("id", "formsBlock");
	document.getElementsByTagName("div")[0].appendChild(formsBlock);

	sliderBlock = document.createElement("div");
	sliderBlock.setAttribute("id", "sliderBlock");
	document.getElementsByTagName("div")[0].appendChild(sliderBlock);

	formCity = new Form('city', cities);
	formTemperature = new Form('temperature', temperatures);

	sliderBlock.innerHTML = "Slider block"; // to do
};

function app() {
	start = document.createElement("div");
	document.body.appendChild(start);
	console.log('first div created');
	wf = new WeatherForecast();
};

function loadData() {
	alert("Data has loaded");
}
