// on page load...
export default () => {
    return;
moveProgressBar();
}

// SIGNATURE PROGRESS
function moveProgressBar() {
    var getPercent = 1;
    var getProgressWrapWidth = $('.progress-wrap').width();
    var progressTotal = getPercent * getProgressWrapWidth;
    var animationLength = 2500;

    // on page load, animate percentage bar to data percentage length
    // .stop() used to prevent animation queueing
    $('.progress-bar').stop().animate({
        left: progressTotal
    }, animationLength);
}
