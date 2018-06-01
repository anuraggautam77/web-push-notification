
$(document).ready(function () {
    var CPSubscription = (function () {
        var serviceurl = 'https://donotifyme.herokuapp.com/api/';
        var couponBtn = null;
        var promoBtn = null;
        var CCN = null;
        var coupon = {text: 'Subscribe', status: 'sub'};
        var promotion = {text: 'Subscribe', status: 'sub'};



        var initialization = function () {
            couponBtn = $('.push-coupon');
            promoBtn = $('.push-promo');
            CCN = getCookie('CCN');
            getsubscriptionData();
            bindEvents();

        };

        var getsubscriptionData = function () {

            $.ajax({
                type: 'GET',
                url: serviceurl + 'getccnnotification/' + CCN,
                dataType: 'json',
                contentType: 'application/json',
                success: function (json) {

                    if (json.hasOwnProperty('list')) {
                        if (json.list.promotion !== null && json.list.promotion === 'sub') {
                            $(promoBtn).html("Unsubscribe for Promotions");
                            promotion.status = "un";
                        }
                        if (json.list.coupontype !== null && json.list.coupontype === 'sub') {
                            $(couponBtn).html("Unsubscribe for Coupons");
                            coupon.status = "un";
                        }

                    }

                }
            });

        };



        var bindEvents = function () {

            couponBtn.on('click', {btn: "C", defaultdata: coupon}, bttnClickHandler);
            promoBtn.on('click', {btn: "P", defaultdata: promotion}, bttnClickHandler);


        };

        var getCookie = function (name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        };


        var bttnClickHandler = function (e) {
            e.preventDefault();
            var buttonType = e.data.btn;
            var flag = e.data.defaultdata.status;

            $.ajax({
                type: 'POST',
                url: serviceurl + 'savedevicefcm',
                data: JSON.stringify({
                    token: window.localStorage.getItem('deviceToken'),
                    subtype: buttonType,
                    status: flag,
                    userId: CCN
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.status == '200') {
                        var obj = {};
                        if (buttonType === 'C') {
                            if (flag === 'sub') {
                                $(couponBtn).html("Unsubscribe for Coupons");
                                coupon.status = "un";
                            } else {
                                $(couponBtn).html("Subscribe for Coupons");
                                coupon.status = "sub";
                            }
                        } else {
                            if (flag === 'sub') {
                                $(promoBtn).html("Unsubscribe for Promotions");
                                promotion.status = "un";
                            } else {
                                $(promoBtn).html("Subscribe for Promotions");
                                promotion.status = "sub";
                            }

                        }
                    }

                }
            });


        };

        return {
            init: initialization
        };
    })();

    CPSubscription.init();
});