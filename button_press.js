$(document).ready(function () {
  var $playPauseButton = $("#playPauseButton");
  var $progressBar = $(".progress-bar");
  var $handle = $(".handle");

  var animationDuration = 60000;

  var isPlaying = true;

  function togglePlayPause() {
    $("#playIcon, #pauseIcon").toggle();
    isPlaying = !isPlaying;
    if (isPlaying) {
      animateProgressBar();
    } else {
      $progressBar.stop();
    }
  }

  $playPauseButton.click(togglePlayPause);

  function animateProgressBar() {
    $progressBar.animate(
      { width: "100%" },
      {
        duration: animationDuration,
        easing: "linear",
        step: function (now, fx) {
          var handleLeft = (now / animationDuration) * 60000 + "%";
          $handle.css("left", handleLeft);
        },
        complete: function () {
          $progressBar.css("width", "0");
          $handle.css("left", "0");
          if (isPlaying) {
            animateProgressBar();
          }
        },
      }
    );
  }

  //Start the animation initially
  animateProgressBar();
});
