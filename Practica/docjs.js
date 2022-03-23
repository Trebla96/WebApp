// Create the video tag.
var video = document.createElement("video");
// Check if this video tag is supported. Feature detection!
if (video.canPlayType) {
    // Check for OGG support.
    //if (video.canPlayType("video/ogg")) {
    //    video.src = "video.ogg";
    //}
    // Check for mp4 support.

    if (video.canPlayType("video/mp4")) {
        video.src = "mivideo.mp4";
    }
    // Turn the controls on.
    //video.setAttribute("controls", "controls");

    video.autoplay = true
    video.playsInline = true
    video.muted = true
    video.loop = true
    
   
    video.load();

    document.body.appendChild(video);
   

} else {
    var div = document.createElement("div");
    div.innerHtml = "Backup message shown if the browser does not support the video tag.";
    document.body.appendChild(div);
}