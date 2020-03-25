// from data.js
var tableData = data;

// Make state and country abbreviations uppercase
tableData.forEach(function(sighting) {
    sighting.state = sighting.state.toUpperCase();
    sighting.country = sighting.country.toUpperCase();
  });

// Capitalize city and shape 
tableData.forEach(function(sighting) {
    // city
    var string = sighting.city.toLowerCase();
    string = string.split(" ");
    string = string.map(function(word) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
        return word;
    });
    var city = string.join(" ");
    sighting.city = city;

    // shape
    var string = sighting.shape.toLowerCase();
    string = string.split(" ");
    string = string.map(function(word) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
        return word;
    });
    var shape = string.join(" ");
    sighting.shape = shape;
});


// Select filter button
var filterButton = d3.select("#filter-btn");

// Click handler
filterButton.on("click", function () {

    // User input
    var dateTime = d3.select("#datetime");
    var dateValue = dateTime.property("value");

    var dateSet = tableData.filter(sighting => sighting.dateTime === dateValue);
    console.log(dateSet);

    // Clear existing html in table
    var table = d3.select("tbody");
    table.html("");

    // Print each result in dateSet to table
    dateSet.forEach((sighting) => {
        var row = table.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});