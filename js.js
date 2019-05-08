var timearr = [];

$(document).ready(function() {
  $("#coin").click(function() {
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
  $("#reports").click(function() {
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
  $("#about").click(function() {
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

  $("#coin").click(function() {
    $.ajax({
      type: "GET",
      url: `https://api.coingecko.com/api/v3/coins/list`,
      async: false,
      success: function(data) {
        for (var num = 0, newdata = 50; num <= newdata; num++) {
          $("#row2").append(`
                    <div class="card col-sm-4" id="${num}">
                        <div class="card-body">
                            <h2 class="card-title">${data[num].name}</h2>
                            <h5 class="card-title" id="CoinId">${
                              data[num].id
                            }</h5>
                            <!-- radio -->
                            <div class="float-right">
                                <input id="toggle-one${num}" type="checkbox" checked data-toggle="toggle" data-style="ios">
                            </div>
                            <h5 class="card-text">Symbol :  ${
                              data[num].symbol
                            }</h5>
                            <div class="row, justify-content-center">
                                <div id="demo${num}" class="collapse in"><div class="loader"></div></div>
                                <button type="button" class="btn btn-info collapsed" data-toggle="collapse" data-target="#demo${num}"></button>
                            </div>
                        </div>
                    </div>
                    `);
        }
      }
    });
  });

  $("body").on("click", ".collapsed", function() {
    var CoinName = $(this)
      .parent()
      .parent()
      .find("#CoinId")
      .html();
    var collapsed = $(this).hasClass(".collapsed");
    var dataid = $(this).attr("data-target");
    var checked = $(this)
      .parent()
      .find(checked);

    ////////////////time////////////////
    var newDate = new Date();
    var timenow = newDate.getTime();
    console.log("time-now", timenow);
    ////////////////time////////////////

    if (!collapsed) {
      if (timearr[dataid] == null || timenow > timearr[dataid]) {
        $.ajax({
          type: "GET",
          url: `https://api.coingecko.com/api/v3/coins/` + CoinName,
          success: function(response) {
            $("body").find(`${dataid}`).html(`
                  <div class="row, justify-content-center" >
                          <h6>
                          <div><img src="${response.image.small}"></div>
                              USD : ${
                                response.market_data.current_price.usd
                              } $  </br>
                              EUR : ${
                                response.market_data.current_price.eur
                              } €  </br>
                              ILS : ${
                                response.market_data.current_price.ils
                              } ₪  </br>
                          </h6>
                  </div>
              </div>
          </div>
          `);
            ////////////////timeclike////////////////
            timeClike = newDate.getTime() + 120000; //time on clike to local
            timearr[dataid] = timeClike;
            console.log("timearr", timearr);
            console.log("timeClike", timeClike);
            ////////////////timeclike////////////////

            ////////////////localstorage////////////////
            if (typeof Storage !== "undefined") {
              var arr = JSON.parse(localStorage.getItem("objCoin")) || [];
              var objCoin = {};
              objCoin.TIMECLIKE = timeClike;
              objCoin.USD = response.market_data.current_price.usd;
              objCoin.EUR = response.market_data.current_price.eur;
              objCoin.ILS = response.market_data.current_price.ils;
              objCoin.IMG = response.image.small;
              arr.push(objCoin);
              localStorage.setItem("objCoin", JSON.stringify(arr));
            }
            ////////////////localstorage////////////////
          }
        });
      }
      ////////////////toggle////////////////
      if (checked) {
      } else {
      }
      console.log(checked);

      ////////////////toggle////////////////
    }
  });
});
