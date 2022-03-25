function heroVideo() {
    // Create the video tag.
    const HeroVideo = document.createElement("video");
    // Check if this video tag is supported. Feature detection!
    if (HeroVideo.canPlayType) {
        // Check for webm support.
        if (HeroVideo.canPlayType("video/webm")) {
            HeroVideo.src = "assets/video/mivideo.webm";
        }
        // Check for mp4 support.
        if (HeroVideo.canPlayType("video/mp4")) {
            HeroVideo.src = "assets/video/mivideo.mp4";
        }

        // Variables
        HeroVideo.autoplay = true;
        HeroVideo.muted = true;
        HeroVideo.loop = true;
        HeroVideo.id = "myVideo";
        
        hero.appendChild(HeroVideo);

    } else {

        var div = hero.createElement("div");
        div.innerHtml = "Backup message shown if the browser does not support the video tag.";
     
    }
}