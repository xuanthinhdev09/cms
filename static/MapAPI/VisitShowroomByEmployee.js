//-----------------------------------------------------------
/// <reference path="../../pages/configuration/Brand.js" />
/// <reference path="../../lib/common.js" />
/// <reference path="../Bills/BillOrderDetailV2.js" />

Popup_VisitShowroomByEmployee = {
    htmlTag: {
        divPopupContainerWrapper: '#divPopupVisitShowroomByEmployeeWrapper',
        divPopupContainer: '#divPopupVisitShowroomByEmployee',
        popupCloseButton: '.popupclosebutton',
        popup_cancel: '#popup_cancel',
        popup_save: '#popup_save',
        txtDate: '#txtDate',
        selEmployee: '#selEmployee',
        spTotalCustomer: '#spTotalCustomer',
        spTotalImage: '#spTotalImage',
        spTotalBills: '#spTotalBills'
    },
    vars: {
        m_distritbutorId: 0,
        map: null
    },
    showPopup: function () {
        if ($(this.htmlTag.divPopupContainerWrapper).length == 0) {
            $("body").append("<div id='" + this.htmlTag.divPopupContainerWrapper.substring(1) + "'></div>");
            $(this.htmlTag.divPopupContainerWrapper).setTemplateURL("/Templates/popup/report/VisitShowroomByEmployee.htm?ver=" + CONSTANT.version);
            $(this.htmlTag.divPopupContainerWrapper).processTemplate(null);
            COMMON.setTemplatePopup(this.htmlTag.divPopupContainer);
            Popup_VisitShowroomByEmployee.processFormButton();
            $(Popup_VisitShowroomByEmployee.htmlTag.txtDate).datepicker({
                changeMonth: true,
                changeYear: true
            });
            var _currentDate = new Date();
            $(Popup_VisitShowroomByEmployee.htmlTag.txtDate).val(COMMON.convertDate(_currentDate));
            Popup_VisitShowroomByEmployee.bindEmployeeVisitShowRoom();
        };
    },
    bindEmployeeVisitShowRoom: function () {
        Loading.showProcess();
        $.ajax({
            type: "GET",
            url: "/handler/EmployeeHandler.ashx",
            data: { t: 'GetEmployeeOrderList' },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                //var strHtml = '<option value="-1">Tất cả</option>';
                var strHtml = '<option value="-1">--Chọn nhân viên--</option>';
                for (var i = 0; i < data.length; i++) {
                    strHtml += '<option value="' + data[i].EmployeeId + '">' + data[i].Name + '</option>';
                }
                $(Popup_VisitShowroomByEmployee.htmlTag.selEmployee, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).html(strHtml);
                Loading.closeProcess();
                $(Popup_VisitShowroomByEmployee.htmlTag.selEmployee, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).unbind("change");
                $(Popup_VisitShowroomByEmployee.htmlTag.selEmployee, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).change(function () {
                    Popup_VisitShowroomByEmployee.bindVisitShowroomByEmployee();
                });
            }
        });
    },
    processFormButton: function () {
        FValidate.validateAll();
        $(this.htmlTag.popupCloseButton, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).click(function () {
            Popup_VisitShowroomByEmployee.close();
        });
        $(this.htmlTag.popup_cancel, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).click(function () {
            Popup_VisitShowroomByEmployee.close();
        });
        $(this.htmlTag.txtDate, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).change(function () {
            Popup_VisitShowroomByEmployee.bindVisitShowroomByEmployee();
        });
    },
    bindVisitShowroomByEmployee: function () {
        var employeeId = $(Popup_VisitShowroomByEmployee.htmlTag.selEmployee, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).val();
        var date = COMMON.convertFormatDate($.trim($(Popup_VisitShowroomByEmployee.htmlTag.txtDate, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).val()));
        Loading.showProcess();
        $.ajax({
            type: "GET",
            url: "/handler/ReportHandler.ashx",
            data: { t: 'ReportVisitShowRoomGPS', date: date, employeeId: employeeId },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (_data) {
                var data = _data.Items;
                $(Popup_VisitShowroomByEmployee.htmlTag.spTotalBills, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).html(_data.totalBills);
                $(Popup_VisitShowroomByEmployee.htmlTag.spTotalCustomer, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).html(_data.totalCustomer);
                $(Popup_VisitShowroomByEmployee.htmlTag.spTotalImage, Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).html(_data.totalImage);
                Loading.closeProcess();
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
                        var map = new google.maps.Map(document.getElementById('map_canvas'),
                        mapOptions);
                        for (var i = 0; i < data.length; i++) {
                            if ($.trim(data[i].VisitGPS).length > 3) {
                                var arr = new Array();
                                arr = data[i].VisitGPS.split(",");
                                latitue = parseFloat(arr[0]);
                                longtitue = parseFloat(arr[1]);
                                myLatlng = new google.maps.LatLng(parseFloat(latitue), parseFloat(longtitue));
                                var icon = "";
                                if (data[i].TotalBill > 0)
                                    icon = "/Images/success/";
                                else
                                    icon = "/Images/lost/";
                                icon += "number_" + (i + 1) + ".png";
                                var marker = new google.maps.Marker({
                                    position: myLatlng,
                                    map: map,
                                    icon: icon
                                });

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

                                contentString = "<div style='text-align:left'><div><b>Khách hàng thứ " + (i + 1) + "</b></div><div> Lúc: " + COMMON.jSonDateToString(data[i].VisitDate, 4) + "</div><div> Tại cửa hàng: " + data[i].FullName + "</div><div>Địa chỉ: " + data[i].Address + "</div><div>Số HĐ:" + data[i].TotalBill + "</div></div>";
                                var infowindow1 = new google.maps.InfoWindow({
                                    content: contentString,
                                    zIndex: 100,
                                    draggable: true
                                });
                                Popup_VisitShowroomByEmployee.addListenner(map, marker, infowindow, infowindow1);
                            }
                        }
                        map.fitBounds(bounds);
                    }
                    catch (ex) { }
                }
                else {
                    $("#map_canvas", Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).html("Không có dữ liệu");
                }
            }
        });
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
    },
    getMap: function () {

    },
    close: function () {
        if ($(Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).length != 0) {
            $(Popup_VisitShowroomByEmployee.htmlTag.divPopupContainerWrapper).remove();
        }
    }
};
