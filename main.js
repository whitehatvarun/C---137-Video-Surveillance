status = "";
video = "";
object = [];

function preload()
{
  video = createVideo("video.mp4");  
}

function setup()
{
    canvas = createCanvas(480 , 380);
    canvas.center();
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw()
{
    image(video , 0 , 0 , 480 , 380);

    if(status != "")
    {
        objectDetector.detect(video , gotResult);
        for(i = 0; i < object.length;  i++)
        {
        
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are " + object.length;
        

        fill("#FF0000");     
        percent = floor(object[i].confidence * 100);  
        text(object[i].label + "" + percent + "%" , object[i].x + 15 , object[i].y + 15 );
        noFill();
        stroke("#FF0000");        
        rect(object[i].x , object[i].y , object[i].width , object[i].height);

        }


    }
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function stop()
{
    video.stop();
}

function pause()
{
    video.pause();
}

function gotResult(error , results)
{
    if(error)
    {
        console.log(error);
    }

    else
    {
      console.log(results);
      object = results;
    }
}