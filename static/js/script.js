// Define function to map a table's columns and index positions

function getColumnNameMap(tableId) {
    var table = document.getElementById(tableId);
    const headerRow = table.rows[0];
    const columnNameMap = {};
    for (let i = 0; i < headerRow.cells.length; i++) {
      const columnName = headerRow.cells[i].textContent.trim();
      columnNameMap[columnName] = i;
    }
    return columnNameMap;
  }

// Run function above to generate the header map

const headerMap = getColumnNameMap("covid")

// Define function to populate select elements with unique values from the table column

function populateSelectWithUniqueValues(columnName, selectId) {
    
    // If the column was not found, return
    const columnIndex = headerMap[columnName]
    if (columnIndex === -1) {
        return;
    }

    // Get all rows in the table
    var table = document.getElementById("covid");
    var rows = table.getElementsByTagName("tr");

    // Loop through rows and add unique values to the set
    var uniqueValues = new Set();
    for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
        var cells = rows[i].getElementsByTagName("td");
        if (cells.length > columnIndex) {
            uniqueValues.add(cells[columnIndex].textContent);
        }
    }
    var uniqueValuesArray = Array.from(uniqueValues).sort();
    

    if (selectId == "age") {
        const specialAges = ["All Ages", "Under 1 year", "85 years and over"];
        uniqueValuesArray = uniqueValuesArray.filter(value => !specialAges.includes(value));
        uniqueValuesArray.sort((a, b) => {
            const age1 = parseInt(a.match(/\d+-\d+|\d+/)[0]);
            const age2 = parseInt(b.match(/\d+-\d+|\d+/)[0]);
            return age1 - age2;
        });
        uniqueValuesArray.unshift("Under 1 year")
        uniqueValuesArray.unshift("All Ages")
        uniqueValuesArray.push("85 years and over")
    }

    // Get the select element
    var select = document.getElementById(selectId);

    // Add an option for selecting all
    var allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All";
    select.appendChild(allOption);

    // Add unique values as options

    let exceptions = ["All Sexes", "All Ages"]
    uniqueValuesArray.forEach(function(value) {
        var found = false;
        for (var i = 0; i < select.children.length; i++) {
          if (select.children[i].value === value) {
            found = true;
            break;
          }
        }
        if (!found && !exceptions.includes(value)) {
          var option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          select.appendChild(option);
        }
    });

    return uniqueValuesArray

}

// Run function above to populate filter dropdowns with unique values

const uniqueStateValues = populateSelectWithUniqueValues("State", "state");
const uniqueSexValues = populateSelectWithUniqueValues("Sex", "sex");
const uniqueAgeValues = populateSelectWithUniqueValues("Age Group", "age");


// Define function to filter table rows based on selected filter values

function filterTable(filters) {

    // Fetch table rows
    var table = document.getElementById("covid");
    var rows = table.getElementsByTagName("tr");

    // Fetch filter variables
    var stateX = filters["State"]
    if (stateX == "All") {
        delete filters["State"]
    }
    var sexX = filters["Sex"]
    if (sexX == "All") {
        delete filters["Sex"]
    }
    var ageGroupX = filters["Age Group"]
    if (ageGroupX == "All") {
        filters["Age Group"] = "All Ages"
    }
    var deathType = filters.death_type
    if (deathType == "") {
        deathType = "?"
    }
    delete filters.death_type
    var shadingType = filters.shading_type
    if (shadingType == "") {
        shadingType = "no"
    }
    delete filters.shading_type

    // Loop through rows and hide/show based on filter values
    var visibleRows = []
    console.log(filters)
    for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
        var cells = rows[i].getElementsByTagName("td");
        var showRow = true;

        for (var key in filters) {
            var filterValue = filters[key];
            if (filterValue && cells[headerMap[key]].textContent !== filterValue) {
                showRow = false;
                break;
            }
        }

        if (showRow) {
            rows[i].style.display = "";
            visibleRows.push(rows[i])
        } else {
            rows[i].style.display = "none";
        }
    }

    var allMap = {}
    var maleMap = {}
    var femaleMap = {}
    var popMap = {}
    const idx1 = headerMap["State"]
    const idx2 = headerMap["Sex"]
    const idx3 = headerMap[deathType]
    const idx4 = headerMap["Population (2023)"]
    visibleRows.forEach(row => {
        state = row.cells[idx1].textContent
        sex = row.cells[idx2].textContent
        num = parseInt(row.cells[idx3].textContent)
        if (sex == "All Sexes") {
            allMap[state] = num
        } else if (sex == "Male") {
            maleMap[state] = num
        } else if (sex == "Female") {
            femaleMap[state] = num
        } else {
            console.log(`Error: Unrecognized sex ${sex}`)
        }
        population = parseInt(row.cells[idx4].textContent)
        popMap[state] = population
    })
    let maleCounter = 0
    let femaleCounter = 0
    let sumCounter = 0
    let allCounter = 0
    let maleCounts = []
    let femaleCounts = []
    let pctMales = []
    let allCounts = []
    let perCaps = []
    uniqueStateValues.forEach(state => {
        maleCount = maleMap[state] ?? 0
        maleCounts.push(maleCount)
        maleCounter = maleCounter + maleCount
        femaleCount = femaleMap[state] ?? 0
        femaleCounts.push(femaleCount)
        femaleCounter = femaleCounter + femaleCount
        sumCount = maleCount + femaleCount
        sumCounter = sumCounter + sumCount
        allCount = allMap[state] ?? sumCount
        allCounts.push(allCount)
        allCounter = allCounter + allCount
        popCount = popMap[state]
        perCap = Math.round(allCount / popCount * 100 * 10000) / 10000
        perCaps.push(perCap)
        if (allCount === 0) {
            pctMale = 50;
            pctFemale = 50;
        } else if (sumCount === 0) {
            pctMale = 50;
            pctFemale = 50;
        } else {
            pctMale = Math.round(maleCount / allCount * 100 * 10) / 10;
            pctFemale = Math.round(femaleCount / allCount * 100 * 10) / 10;
        }
        pctMales.push(pctMale)
    })
    if (allCounter === 0) {
        pctMale = 50;
        pctFemale = 50;
    } else if (sumCounter === 0) {
        pctMale = 50;
        pctFemale = 50;
    } else {
        pctMale = Math.round(maleCounter / allCounter * 100 * 10) / 10;
        pctFemale = Math.round(femaleCounter / allCounter * 100 * 10) / 10;
    }

    // Construct map data based on chosen color type
    
    let mapData = {}
    if (shadingType == "Male/Female %") {
        mapData = {
            'z': [pctMales],
            'zmin': 0,
            'zmax': 100,
            'colorscale': [[
                [0, 'rgb(255, 105, 180)'],    // Hot pink at 0
                [0.45, 'rgb(255, 182, 193)'], // Light pink at 45
                [0.55, 'rgb(173, 216, 230)'], // Baby blue at 55
                [1, 'rgb(0, 0, 255)'],        // Blue at 100
            ]],
            'colorbar.title': '% Male'
        };
    } else if (shadingType == "Total Numbers") {
        mapData = {
            'z': [allCounts],
            'zmin': 0,
            'zmax': Math.max(...allCounts),
            'colorscale': [[
                [0, 'rgb(128, 128, 128)'],    // Gray at 0
                [0.33, 'rgb(255, 204, 204)'], // Light red at 33
                [0.66, 'rgb(255, 0, 0)'],     // Red at 66
                [1, 'rgb(139, 0, 0)']         // Dark red at 100
            ]],
            'colorbar.title': '# Deaths'
        }
    } else if (shadingType == "Per Capita %") {
        mapData = {
            'z': [perCaps],
            'zmin': 0,
            'zmax': Math.max(...perCaps),
            'colorscale': [[
                [0, 'rgb(128, 128, 128)'],    // Gray at 0
                [0.33, 'rgb(255, 204, 204)'], // Light red at 33
                [0.66, 'rgb(255, 0, 0)'],     // Red at 66
                [1, 'rgb(139, 0, 0)']         // Dark red at 100
            ]],
            'colorbar.title': 'Per Capita %'
        }
    } else {
        mapData = {}
    }

    // Update map

    const mapLayout = {
        title: `${deathType} map for ${stateX} state, ${sexX} sex, ${ageGroupX} age group, ${shadingType} shading`,
    };

    Plotly.restyle('choropleth', mapData);
    Plotly.relayout('choropleth', mapLayout);

    // Sort bar chart

    let combinedData = uniqueStateAbbreviations.map((state, index) => ({
        state: state,
        maleCount: maleCounts[index],
        femaleCount: femaleCounts[index],
        totalCount: maleCounts[index] + femaleCounts[index]
    }));

    combinedData.sort((a, b) => b.totalCount - a.totalCount);
    // uniqueStateAbbreviations = combinedData.map(item => item.state);
    // maleCounts = combinedData.map(item => item.maleCount);
    // femaleCounts = combinedData.map(item => item.femaleCount);

    // Update bar

    var barData = {
        'x': [uniqueStateAbbreviations, uniqueStateAbbreviations],
        'y': [maleCounts, femaleCounts]
    };

    const barLayout = {
        title: `${deathType} bar chart for ${stateX} state, ${sexX} sex, ${ageGroupX} age group, Male/Female stacked`,
    };
    
    Plotly.update('bar', barData, barLayout);

    // Update pie

    var pieData = {
        'values': [[pctMale, pctFemale]],
    };

    var pieLayout = {
        title: `Pie chart for ${stateX} state`,
    };
    
    Plotly.update('pie', pieData, pieLayout);

    return table
}

// Add event listeners to filter dropdowns

var filterMapping = {
    "state": "State",
    "sex": "Sex",
    "age": "Age Group",
    "death_type": "death_type",
    "shading_type": "shading_type"
};
var filterValues = {};
Object.keys(filterMapping).forEach(function(filterId) {
    document.getElementById(filterId).addEventListener("change", function() {
        filterValues = {};
        Object.keys(filterMapping).forEach(function(id) {
            filterValues[filterMapping[id]] = document.getElementById(id).value;
        });
        filterTable(filterValues);
    });
});

// Create state to state abbreviation mapping

const states = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "District of Columbia": "DC",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Puerto Rico": "PR",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
  };
let uniqueStateAbbreviations = uniqueStateValues.map(state => states[state] ?? null);

// Construct map chart
  
const mapData = [
    {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: uniqueStateAbbreviations,
        text: uniqueStateValues,
    }
];

const maplayout = {
    title: `Death map for US`,
    geo: {
        scope: 'usa',
    }
};

Plotly.newPlot('choropleth', mapData, maplayout);

// Construct stacked bar chart

var barData = [
    {
        x: uniqueStateAbbreviations,
        y: [],
        name: 'Male',
        type: 'bar',
        marker: {
            color: 'rgb(173, 216, 230)' // Baby blue
        }
    },
    {
        x: uniqueStateAbbreviations,
        y: [],
        name: 'Female',
        type: 'bar',
        marker: {
            color: 'rgb(255, 182, 193)' // Light pink
        }
    }
];

var barLayout = {
    title: `Bar Chart for US`,
    barmode: 'stack'
};

Plotly.newPlot('bar', barData, barLayout);

// Construct pie chart

var pieData = [
    {
        values: [50, 50],
        labels: ['Male', 'Female'],
        type: 'pie',
        marker: {
            colors: ['rgb(173, 216, 230)','rgb(255, 182, 193)']
        },
        hoverinfo: 'label+percent',
    }
];

var pieLayout = {
    title: `Pie chart for US State`,
};

Plotly.newPlot('pie', pieData, pieLayout);

// Run on initial page load

const filtersX = {
    "death_type": "COVID-19 Deaths",
    "shading_type": "Male/Female %",
    "State": "All",
    "Sex": "All",
    "Age Group": "All"
}
filterTable(filtersX)

// Create button to export table rows as CSV

class TableCSVExporter {
    constructor(table, includeHeaders = true) {
        this.table = table;
        this.rows = Array.from(table.querySelectorAll("tr")).filter(row => row.style.display !== "none");
        if (!includeHeaders && this.rows[0].querySelectorAll("th").length) {
            this.rows.shift();
        }
    }

    convertToCSV() {
        const lines = [];
        const numCols = this._findLongestRowLength();
        for (const row of this.rows) {
            let line = "";
            for (let i = 0; i < numCols; i++) {
                if (row.children[i] !== undefined) {
                    line += TableCSVExporter.parseCell(row.children[i]);
                }
                line += (i !== (numCols - 1)) ? "," : "";
            }
            lines.push(line);
        }
        return lines.join("\n");
    }

    _findLongestRowLength() {
        return this.rows.reduce((l, row) => row.childElementCount > l ? row.childElementCount : l, 0);
    }

    static parseCell(tableCell) {
        let parsedValue = tableCell.textContent;
        parsedValue = parsedValue.replace(/"/g, `""`);
        parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;
        return parsedValue;
    }
}

const btnExportToCsv = document.getElementById("btnExportToCsv");
btnExportToCsv.addEventListener("click", () => {
    let table = document.getElementById("covid");
    const exporter = new TableCSVExporter(table);
    const csvOutput = exporter.convertToCSV();
    const csvBlob = new Blob([csvOutput], { type: "text/csv" });
    const blobUrl = URL.createObjectURL(csvBlob);
    const anchorElement = document.createElement("a");
    anchorElement.href = blobUrl;
    anchorElement.download = "table-export.csv";
    anchorElement.click();
    setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
    }, 500);
});