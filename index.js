const myCanvas = { width: 600, height: 600};
const backgroundColor = [230,220,190];
// two arrays, each has three sounds in it
const numArrays= 2;
const numSoundsPerArray = 3;
const sounds1 = Array.from({ length: numSoundsPerArray });
const sounds2 = Array.from({ length: numSoundsPerArray });
// let's make an array of the two arrays so we can easily switch between them
const soundArrays = [sounds1, sounds2];

let looping = false;

// let's make a boolean variable to let us know when a sound is playing
let soundIsPlaying  = false;
//and a variable to store the actual sound playing, or the 
// representation of it so we can check if it's done playing yet.
let soundPlaying = null;

// we'll switch between 0 and 1 here, so we can pick which array to play from
let lastArrayPlayed = 1;

let button1, button2;

function preload(){
    ///load three sounds
    sounds1.forEach((sound, i) => {
        //sounds1[i] = loadSound(`sounds/${i}.mp3`)
        //let's use howler instead of the buggy p5.sound
        sounds1[i] = new Howl({ src : [`sounds/${i}.mp3`]})
    })
    //load three more sounds, notice that the number starts where the other one left off
    sounds2.forEach((sound, i) => {
        //sounds2[i] = loadSound(`sounds/${i + sounds1.length}.mp3`)
                //let's use howler instead of the buggy p5.sound
                sounds2[i] = new Howl({ src : [`sounds/${i + sounds1.length}.mp3`]})
    })
    button1 = createButton('click to start');
    button1.mousePressed(startRoutine)
    button2 = createButton('click to pause');
    button2.mousePressed(pauseRoutine)

}

function setup(){
    createCanvas(myCanvas.width, myCanvas.height);
    background(backgroundColor);
   
    // button1.position(myCanvas.width/2, myCanvas.height/2);
  
   
}



function draw(){
    
    background(backgroundColor);
    
    if(looping){
    
        if(!soundIsPlaying){
            soundPlaying = pickNewSound();
            playSound(soundPlaying)
            soundPlaying.on('end', function(){
               soundPlaying = null,
               soundIsPlaying = false;
              });
        }
    }


}

function startRoutine(){
    looping = true;
}

function pauseRoutine(){
    looping = false;
}


function pickNewSound(){
    // pick a sound here, this is where we need to set up our algorithm
    // to 'randomly' pick a sound 

    const randomArray = Math.floor(Math.random() * numArrays);
    const randomSoundFromArray = Math.floor(Math.random() * numSoundsPerArray)

   return soundArrays[randomArray][randomSoundFromArray];
    
}

function playSound(sound){
    sound.play();
    soundIsPlaying = true;
}

function checkPlayingSound(sound){
    console.log(sound);
    return sound.isPlaying()
}



