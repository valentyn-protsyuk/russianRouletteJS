var game_data;
var current_state;
var audioElement = document.createElement('audio');
var stim = 0;
var dope = 0;
var turns = 0;


$.getJSON( "data/game.json", function( data ) {
        game_data = data;
        $('#game_title').html( game_data['states'][ data['start_state'] ]['title'] );
        next_state('loading'); 

});

function next_state( state) {
    //update current state
    console.log("Current State = " + current_state + " --> New State= " + state) 
    current_state = state
    
    
    //6 turns max
    /*

    if(turns === 6){
        current_state = finalTurn(current_state);
        turns = 0;
    }
     */

    //reset turns
    if (game_data['states'][ current_state ]['turns_reset'] != null){
        turns = 0;
    }

    //count turns
    if (game_data['states'][ current_state ]['turn_count'] != null){
        console.log('turn'+turns+':'+current_state);
        turns += 1;
    }

    //change btn labels
    if (game_data['states'][ current_state ]['change_label'] != null){
        btn_change(game_data['states'][ current_state ]['change_label']);
    }

    /*
    
    //stim change
    if (game_data['states'][ current_state ]['stim_change'] != null){
            console.log("+ stim " + game_data['states'][ current_state ]['stim_change'] ) 
            stim = stim + game_data['states'][ current_state ]['stim_change']
    }

    //dope change
    if (game_data['states'][ current_state ]['dope_change'] != null){
        console.log("+ dope " + game_data['states'][ current_state ]['dope_change'] ) 
        dope = dope + game_data['states'][ current_state ]['dope_change']
    }

    //totals
    if(game_data['states'][ current_state ]['print_totals'] != null){
        printTotal();
        stim = 0;
        dope = 0;
    }
    */

    //sound
    if (game_data['states'][ current_state ]['play_sound'] != null){
        audioElement.setAttribute('src', game_data['states'][ current_state ]['play_sound']);
        audioElement.play();
    }

    //if there is a title in player state display it
    if (game_data['states'][ current_state ]['text'] != null){
        $('#game_title').html( game_data['states'][ current_state ]['title'] );
    }
    
    //if there is text in player state display it
    if (game_data['states'][ current_state ]['text'] != null){
        $('#game_text').html( game_data['states'][ current_state ]['text'] );
    }
    
    //if there is gif in player state display it
    if (game_data['states'][ current_state ]['image_change'] != null){
            $("#game_img").html( game_data['states'][ current_state ]['image_change'] );
    }
    
    //display buttons if needed
    if (game_data['states'][ current_state ]['show_btns'] != null){
        btn_show(game_data['states'][ current_state ]['show_btns']);
    }
    //transition states
    else {
        btn_hide();

        //if there is no delay call new state
        if (game_data['states'][ current_state ]['delay'] == null){
            if ( typeof game_data['states'][current_state]['next_state'] == "string"){
                next_state(game_data['states'][current_state]['next_state'])
            }
            //random next state
            else{
                next_state(pick_a_winner(game_data['states'][current_state]['next_state'], turns));
            }
        }
        //if there is delay call timeout
        else{
            if (game_data['states'][ current_state ]['show_text'] != null){
                $('#game_title').html( game_data['states'][ current_state ]['show_text'])
            }
            setTimeout(function() {
                if ( typeof game_data['states'][current_state]['next_state'] == "string"){
                    next_state(game_data['states'][current_state]['next_state']);
                }
                //random next state
                else{
                    next_state(pick_a_winner(game_data['states'][current_state]['next_state'], turns));
                } 
            }, game_data['states'][ current_state ]['delay']);
        }
    }
}

//randomizer
function pick_a_winner( input_array, turn) {
    let randomInt = Math.floor(Math.random() * (input_array.length - turn) + turn);
    console.log("random: " + randomInt+ " State: " + input_array[randomInt]);
    return  input_array[randomInt];
 }
 
 //take input from the button and choose next state
 function key_input(what_key){
    for(i=0; i< game_data['states'][current_state]['next_state'].length; i++){
        if( what_key == game_data['states'][current_state]['next_state'][i]['key_input']) {
            //single next state
            if ( typeof game_data['states'][current_state]['next_state'][i]['state_name'] == "string"){
                next_state(game_data['states'][current_state]['next_state'][i]['state_name'])
            }
            //random next state
            else{
                next_state(pick_a_winner(game_data['states'][current_state]['next_state'][i]['state_name'], turns))
            }
        } 
    }

    console.log(what_key);
}


//button visibility functions
function btn_show(btn_num){
    btn_hide();
    const btns = ["a","b","c","d","e"];
    for(i = 0; i < btn_num; i++){
        $("#but_" + btns[i]).show();
    }
}

function btn_hide(){
    const btns = ["a","b","c","d","e"];
    for(i = 0; i < 5; i++){
        $("#but_" + btns[i]).hide();
    }
}

//button labels
function btn_change(btn_lbls){
    const btns = ["a","b","c","d","e"];
    for(i = 0; i < btn_lbls.length; i++){
        $("#but_" + btns[i]).html(btn_lbls[i]);
    }
}

/*

function finalTurn(who){
    console.log('-------------------------------> '+ who);
    if(who==='player_empty' || who==='player_death'){
        return 'player_death';
    }
    else if(who==='give_up'){
        return 'give_up';
    }
    else{
        return 'npc_death';
    }
}
*/


function printTotal(){
    console.log('----------------  Totals  ----------------')
    console.log('Stim: ' + stim);
    console.log('Dope: ' + dope);
}