
const sock = io();
let bro_array = []
let player_nbr=-1

let current_players=[]
let this_player=null
sock.on("current_players", players=>{
    current_players=players
    for(const player in players){
        show_bro(players[player])
    }

})
sock.on("player_attrib", player =>{
    this_player=player
})
sock.on("new_player", new_player=>{
    current_players[new_player.playerId]=new_player
    show_bro(new_player)
})

sock.on("new_coord", player_moved=>{
    current_players[player_moved.playerId]=player_moved
    update_bro(player_moved)
})
sock.on("deco", player=>{
    d3.select("#bro_"+player.nbr).remove()
    current_players[player.playerId]=null
})


function show_bro(player) {
    d3.select("#main_svg")
        .append("text")
        .attr("x", player.x)
        .attr("y", player.y)
        .text(player.nbr)
        .attr("font-size", 40)
        .attr("fill", "green")
        .attr("id", "bro_"+player.nbr)


}
function update_bro(player){
    d3.select("#bro_"+player.nbr)
        .transition()
        .attr("x", player.x)
        .attr("y", player.y)

}
function get_param(){
        return [ this_player.x, this_player.y, this_player.width, this_player.height, this_player.speed]
}

function move(x_in, y_in) {
        let new_x = this_player.x+ this_player.speed*x_in
        let new_y = this_player.y- this_player.speed*y_in
        d3.select("#bro_"+this_player.nbr)
            .transition()
            .attr("x", new_x)
            .attr("y", new_y)
            .duration(0)

        this_player.x=new_x
        this_player.y=new_y
    sock.emit("new_coord", this_player)
}

