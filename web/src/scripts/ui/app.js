define(['jquery', 'controller', 'options'], function ($, controller, options) {

    $(document).ready(function () {
        
        var optionsContent = $("#optionsContent"),
            gameContent = $("#gameContent"),
            topNavigation = $("#topNavigation");                              

        //Initialize UI
        optionsContent.hide();
        gameContent.hide();
        

        //Options Events              
        $("#lnkOptions").on("click", function () {

            showOptions();
            controller.populateOptions();

        });
        $("#btnCancelOptions").on("click", hideOptions);
        $("#btnSaveOptions").on("click", function () {

            hideOptions();
            controller.saveOptions();

        });

        //BoardGame events
        $("#lnkPlay").on("click", function () {
            
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
            optionsContent.show();

        }

        function hideOptions() {

            topNavigation.show();
            optionsContent.hide();

        }

        function hideBoardgame() {

            gameContent.hide();
            topNavigation.show();                

        }
        
        function showBoardGame(){

            gameContent.show();
            topNavigation.hide();

        }       
     

    });

});