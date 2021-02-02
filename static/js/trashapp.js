//use d3.json() to fetch data from JSON file
d3.json("samples.json").then((incomingData) => {
    var data = incomingData;
    //call samples
    var samples = data.samples;
    var sample_IDs=data.names;
    //console.log(samples)
    samples.forEach(function(sample){
        //call samples and slice for top 10/first 10
        var otu_ids= samples.map(function(sample){
            return sample.otu_ids
        });
        var sample_values= samples.map(function(sample){
            return sample.sample_values
        });
        var otu_lables=samples.map(function(sample){
            return sample.otu_lables
        });
        var top10_otu_ids=otu_ids.slice(0,10);  
        var top10_SValues=sample_values.slice(0,10);
        var top10_OtuLables=otu_lables.slice(0,10);


       
        d3.selectAll("body").on("change", dropdown)
        // //set up  dropdown functions
        function dropdown(){
            var CHART=d3.selectAll("#plot").node();
            var menu=d3.select("selDataset");
            var menu_variable=menu.node().value;
            var x=[];
            var y=[];
        };
    //bar chart
      var trace0= {
          x:top10_SValues,
          y:top10_otu_ids,
          type: "bar",
          mode: 'markers',
          text: top10_OtuLables
        };
      var data =[trace0];
      var layout ={
          title: "OTU samples",
          xaxis: {title:"OTU IDs"},
          yaxis: {title:"Sample Value"}
      };
      Plotly.newPlot("bar",data, layout);

    //bubble plot
      var layout_2 = {
          xaxis: {title: "OTU ID"},
          height: 600,
          width: 1000
      };
      Plotly.newPlot("bubble", trace0, layout_2)
    });

//populate Test Subject Id dropdown
    function init(){
        var dropdown=d3.select("#selDataset");
        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        });
    init();


});