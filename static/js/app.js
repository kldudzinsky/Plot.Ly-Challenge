//use d3.json() to fetch data from JSON file
var data={};
var panelDemoInfo = d3.select("#sample-metadata");
var inputSelector = d3.select("#selDataset");

d3.json("samples.json").then((incomingData) => {   
    data = incomingData;
    //call samples
    var names = data.names;
    // Create the Test Subject ID No. Selector
        names.forEach(element => {
            inputSelector.append("option")
            .text(element)
            .property("value", element);
         });
    var idNum=names[0];
    populateDemoInfo(idNum);
    drawBarPlot(idNum);
    drawBubbleChart(idNum);
    drawGaugeChart(idNum);
});
//demo
function populateDemoInfo(idNum) {
    // Log a change
    console.log("Pop: " + idNum);

    // Just grab the one ID we want
    var metadataFilter = data.metadata.filter(item => item["id"] == idNum);
    console.log(`metaFilter length: ${metadataFilter.length}`);

    // Clear out the data first
    panelDemoInfo.html("");

    // Fill it back in
    Object.entries(metadataFilter[0]).forEach(([key, value]) => panelDemoInfo.append("h6").text(`${key}: ${value}`) );
};
// Object Compare Function
//Compares 2 objects
function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }
        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
};
function optionChanged(idNum) {
    // Update the Demographic Info Panel
    populateDemoInfo(idNum);

    //Draw the Bar Plot
     drawBarPlot(idNum);
    
    // // Draw the Bubble Chart
    drawBubbleChart(idNum);

    // // Draw the Gauge Chart
    drawGaugeChart(idNum);
};
function drawBarPlot(idNum) {
    // Log a change
    console.log("Bar: " + idNum);

    // Just grab the one ID we want
    var samplesFilter = data["samples"].filter(item => item["id"] == idNum);
    var sample_values = samplesFilter[0].sample_values;
    var otu_ids = samplesFilter[0].otu_ids;
    var otu_labels = samplesFilter[0].otu_labels;
    //create list for values, id and labels
    var combinedList = [];
    for (var i=0; i < sample_values.length; i++) {
        var otu_id = otu_ids[i];
        var otu_text = "OTU " + otu_id.toString();
        var combinedObject = {"sample_values": sample_values[i], "otu_ids": otu_text, "otu_labels": otu_labels[i]};
        combinedList.push(combinedObject);
    };
        //sort and slice
    var sortedList = combinedList.sort(compareValues("sample_values", "desc"));
    var slicedList = sortedList.slice(0, 10);
    //reverse so we get top 10
    var sample_values_list = slicedList.map(item => item.sample_values).reverse();
    var otu_ids_list = slicedList.map(item => item.otu_ids).reverse();
    var otu_labels_list = slicedList.map(item => item.otu_labels).reverse();
    //create trace anddefine data
    var trace = {
        type: "bar",
        y: otu_ids_list,
        x: sample_values_list,
        text: otu_labels_list,
        orientation: 'h'
    };
    var traceData = [trace];
    // Define the layout
    var layout = {
        title: "Top 10 OTUs Found",
        yaxis: { title: "OTU Labels" },
        xaxis: { title: "Values"}
    };
    //plot
    Plotly.newPlot("bar", traceData, layout);
};
//create function for bubble chart
function drawBubbleChart(idNum){
    // Log a change
    console.log("bubble: " + idNum);
    // Just grab the one ID we want
    var samplesFilter = data["samples"].filter(item => item["id"] == idNum);
    var sample_values = samplesFilter[0].sample_values;
    var otu_ids = samplesFilter[0].otu_ids;
    var otu_labels = samplesFilter[0].otu_labels;
    
    //create trace and define data
    var trace_bubble = {
        type: 'bubble', 
        mode: 'markers',
        x: otu_ids,
        y: sample_values,
        marker: {color: samplesFilter[0].otu_ids,
            size: samplesFilter[0].sample_values,
            colorscale: "Earth"},
        text: otu_labels,
    };

    var traceData = [trace_bubble];
    // Define the layout
    var layout_bubble = {
        title: "Top 10 OTUs Found",
        showlegend: false,
        xaxis: {title: "OTU IDs"},
        yaxis: {title: "Sample Values"},
        height: 600,
        width: 1500
    };
    Plotly.newPlot("bubble", traceData, layout_bubble);
};

//gauge: weekly washing frequency per individual
function drawGaugeChart(idNum) {
    console.log( "gauge:" +idNum);
    //grab Ids we want 
    var metadata = data["metadata"].filter(item => item["id"]==idNum);
    var wash_freq=metadata[0].wfreq;
    var metadata_id=metadata[0].id;
    //trace
    //need to make a triangle meter point
    //grab filter data 
    //level for freq data
    //create triangle : indicator of the level for wfreq
    
    var trace_gauge= [
        {
            value: wash_freq,
            title:{text:"Belly Button Washing Frequency"},
            type: "indicator",
            mode: "gauge+number+delta",
            delta:{reference: wash_freq},
         gauge:{
             axis:{range:[null, 9]},
             bar: {color: "darkblue"},
             bgcolor: "white",
             steps: [
                 {range: [0,4.5], color: "cyan"},
                {range: [4.5, 9], color:"royalblue"}
             ]}
        }];

    var gauge_layout={
        width: 600,
        height: 600,
        margin: {t:0, b:0}
    };
    var gauge_data =trace_gauge;
   Plotly.newPlot("gauge",gauge_data, gauge_layout);
};