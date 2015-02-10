define(['jquery', 'controller', 'options'], function ($, controller, options) {

    $(document).ready(function () {
        
        var optionsContent = $("#optionsContent"),
            gameContent = $("#gameContent"),
            startContent = $("#startContent");

        //Initialize UI
        showStartContent();
        

        //Options Events              
        $("#lnkOptions").on("click", function () {

            showOptionsContent();
            controller.populateOptions();
            return false;

        });

        $("#btnSaveOptions").on("click", function () {

            showStartContent();
            controller.saveOptions();
        });


        //BoardGame events
        $("#lnkHome").on("click", function () {
            showStartContent();
            return false;
        });
        $("#lnkPlay").on("click", function () {
            
            showGameContent();
            controller.quitGame();
            controller.playGame();
            return false;

        });
        $("#btnQuitGame").on("click", function () {

            showStartContent();
            controller.quitGame();
            
        });
        $("#btnPlayerDeal").on("click", controller.deal);
        $('#btnPlayerDecreaseBet0, #btnPlayerDecreaseBet1, #btnPlayerDecreaseBet2').on("click", { amount: -1 }, controller.changeBet);
        $('#btnPlayerIncreaseBet0, #btnPlayerIncreaseBet1, #btnPlayerIncreaseBet2').on("click", { amount: 1 }, controller.changeBet);
        $('#btnPlayerHit0, #btnPlayerHit1, #btnPlayerHit2').on("click", controller.hit);
        $('#btnPlayerStand0, #btnPlayerStand1, #btnPlayerStand2').on("click", controller.stand);


        // Switching Between UI functionality
        function showOptionsContent() {

            startContent.hide();
            gameContent.hide();
            optionsContent.show();

        }


        function showStartContent() {

            startContent.show();
            gameContent.hide();
            optionsContent.hide();

        }
        
        function showGameContent(){

            startContent.hide();
            gameContent.show();
            optionsContent.hide();
        }       
     

    });

});