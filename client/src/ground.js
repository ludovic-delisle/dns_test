function create_ground(){
    let ground=d3.select("#main_svg")
        .append("rect")
        .attr("x", 0)
        .attr("y", window.innerHeight/2)
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight/2)
        .attr("fill", "white")

}