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
        $('#btnPlayerDecreaseBet0, #btnPlayerDecreaseBet1, #btnPlayerDecreaseBet2').on("click", { amount: -1 }, controller.changeBet);
        $('#btnPlayerIncreaseBet0, #btnPlayerIncreaseBet1, #btnPlayerIncreaseBet2').on("click", { amount: 1 }, controller.changeBet);
        $('#btnPlayerHit0, #btnPlayerHit1, #btnPlayerHit2').on("click", controller.hit);
        $('#btnPlayerStand0, #btnPlayerStand1, #btnPlayerStand2').on("click", controller.stand);


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