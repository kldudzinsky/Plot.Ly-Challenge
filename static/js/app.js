//use d3.json() to fetch data from JSON file
d3.json("samples.json").then((incomingData) => {
    var data = incomingData;
    //call samples
    var samples = data.samples;
    //console.log(samples)

//use for each to go through each sample.id and pull
//top 10 otu_ids, sample_values and otu_lables/
//then put into empty bar chart 
    samples.forEach(function(sample){
        d3.selectAll("body").on("change", dropdown)
        // //set up  dropdown functions
        // function dropdown(){
        //     var CHART=d3.selectAll("#plot").node();
        //     var menu=d3.select("selDataset");
        //     var menu_variable=menu.node().value;
        //     var x=[];
        //     var y=[];
        };
        var otu_ids= samples.map(function(sample){
            return sample.otu_ids
        });
        var slice_otu_ids=otu_ids.slice(0,10);  
       
        console.log(slice_otu_ids);
    //   var trace0= {
    //       x:[sample.otu_id.slice(0,10)],
    //       y:[sample.sample_values.slice(0,10)],
    //       type: "bar",
    //       mode: 'markers',
    //       text: sample.otu_labels.slide(0,10)
    //   };
    //   var data =[trace0];
    //   var layout ={
    //       title: "OTU samples",
    //       xaxis: {title:"OTU IDs"},
    //       yaxis: {title:"Sample Value"}
    //   };
    //   Plotly.newPlot("plot",data, layout);

    });
    

 

});