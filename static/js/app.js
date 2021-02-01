//use d3.json() to fetch data from JSON file
d3.json("samples.json").then((incomingData) => {
    var data = incomingData;
    //call samples
    var samples = data.samples;
    //console.log(samples)
//create variable for otu_ids for individual 940
    var otu_ids=samples.map(function(sample){
        return sample.otu_ids[0]
    })
    //console.log(otu_ids)
//create variable for sample values for individual 940

    var sample_values =samples.map(function(sample){
        return sample.sample_values[0]
    })
    //console.log(sample_values)
 //create variable for otu lables for individual 940

   var otu_lables = samples.map(function(sample){
        return sample.otu_labels[0]
   })
    //console.log(otu_lables)
//use slice for first 10 values for ids, samples and labels for ind 940
    var top10_otu_ids=otu_ids.slice(0,10);
    var top10_sample_values=sample_values.slice(0,10);
    var top_10_otu_lables=otu_lables.slice(0,10);
    console.log(top10_otu_ids);
    console.log(top10_sample_values);
    console.log(top_10_otu_lables);


});