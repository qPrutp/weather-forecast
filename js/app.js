let start;
let curent = 3;
const cities = ["Lviv", "Kyiv", "London", "New York", "Vinnytsia"];
const temperatures = ["C", "F"];
const apiKey = "5140914bfb0847d1752cd225b5311a51";
const units = ["metric", "imperial"];
const imgWay = "../weatherForecast/img/";

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

function SliderForWeather(n) {
	let newWeatherSlider;
	let a, b;
	let conten;
	let elementForSlider;

	newWeatherSlider = document.createElement("div");
	newWeatherSlider.setAttribute("id", "weatherSliderBlock");
	a = document.createElement("a");
	a.setAttribute("class", "prev");
	a.setAttribute("onclick", "plusSlides(-1)");
	conten = document.createTextNode("❮");
	a.appendChild(conten);
	newWeatherSlider.appendChild(a);
	a = document.createElement("a");
	a.setAttribute("class", "next");
	a.setAttribute("onclick", "plusSlides(1)");
	conten = document.createTextNode("❯");
	a.appendChild(conten);
	newWeatherSlider.appendChild(a);

	for (let i = 0; i < 5; i++) {
		elementForSlider = document.createElement("div");
		elementForSlider.setAttribute("class", "element-slider");
		if ((n == 3) && (i > 2)) {
			elementForSlider.style.display = "none";
		}

		newWeatherSlider.appendChild(elementForSlider);
	}

	document.getElementById("app").appendChild(newWeatherSlider);
}

function WeatherForecast() {
	let formsBlock;
	let sliderBlock;

	formsBlock = new Form(cities, temperatures);

	sliderBlock = new SliderForWeather(3);
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
			let content = JSON.parse(xhttp.responseText);
			let blocks = document.getElementsByClassName("element-slider");
			let tables = document.getElementsByTagName("table");

			for (let i = 0; i < blocks.length; i++) {
				if (tables[i]) {
					blocks[i].removeChild(blocks[i].firstChild);
				}
			}

			for (let i = 0; i < 5; i++) {
				let day = [];	
				let tempDate = new Date();
				tempDate.setDate(tempDate.getDate() + i);
				tempDate = tempDate.toISOString().slice(0,10);
				for (let index in content.list){
					if (content.list[index].dt_txt.substr(0, 10) == tempDate) {
						day.push(content.list[index]);
					}
				}
				addContent(day, i);
				
			}
		} else {
			// document.getElementById("weatherSliderBlock").innerHTML = "It has been loading!!!";
		}
	};
	xhttp.open("GET", "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+"&units="+unit, true);
	xhttp.send();
}

function changeTemperature(typeTemper) {
	let spanNughts;
	let spatDays;
	let temperature;

	spanNughts = document.getElementsByClassName("night");
	spatDays = document.getElementsByClassName("day");

	switch(Number(typeTemper)) {
		case 0: 
			for(let i = 0; i < spanNughts.length; i++) {
				temperature = 0;
				temperature = spanNughts[i].innerHTML.substring(0,spanNughts[i].innerHTML.indexOf("<"));
				spanNughts[i].innerHTML = ((temperature - 32) / 1.8).toFixed(2)
										+ spanNughts[i].innerHTML.substring(spanNughts[i].innerHTML.indexOf("<"), spatDays[i].innerHTML.indexOf("F"))
										+ "C";
			}
			for(let i = 0; i < spatDays.length; i++) {
				temperature = 0;
				temperature = spatDays[i].innerHTML.substring(0,spatDays[i].innerHTML.indexOf("<"));
				spatDays[i].innerHTML = ((temperature - 32) / 1.8).toFixed(2)
										+ spatDays[i].innerHTML.substring(spatDays[i].innerHTML.indexOf("<"), spatDays[i].innerHTML.indexOf("F"))
										+ "C";
			}
			break;
		case 1:
			for(let i = 0; i < spanNughts.length; i++) {
				temperature = 0;
				temperature = spanNughts[i].innerHTML.substring(0,spanNughts[i].innerHTML.indexOf("<"));
				spanNughts[i].innerHTML = (temperature * 1.8 + 32).toFixed(2)
										+ spanNughts[i].innerHTML.substring(spanNughts[i].innerHTML.indexOf("<"), spatDays[i].innerHTML.indexOf("C"))
										+ "F";
			}
			for(let i = 0; i < spatDays.length; i++) {
				temperature = 0;
				temperature = spatDays[i].innerHTML.substring(0,spatDays[i].innerHTML.indexOf("<"));
				spatDays[i].innerHTML = (temperature * 1.8 + 32).toFixed(2)
										+ spatDays[i].innerHTML.substring(spatDays[i].innerHTML.indexOf("<"), spatDays[i].innerHTML.indexOf("C"))
										+ "F";
			}
			break;
	}
}

function addContent(day, i) {
	let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let tempDate = new Date();
	tempDate.setDate(tempDate.getDate() + i);
	let blocks = document.getElementsByClassName("element-slider");
	let table;
	let tr;
	let td;
	let img;
	let tempText;
	let iTeg;
	let p;
	let span;
	let sup;

	table = document.createElement("table");
	tr = document.createElement("tr");
	td = document.createElement("td");
	tempText = document.createTextNode(months[tempDate.getMonth()]+" "+tempDate.getDate()+" "+week[tempDate.getDay()]);
	td.appendChild(tempText);
	tr.appendChild(td);
	td = document.createElement("td");
	img = document.createElement("img");
	img.setAttribute("alt", "forecast");
	img.setAttribute("src", imgWay+day[0].weather[0].icon.substr(0, 2)+"d.png");
	td.appendChild(img);
	tr.appendChild(td);
	table.appendChild(tr);

	if (day.length < 7) {
		tr = document.createElement("tr");
		td = document.createElement("td");
		tr.appendChild(td);
		td = document.createElement("td");
		tr.appendChild(td);
		table.appendChild(tr);
	} if (day.length < 6) {
		tr = document.createElement("tr");
		td = document.createElement("td");
		tr.appendChild(td);
		td = document.createElement("td");
		tr.appendChild(td);
		table.appendChild(tr);
	} if (day.length < 4) {
		tr = document.createElement("tr");
		td = document.createElement("td");
		tr.appendChild(td);
		td = document.createElement("td");
		tr.appendChild(td);
		table.appendChild(tr);
	}

	for (let index = 0; index < day.length; index++) {
		if ((day[index].dt_txt.slice(11) == "03:00:00") ||
			(day[index].dt_txt.slice(11) == "06:00:00") ||
			(day[index].dt_txt.slice(11) == "12:00:00") ||
			(day[index].dt_txt.slice(11) == "21:00:00")) {
			tr = document.createElement("tr");
			td = document.createElement("td");
			img = document.createElement("img");
			img.setAttribute("alt", "forecast");
			img.setAttribute("src", imgWay+day[index].weather[0].icon+".png");
			td.appendChild(img);
			tr.appendChild(td);

			td = document.createElement("td");
			p = document.createElement("p");
			span = document.createElement("span");
			if (day[index].dt_txt.slice(11) == "03:00:00") {
				span.setAttribute("class", "night");
			} else {
				span.setAttribute("class", "day");
			}
			tempText = document.createTextNode(day[index].main.temp);+sup+(document.getElementById("formSlider").value == 0 ? "C" : "F")
			span.appendChild(tempText);
			sup = document.createElement("sup");
			sup.innerHTML = " o";
			span.appendChild(sup);
			tempText = document.createTextNode(document.getElementById("formSlider").value == 0 ? "C" : "F");
			span.appendChild(tempText);
			p.appendChild(span);
			tempText = document.createTextNode(" "+day[index].wind.speed+" m/s");
			p.appendChild(tempText);
			td.appendChild(p);
			iTeg = document.createElement("i");
			tempText = document.createTextNode(day[index].weather[0].description);
			iTeg.appendChild(tempText);
			td.appendChild(iTeg);
			tr.appendChild(td);

			table.appendChild(tr);
		}
	}

	blocks[i].appendChild(table);
}

function plusSlides(n) {
	showSliderBlock(curent += n);
}

function showSliderBlock(n) {
	console.log('showSliderBlock: '+n);
	let blocks = document.getElementsByClassName("element-slider");
	if (n > blocks.length) {curent = 3;}
	if (n < 3) {curent = 5;}
	if(curent == 3) {
		blocks[0].style.display = "inline-block";
		blocks[1].style.display = "inline-block";
		blocks[2].style.display = "inline-block";
		blocks[3].style.display = "none";
		blocks[4].style.display = "none";
	}
	if(curent == 4) {
		blocks[0].style.display = "none";
		blocks[1].style.display = "inline-block";
		blocks[2].style.display = "inline-block";
		blocks[3].style.display = "inline-block";
		blocks[4].style.display = "none";
	}
	if(curent == 5) {
		blocks[0].style.display = "none";
		blocks[1].style.display = "none";
		blocks[2].style.display = "inline-block";
		blocks[3].style.display = "inline-block";
		blocks[4].style.display = "inline-block";
	}
}
