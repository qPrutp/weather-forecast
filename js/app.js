let start;
let wf;
const cities = ["Lviv", "Kyiv", "London", "New York"];
const temperatures = ["C", "F"];
const apiKey = "5140914bfb0847d1752cd225b5311a51";

function Form(arrCity, arrTemp) {
	let newForm;
	let newSelect;
	let newOption;
	let valueOption;
	let inputRange;
	let dataList;

	newSelect = document.createElement("select");
	newSelect.setAttribute("onmouseup", "loadData(this.value)");

	for(let index in arrCity) {
		newOption = document.createElement("option");
		if (index == 0 ) {
			newOption.setAttribute("selected", "selected");
		}
		newOption.setAttribute("value", arrCity[index]);
		valueOption = document.createTextNode(arrCity[index]);
		newOption.appendChild(valueOption);
		newSelect.appendChild(newOption);
	}

	inputRange = document.createElement("input");
	inputRange.setAttribute("id", "formSlider");
	inputRange.setAttribute("type", "range");
	inputRange.setAttribute("list", "tempList");
	dataList = document.createElement("datalist");
	dataList.setAttribute("id", "tempList");
	for(let index in arrTemp) {
		newOption = document.createElement("option");
		if (index == 0) {
			newOption.setAttribute("selected", "selected");
		}
		newOption.setAttribute("value", index);
		dataList.appendChild(newOption);
	}

	inputRange.setAttribute("value", arrTemp.indexOf("C"));
	inputRange.setAttribute("step", "1");
	inputRange.setAttribute("min", arrTemp.indexOf("C"));
	inputRange.setAttribute("max", arrTemp.length - 1);

	newForm = document.createElement("form");
	newForm.appendChild(newSelect);
	newForm.appendChild(inputRange);
	newForm.appendChild(dataList);

	newSelect = document.createElement("div");
	newSelect.setAttribute("id", "formSliderContent");
	for(let index in arrTemp) {
		valueOption = document.createElement("sup");
		valueOption.innerHTML = "o";
		newSelect.appendChild(valueOption);
		valueOption = document.createTextNode(arrTemp[index]);
		newSelect.appendChild(valueOption);
	}
	newForm.appendChild(newSelect);

	document.getElementById("app").appendChild(newForm);
}

function WeatherForecast() {
	let formsBlock;
	let sliderBlock;

	formsBlock = new Form(cities, temperatures);

	sliderBlock = document.createElement("div");
	sliderBlock.setAttribute("id", "sliderBlock");
	document.getElementById("app").appendChild(sliderBlock);

	sliderBlock.innerHTML = "Slider block"; // to do
};

function app() {
	start = document.createElement("section");
	start.setAttribute("id", "app");
	document.body.appendChild(start);
	wf = new WeatherForecast();
};

function loadData(city) {
	console.log("Data about "+city+" has loaded");
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("sliderBlock").innerHTML = "Data has been loading!";
			showWeatherSlider(this);
		} else {
			document.getElementById("sliderBlock").innerHTML = "It has been loading!!!";
		}
	};
	xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey+"&cnt=3", true);
	xhttp.send();
}

function showWeatherSlider(xhttp) {
	console.log(JSON.parse(xhttp.responseText));
	document.getElementById("sliderBlock").innerHTML = xhttp.responseText;
}
