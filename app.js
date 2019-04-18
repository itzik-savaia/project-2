


$( "h1" ).click(function() {
  var htmlString = $( this ).html();
  $( this ).text( htmlString );
});
  


$(document).ready(function () {


        // // Initialize select2
        // $("#Search").select2();

        // // Read selected option
        // $('#but_read').click(function () {
        //     var coin = $('#Search option:selected').text();
        //     var id = $('#Search').val();

        //     $('#AddCard').html("id : " + id + ", name : " + coin);

        // });

    function toggleOn() {
        $('#toggle-trigger').bootstrapToggle('on')
        $('#collapseSummary').html('Toggle: ' + $(this).prop('checked'))
    }
    function toggleOff() {
        $('#toggle-trigger').bootstrapToggle('off')
    }

    // All Coins
    $("#ALL").click(function () {

        var ALL = `https://api.coingecko.com/api/v3/coins`;
        $.ajax({
            type: "GET",
            url: ALL,
            async: false,
            success: function (response) {
                console.log(response);

                for (let i = 0; i <= response.length; i++) {

                    // var current_price = JSON.stringify(response.market_data.current_price);
                    $("#AddCard").append(`
                    <div class="card col-sm-4">
                        <div class="card-body">
                            <h2 class="card-title">${response[i].name}</h2>
                            <!-- radio -->
                            <div class="float-right">
                            <input type="checkbox" checked data-toggle="toggle" data-style="ios" id="toggle-trigger">
                                <!-- content to show/hide -->
                            </div>
                            <h5 class="card-text">Symbol : ${response[i].symbol} <img src="${response[i].image.thumb}" alt="" srcset=""></h5>
                            <div class="row, justify-content-center ">
                                <div id="summary">
                                    <h6 class="collapse" id="collapseSummary">
                                    USD : ${response[i].market_data.current_price.usd} $  </br>
                                    EUR : ${response[i].market_data.current_price.eur} €  </br>
                                    ILS : ${response[i].market_data.current_price.ils} ₪ </h6>
                                    <a class="collapsed" data-toggle="collapse" href="#collapseSummary"
                                        aria-expanded="false" aria-controls="collapseSummary"></a>
                                </div>
                            </div>
    
                        </div>
    
                    </div>

                    `);
                }
            },
            fail: function (response) {
                alert("הכנס שם מטבעה ");
            },
            error: function (response) {
                alert("הכנס שם מטבעה");

            },

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

                    $("#AddCard").html(`
                    <div class="card col-sm-4">
                        <div class="card-body">
                            <h2 class="card-title">${response.name}</h2>
                            <!-- radio -->
                            <div class="float-right">
                            <input type="checkbox" checked data-toggle="toggle" data-style="ios" id="toggle-trigger">
                                <!-- content to show/hide -->
                            </div>
                            <h5 class="card-text">Symbol : ${response.symbol} <img src="${response.image.thumb}" alt="" srcset=""></h5>
                            <div class="row, justify-content-center ">
                                <div id="summary">
                                    <h6 class="collapse" id="collapseSummary">
                                    USD : ${response.market_data.current_price.usd} $  </br>
                                    EUR : ${response.market_data.current_price.eur} €  </br>
                                    ILS : ${response.market_data.current_price.ils} ₪ </h6>
                                    <a class="collapsed" data-toggle="collapse" href="#collapseSummary"
                                        aria-expanded="false" aria-controls="collapseSummary"></a>
                                </div>
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