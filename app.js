

$(document).ready(function () {

    $("#coin").click(function () {
        $(".text-center").html(`
            <h1>מטבעות</h1>
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
        </div>
        `);
    });
    $("#reports").click(function () {
        $(".text-center").html(`
            <h1>דוחות בזמן אמת</h1>
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
        </div>
        `);
    });
    $("#about").click(function () {
        $(".text-center").html(`
            <h1>פרוייקט-2</h1>
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <img src="/img/Bitcoin animation.gif" alt="מטבעה"  class="animationbit">
            <h3>איציק סביה
                תז-311320311
            </h3>
            <h6>api.coingecko.com-פרוייקט דיווח מצב בטבעות לפי זמן נתון דרך אתר</h6>
        </div>
        `);
    });
    // All Coins
    $("#coin").click(function () {
        var ALL = `https://api.coingecko.com/api/v3/coins/list`;
        $.ajax({
            type: "GET",
            url: ALL,
            async: false,
            success: function (data) {
                for (var num = 0, newdata = 50; num <= newdata; num++) {
                    $("#row2").append(`
                    <div class="card col-sm-4" id="${num}">
                        <div class="card-body">
                            <h2 class="card-title">${data[num].name}</h2>
                            <h5 class="card-title" id="CoinId">${data[num].id}</h5>
                            <!-- radio -->
                            <div class="float-right">
                                <input type="checkbox" checked data-toggl="toggle" data-style="ios" id="toggle-trigger">
                            </div>
                            <h5 class="card-text">Symbol :  ${data[num].symbol}</h5>
                            <div class="row, justify-content-center">
                                <div id="demo${num}" class="collapse in"><div class="loader"></div></div>
                                <button type="button" class="btn btn-info collapsed" data-toggle="collapse" data-target="#demo${num}"></button>
                            </div>
                        </div>
                    </div>
                    `);
                }
            },
        });
    });

    $("body").on('click', '.collapsed', function () {
        var CoinName = $(this).parent().parent().find("#CoinId").html();
        var dataid = $(this).attr("data-target");
        $.ajax({
            type: "GET",
            url: `https://api.coingecko.com/api/v3/coins/` + CoinName,
            success: function (response) {
                $("body").find(`${dataid}`).html(`
                        <div class="row, justify-content-center" >
                                <h6>
                                    USD : ${response.market_data.current_price.usd} $  </br>
                                    EUR : ${response.market_data.current_price.eur} €  </br>
                                    ILS : ${response.market_data.current_price.ils} ₪  </br>
                                </h6>
                        </div>
                    </div>
                </div>
                `);
                if (typeof (Storage) !== "undefined") {
                    var arr = JSON.parse(localStorage.getItem('objCoin')) || [];
                    var objCoin = {};
                    objCoin.USD = response.market_data.current_price.usd;
                    objCoin.EUR = response.market_data.current_price.eur;
                    objCoin.ILS = response.market_data.current_price.ils;
                    arr.push(objCoin);
                    localStorage.setItem('objCoin', JSON.stringify(arr));
                }
            }
        });
    });
    // one Coin
    $("#SearchBut").click(function () {
        var INPUT = $("#Search").val();
        var URL = `https://api.coingecko.com/api/v3/coins/` + INPUT;
        $.ajax({
            type: "GET",
            url: URL,
            async: false,
            success: function (response) {
                [response.id].forEach(element => {
                    console.log(response);
                    var current_price = JSON.stringify(response.market_data.current_price);
                    console.log(current_price);
                    $("#row1").html(`
                    <div class="card col-sm-4">
                        <div class="card-body">
                            <h2 class="card-title">${response.name}</h2>
                            <!-- radio -->
                            <div class="float-right">
                            <input type="checkbox" checked data-toggle="toggle" data-style="ios" id="toggle-trigger">
                            </div>
                            <h5 class="card-text">Symbol : ${response.symbol} <img src="${response.image.thumb}" alt="" srcset=""></h5>
                            <div class="row, justify-content-center" id="summary">
                                    <h6 class="collapse" id="collapseSummary">
                                    USD : ${response.market_data.current_price.usd} $  </br>
                                    EUR : ${response.market_data.current_price.eur} €  </br>
                                    ILS : ${response.market_data.current_price.ils} ₪ </h6>
                                    <a class="collapsed" data-toggle="collapse" href="#collapseSummary" aria-expanded="false" aria-controls="collapseSummary"></a>
                            </div>
                        </div>
                    </div>
                    `);
                });
            },
            fail: function (response) {
                alert("הכנס שם מטבעה");
            },
            error: function (response) {
                alert("הכנס שם מטבעה");
            },
        });
    });
});