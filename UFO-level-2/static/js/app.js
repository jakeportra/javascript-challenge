// from data.js
var tableData = data;

// Select button
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn")

// Clear form
resetButton.on("click", function () {
    this.form.reset(); 
    window.location.reload();
});

// Hide if no search results
var tableHead = d3.select("table");
tableHead.classed("toggle-off", true);

// Click handler

filterButton.on("click", function () {

    // import data
    results = JSON.parse(JSON.stringify( tableData ));

    // User input
    var datetimeData = d3.select("#datetime");
    dateValue = datetimeData.property("value");

    var cityData = d3.select("#city");
    cityValue = cityData.property("value").toLowerCase();

    var stateData = d3.select("#state");
    stateValue = stateData.property("value").toLowerCase();

    var countryData = d3.select("#country");
    countryValue = countryData.property("value").toLowerCase();

    var shapeData = d3.select("#shape");
    shapeValue = shapeData.property("value").toLowerCase();

    // Create filter from user input
    var filterList = [dateValue, cityValue, stateValue, countryValue, shapeValue];
    var attrList = ["datetime", "city", "state", "country", "shape"];

    for (i = 0; i < filterList.length; i++) {
        if (filterList[i]) {
            att = attrList[i];
            filter = filterList[i];
            results = results.filter(sighting => sighting[att] === filter);
        }
    }

    // Clear existing html in table
    var table = d3.select("tbody");
    table.html("");

    // Convert state and country to uppercase

    function convertUC(convertedData) {
        convertedData.forEach(function(sighting) {
            sighting.state = sighting.state.toUpperCase();
            sighting.country = sighting.country.toUpperCase();
        });
    }
    convertUC(results); // convert state and country fields of filtered results to uppercase

    // Convert city and shape data to title case from filtered results
    results.forEach(function(sighting) {
        // city
        var str = sighting.city.toLowerCase();
        str = str.split(" ");
        str = str.map(function(word) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
            return word;
        });
        var city = str.join(" ");
        sighting.city = city;

        // shape
        var str = sighting.shape.toLowerCase();
        str = str.split(" ");
        str = str.map(function(word) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
            return word;
        });
        var shape = str.join(" ");
        sighting.shape = shape;
    });

    console.log(results);

    if (results.length == 0) {
        return;
    }

    else if (results) {
        // Show item when search results
        tableHead.classed("toggle-on", true);
        // Print each result in results to table
        results.forEach((sighting) => {
            let row = table.append("tr");
            Object.entries(sighting).forEach(([key, value]) => {
                let cell = row.append("td");
                cell.text(value);
            });
        });
    }

});