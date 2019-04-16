



$(document).ready(function () {

    function toggleOn() {
        $('#toggle-trigger').bootstrapToggle('on')
        $('#collapseSummary').html('Toggle: ' + $(this).prop('checked'))
    }
    function toggleOff() {
        $('#toggle-trigger').bootstrapToggle('off')
    } 

// All Coins
    $("#ALL").click(function () {
        var ALL = `https://api.coingecko.com/api/v3/exchange_rates`;
        $.ajax({
            type: "GET",
            url: ALL,
            async: false,
            success: function (response) {
                max = response.length;
                $(".row").attr({ "max": 100, "min": 1 })
                var rates = response.rates;
                console.log(max, rates.btc);
                

                rates.forEach(element => {
                    console.log();
                    
                    $("#AddCard").append(`
                
                    <div class="card col-sm-4">
                        <div class="card-body">
                            <h4 class="card-title">${btc.name}</h4>
                            <!-- radio -->
                            <div class="float-right">
                            <input type="checkbox" checked data-toggle="toggle" data-style="ios" id="toggle-trigger">
                                <!-- content to show/hide -->
                            </div>
                            <p class="card-text">Some example text. Some example text.</p>
                            <div class="row, justify-content-center">
                                <div id="summary">
                                    <p class="collapse" id="collapseSummary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor maximus
                                        laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada
                                        fames
                                        ac turpis egestas. In hac habitasse platea dictumst. Suspendisse venenatis
                                        sollicitudin erat in gravida. Sed eget nisl tristique, commodo lectus sit amet,
                                        vulputate sem. Cras porttitor lorem ipsum, sit amet iaculis massa feugiat vitae.
                                        Curabitur sapien odio, ullamcorper tincidunt interdum vitae, vestibulum eu
                                        neque.
                                        Nam leo massa, fringilla eget mauris feugiat, auctor suscipit justo.
                                    </p>
                                    <a class="collapsed" data-toggle="collapse" href="#collapseSummary"
                                        aria-expanded="false" aria-controls="collapseSummary"></a>
                                </div>
                            </div>
    
                        </div>
    
                    </div>

                    `);

                });


            },
            fail: function (result) {
                alert("lo");
            },
            error: function (result) {
                alert("lolo");

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
                max = response.length;
                $(".row").attr({ "max": 100, "min": 1 })
                if (response = NaN) {
                    alert("You need to insert a number between 1-100");
                } console.log(max, response);
                $("#AddCard").append(`
                
                    <div class="card col-sm-4">
                        <div class="card-body">
                            <h4 class="card-title">Card title</h4>
                            <!-- radio -->
                            <div class="float-right">
                            <input type="checkbox" checked data-toggle="toggle" data-style="ios" id="toggle-trigger">
                                <!-- content to show/hide -->
                            </div>
                            <p class="card-text">Some example text. Some example text.</p>
                            <div class="row, justify-content-center">
                                <div id="summary">
                                    <p class="collapse" id="collapseSummary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor maximus
                                        laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada
                                        fames
                                        ac turpis egestas. In hac habitasse platea dictumst. Suspendisse venenatis
                                        sollicitudin erat in gravida. Sed eget nisl tristique, commodo lectus sit amet,
                                        vulputate sem. Cras porttitor lorem ipsum, sit amet iaculis massa feugiat vitae.
                                        Curabitur sapien odio, ullamcorper tincidunt interdum vitae, vestibulum eu
                                        neque.
                                        Nam leo massa, fringilla eget mauris feugiat, auctor suscipit justo.
                                    </p>
                                    <a class="collapsed" data-toggle="collapse" href="#collapseSummary"
                                        aria-expanded="false" aria-controls="collapseSummary"></a>
                                </div>
                            </div>
    
                        </div>
    
                    </div>

                `);

            },
            fail: function (result) {
                alert("lo");
            },
            error: function (result) {
                alert("lolo");

            },

        });

    });
});