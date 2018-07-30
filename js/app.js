let start;
const cities = ["Lviv", "Kyiv", "London", "New York"];
const temperatures = ["C", "F"];
const apiKey = "5140914bfb0847d1752cd225b5311a51";
const units = ["metric", "imperial"];

function Form(arrCity, arrTemp) {
	let newForm;
	let newSelect;
	let newOption;
	let valueOption;
	let inputRange;
	let dataList;

	newSelect = document.createElement("select");
	newSelect.setAttribute("onchange", "loadData(this.value)");

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
	inputRange.setAttribute("onchange", "changeTemperature(this.value)");
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

function SliderForWeather() {
	let newWeatherSlider;
	let a;

	newWeatherSlider = document.createElement("div");
	newWeatherSlider.setAttribute("id", "weatherSliderBlock");
	a = document.createElement("a");
	a.setAttribute("class", "prev");
	a.setAttribute("onclick", "plusSlides(-1)");
	newWeatherSlider.appendChild(a);
	a = document.createElement("a");
	a.setAttribute("class", "next");
	a.setAttribute("onclick", "plusSlides(1)");
	newWeatherSlider.appendChild(a);


	document.getElementById("app").appendChild(newWeatherSlider);
}

function WeatherForecast() {
	let formsBlock;
	let sliderBlock;

	formsBlock = new Form(cities, temperatures);

	sliderBlock = new SliderForWeather();
};

function app() {
	let wf;

	start = document.createElement("section");
	start.setAttribute("id", "app");
	document.body.appendChild(start);
	wf = new WeatherForecast();
	loadData();
};

function loadData(city = cities[0]) {
	let xhttp = new XMLHttpRequest();
	let unit = units[document.getElementById("formSlider").value];

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Data has been loading!");
			//document.getElementById("weatherSliderBlock").innerHTML = "Data has been loading!";
			showWeatherSlider(this);
		} else {
			//document.getElementById("weatherSliderBlock").innerHTML = "It has been loading!!!";
		}
	};
	xhttp.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+"&units="+unit, true);
	xhttp.send();
}

function changeTemperature(typeTemper) {  // to do
	switch(Number(typeTemper)) {
		case 0: 
			console.log('0');
			break;
		case 1: 
			console.log('1');
			break;
	}
}

function showWeatherSlider(xhttp) {
	console.log(JSON.parse(xhttp.responseText));
	//document.getElementById("weatherSliderBlock").innerHTML = xhttp.responseText;
}

function plusSlides(n) {
	console.log("plusSlides is working!")
	showSlides(slideIndex += n);
}