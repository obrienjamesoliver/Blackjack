define(['jquery', 'controller', 'options'], function ($, controller, options) {

    $(document).ready(function () {
        
        var optionsSection = $("#optionsSection"),
            gameSection = $("#gameSection"),
            topNavigation = $("#topNavigation");                              

        //Initialize UI
        optionsSection.hide();
        gameSection.hide();
        

        //Options Events              
        $("#btnOptions").on("click", function () {

            showOptions();
            controller.populateOptions();

        });
        $("#btnCancelOptions").on("click", hideOptions);
        $("#btnSaveOptions").on("click", function () {

            hideOptions();
            controller.saveOptions();

        });

        //BoardGame events
        $("#btnPlay").on("click", function () {
            
            showBoardGame();  
            controller.playGame();

        });
        $("#btnQuitGame").on("click", function () {

            hideBoardgame();
            controller.quitGame();
            
        });
        $("#btnPlayerDeal").on("click", controller.deal);
        $('#playerFields').on("click", ['#btnPlayerDecreaseBet0, #btnPlayerDecreaseBet1, #btnPlayerDecreaseBet2'], { amount: -1 }, controller.changeBet);
        $('#playerFields').on("click", ['#btnPlayerIncreaseBet0, #btnPlayerIncreaseBet1, #btnPlayerIncreaseBet2'], { amount: 1 }, controller.changeBet);
        $('#playerFields').on("click", ['#btnPlayerHit0, #btnPlayerHit1, #btnPlayerHit2'], controller.hit);
        $('#playerFields').on("click", ['#btnPlayerStand0, #btnPlayerStand1, #btnPlayerStand2'], controller.stand);

        // Switching Between UI functionality
        function showOptions() {

            topNavigation.hide();
            optionsSection.show();

        }

        function hideOptions() {

            topNavigation.show();
            optionsSection.hide();

        }

        function hideBoardgame() {

            gameSection.hide();
            topNavigation.show();                

        }
        
        function showBoardGame(){

            gameSection.show();
            topNavigation.hide();

        }       
     

    });

});