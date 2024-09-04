//-----------------------------------------------------------
/// <reference path="../../pages/configuration/Brand.js" />
/// <reference path="../../lib/common.js" />
/// <reference path="../Bills/BillOrderDetailV2.js" />

Map = {
    htmlTag: {
        map: '#map_canvas'
    },
    vars: {
        m_distritbutorId: 0,
        map: null
    },    
    showMap: function (data) {
		console.log(data.length);
        if (data.length > 0) {

                    var bounds = new google.maps.LatLngBounds();
                    var myLatlng;
                    var _zoom = 13;
                    var latitue = 0.0;
                    var longtitue = 0.0;
                    var totalPoint = 0;
                    var maxlat = 0;
                    var minlat = 0;
                    try {
                        var arrMarker = new Array();
                        var arrinfowindow = new Array();
                        var myLatlng = new google.maps.LatLng(18.660949, 105.67404739999999);
                        var mapOptions = {
                            center: myLatlng,
                            zoom: _zoom,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            region: 'VN'
                        };
                        var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
                        for (var i = 0; i < data.length; i++) {
                            if ($.trim(data[i].VisitGPS).length > 3) {
                                var arr = new Array();
                                arr = data[i].VisitGPS.split(",");
                                latitue = parseFloat(arr[0]);
                                longtitue = parseFloat(arr[1]);
                                myLatlng = new google.maps.LatLng(parseFloat(latitue), parseFloat(longtitue));
								console.log(myLatlng);
								
								
                                if (data[i].TotalBill > 0)
								{
									var marker = new google.maps.Marker({
										position: myLatlng,
										map: map,
										icon: data[i].Logo
									});
								}
								else
								{
									var marker = new google.maps.Marker({
										position: myLatlng,
										map: map,
									});
								}
								bounds.extend(marker.getPosition());
                                //arrMarker[arrMarker.length] = marker;
                                //marker = arrMarker[arrMarker.length - 1];
                                var contentString = "";
                                var infowindow = new google.maps.InfoWindow({
                                    content: contentString,
                                    zIndex: 10,
                                    draggable: true
                                });
                                //infowindow.open(map, marker);

                                contentString = "<div class='item_name'>" + data[i].FullName + "</div> <div class='item_images'> <img style="" src='" + data[i].Avata + "'> </div> <div class='item_address'>" + data[i].Address + "</div>";
                                var infowindow1 = new google.maps.InfoWindow({
                                    content: contentString,
                                    zIndex: 100,
                                    draggable: true
                                });
                                Map.addListenner(map, marker, infowindow, infowindow1);
                            }
                        }
                        map.fitBounds(bounds);
                    }
                    catch (ex) { }
                }
                else {
                    $("#map_canvas").html("Không có dữ liệu");
                }
    },
    getUrl: function (url) {
        if (url != "/images/user.png") {
            var index = url.indexOf(".png");
            if (index > 0) {
                url = url.substr(0, index + ".png".length);
            }
            else {
                index = url.indexOf(".jpg");
                url = url.substr(0, index + ".jpg".length);
            }
        }
        return url;
    },
    addListenner: function (map, marker, infowindow, infowindow1) {
        google.maps.event.addListener(marker, 'mouseover', function () {
            infowindow1.open(map, marker);
        });
        google.maps.event.addListener(marker, 'mouseout', function () {
            infowindow1.close();
        });
    }
};