/*jslint browser:true */
/*global $: false, spel: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
spel.show = {
    angryquiz: function () { // First page
        "use strict";
        $("#playStart").show();
        $("#mainContainer").hide();
        $("#playRestart").hide();
        $("#firstpagesound")[0].play();
        $("#click1").hover(function () {
            $("#pagehover")[0].play();
        });
        $("#click1").click(function () {
            spel.show.play(); // Main game.
        });
    },
    quizrestart: function () { // Restart function
        "use strict";
        $("#firstpagesound")[0].pause();
        $("#lastpagesound")[0].play();
        $("#click2").hover(function () {
            $("#pagehover")[0].play();
        });
        $("#click2").click(function () {
            $("#lastpagesound")[0].pause();
            $("#playRestart").fadeOut(500);
            $("#playStart").fadeIn(3000);
            setTimeout(function () {
                window.location.href = "index.html";
            }, 3000);
        });
    },
    play: function () { // Main game
        "use strict";
        var questions = $('<p>'),
            button = $('<button>'),
            textArea = $('<p>'),
            result = $("<p>"),
            answer,
            num,
            active,
            currentQuestionNumber = 1,
            clickgame = 0,
            inputText = $('<input>'),
            points = 0;
        button.text("Svara");
        $("#playStart").fadeOut(1000);
        $("#mainContainer").fadeIn(3000);
        $("#q" + currentQuestionNumber).css("background-image", "url(image/unlock.png)"); // FIRST UNLOCK PIC
        $(".q").click(function () {
            $("#clicksound")[0].play();
            if (currentQuestionNumber === Number($(this).text())) {
                $(textArea).hide();
                $(inputText).show();
                $(button).show();
                active = $(this);
                if (active.text() <= 5) {
                    num = Number(active.text()) - 1;
                    questions.html(spel.data.question[num].q);
                } else if (active.text() <= 10) {
                    num = Number(active.text()) - 6;
                    questions.html(spel.data.squestion[num].q);
                } else if (active.text() <= 15) {
                    num = Number(active.text()) - 11;
                    questions.html(spel.data.fquestion[num].q);
                }
                $('#questionContainer').append(questions);
                $('#questionContainer').append(inputText);
                $('#questionContainer').append(button);
                $('#questionContainer').append(textArea);
                $("#playRestart").prepend(result);
            }
        });
        $(button).click(function () {
            $(textArea).show();
            answer = inputText.val().toLowerCase();
            if (spel.data.question[num].a.indexOf(answer) !== -1 || spel.data.squestion[num].a.indexOf(answer) !== -1 || spel.data.fquestion[num].a.indexOf(answer) !== -1) {
                active.css('background-color', "hsla(118, 84%, 40%, 0.75)"); //Green
                setTimeout(function () {
                    $("#lock")[0].play();
                    active.css("background-image", "url(image/lock-icon.png)");
                }, 1000);
                $(inputText).val("");
                points = points + 1;
                $("#correctsound")[0].play();
                $(inputText).hide();
                $(button).hide();
                $(textArea).text("Rätt!");
            } else {
                active.css('background-color', "hsla(4, 96%, 46%, 0.80)"); //Red
                setTimeout(function () {
                    $("#lock")[0].play();
                    active.css("background-image", "url(image/lock-icon.png)");
                }, 1000);
                $(inputText).val("");
                $(inputText).hide();
                $(button).hide();
                $("#wrongsound")[0].play();
                $(textArea).text("Fel!");
            }
            currentQuestionNumber = currentQuestionNumber + 1;
            setTimeout(function () {
                $("#q" + currentQuestionNumber).css("background-image", "url(image/unlock.png)"); // NEXT QUESTION UNLOCK IMAGE 
            }, 1000);
            clickgame = clickgame + 1;
            if (clickgame === 15) {
                setTimeout(function () {
                    $(result).text(points);
                    $("#mainContainer").fadeOut(500);
                    $("#playRestart").fadeIn(1500);
                    spel.show.quizrestart();
                }, 2000);
            }
        });
    }
};
spel.show.angryquiz();
$(document).ready(function () {
    "use strict";
    $("#infoBar").click(function () {
        $("#infoText").slideToggle(1000);
    });
});