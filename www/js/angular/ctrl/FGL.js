var FGL = ['$scope', '$log', '$location','$rootScope',function ($scope, $log, $location,$rootScope) {
    $scope.system = "FGL";
    $scope.fens_anz = 1;
    $scope.bfr = 1000;
    $scope.hfr = 2000;
    $scope.anz = [4, 5, 6, 7];
    $scope.anz_choose;
    $scope.h_lam = 235;
    $scope.mpf;
    $scope.windlast = 0;
    $scope.ffl = 0;
    $scope.AgeomElem = 0;
    $scope.AeroElem = 0;
    $scope.AgeomElem_Gesamt = 0;
    $scope.AeroElem_Gesamt = 0;
    $scope.mpf = "mit";
    $scope.mpf_anz = 0;
    var hla_max = 350;
    var hla_min = 140;
    var hla_max_nrwg = 326;
    var hla_min_nrwg = 170;
    var min_standard_;
    var max_standard_;
    var min_standard__nrgw;
    var max_standard__nrgw;
    var array_standard = [];
    var array_standard_nrgw = [];
    var lichte;
    var fensterflaeche;
    var lam_breite;
    var lam_hoehe;
    var lam_flaeche;
    var abzugB = 79;
    var abzugH = 42;
    var abzugMpf = 58;
    $scope.abzugLamHoe;
    $scope.ohnealu = ["0,7", "0,8", "0,9", "1,0", "1,1", "1,2"];
    $scope.mitalu = ["0,67"];
    $scope.ug_array = $scope.ohnealu;
    $scope.ug = $scope.ohnealu[0];
    $scope.ug_c = parseFloat($scope.ug.replace(',', '.'));
    $scope.randverbund = $('.randverbund').find('option').eq(0).val();
    $scope.verglasung = $('.verglasung').find('option').eq(0).val();
    $scope.initFirst = function() {
        $scope.calc_mpf();
        $scope.setLichte();
        $scope.optimaleLamellenanzahl();
        $scope.setValues();
        $scope.min_standard();
        $scope.max_standard();
        $scope.min_standard_nrgw();
        $scope.max_standard_nrgw();
        $scope.build_anzahl_array();
        $scope.calc_windlast();
        $scope.calc_AgeomElem();
        $scope.calc_AeroElem();
    }
    $scope.init = function(string) {
        $scope.calc_mpf();
        $scope.setLichte();
        $scope.setValues();
        $scope.min_standard();
        $scope.max_standard();
        $scope.min_standard_nrgw();
        $scope.max_standard_nrgw();
        $scope.build_anzahl_array();
        $scope.calc_windlast();
        $scope.calc_AgeomElem();
        $scope.calc_AeroElem();
    }
    $scope.pathSwitch = function(system) {
        var system = system.replace(' ', '');
        $location.path('/fensterberechnung/' + system)
    }
    $scope.setLichte = function() {
        lichte = $scope.hfr - 40;
    }
    $scope.optimaleLamellenanzahl = function() {
        $scope.anz_choose = Math.round(lichte / 250);
    }
    $scope.calc_mpf = function() {
        if ($scope.bfr >= 2000) {
            $scope.mpf = true;
            $scope.mpf_anz = 1;
        } else {
            $scope.mpf = false;
            $scope.mpf_anz = 0;
        }
    };
    $scope.setValues = function() {
        fensterflaeche = $scope.bfr / 1000 * $scope.hfr / 1000;
        lam_breite = ($scope.bfr - abzugB - $scope.mpf_anz * abzugMpf) / ($scope.mpf_anz + 1);
        lam_hoehe = (lichte + ($scope.anz_choose - 1) * 14) / $scope.anz_choose //(lichte - ($scope.anz_choose + 1) * 3) / $scope.anz_choose;
        lam_flaeche = lam_hoehe / 1000 * lam_breite / 1000;
        lam_flaeche = Math.round(lam_flaeche * 1000) / 1000;
        var hlam = Math.round(lam_hoehe * 10) / 10;
        $scope.h_lam = hlam.toString();
        $scope.abzugLamHoe = $scope.anz_choose * $scope.verglasung;
    }
    $scope.build_anzahl_array = function() {
        array_standard = [];
        array_standard_nrgw = [];
        for (var i = min_standard_; i <= max_standard_; i++) {
            array_standard.push(i);
        };
        for (var i = min_standard__nrgw; i <= max_standard__nrgw; i++) {
            array_standard_nrgw.push(i);
        };
        $scope.anz = array_standard;
    }
    // NRGW GEPRÜFT?
    $scope.check_nrgw = function(anz_choose) {
        var zahl = anz_choose;
        if (zahl !== null) {
            if (zahl >= min_standard__nrgw && zahl <= max_standard__nrgw) {
                $scope.showNRGW = true;
                $scope.showNRGWzuklein = false;
                $scope.showNRGWzugross = false;
                $scope.showNRGWlam = false;
            } else if (zahl < min_standard__nrgw) {
                $scope.showNRGW = false;
                $scope.showNRGWzuklein = true;
                $scope.showNRGWzugross = false;
                $scope.showNRGWlam = false;
            } else if (zahl > max_standard__nrgw) {
                $scope.showNRGW = false;
                $scope.showNRGWzuklein = false;
                $scope.showNRGWzugross = true;
                $scope.showNRGWlam = false;
            }
        } else {
            $scope.showNRGW = false;
            $scope.showNRGWzuklein = false;
            $scope.showNRGWzugross = false;
            $scope.showNRGWlam = true;
        }
    }
    $scope.min_standard = function() {
        min_standard_ = Math.ceil(lichte / hla_max);
    }
    $scope.max_standard = function() {
        max_standard_ = Math.floor(lichte / hla_min);
    }
    $scope.min_standard_nrgw = function() {
        min_standard__nrgw = Math.ceil(lichte / hla_max_nrwg);
    }
    $scope.max_standard_nrgw = function() {
        max_standard__nrgw = Math.floor(lichte / hla_min_nrwg);
    }

    function setWindlast(int_) {
        $scope.windlast = int_ + " N/m²";
    }
    // WINDLAST
    $scope.calc_windlast = function() {
        var e = lam_flaeche;
        var d = $scope.verglasung;
        if (d == "8") {
            if (e < 0.3) {
                setWindlast(1500);
            } else if (e >= 0.3 && e < 0.4) {
                setWindlast(1100);
            } else if (e >= 0.4 && e < 0.48) {
                setWindlast(1000);
            } else {
                setWindlast("-");
            }
        } else if (d == "10") {
            if (e < 0.3) {
                setWindlast(2000);
            } else if (e >= 0.3 && e < 0.4) {
                setWindlast(1750);
            } else if (e >= 0.4 && e < 0.52) {
                setWindlast(1500);
            }
        } else if (d == "12") {
            if (e < 0.3) {
                setWindlast(2900);
            } else if (e >= 0.3 && e < 0.4) {
                setWindlast(2250);
            } else if (e >= 0.4 && e < 0.52) {
                setWindlast(2000);
            }
        }
    }
    $scope.calc_AgeomElem = function() {
        var ageom = (($scope.bfr - abzugB - ($scope.mpf_anz * abzugMpf)) * ($scope.hfr - abzugH - $scope.abzugLamHoe)) / 1000000
        var zwischageom=  Math.round(ageom * 100) / 100
        $scope.AgeomElem = zwischageom + " m²";
        $scope.AgeomElem_Gesamt = (zwischageom * $scope.fens_anz).toFixed(2) + " m²";
    }
    $scope.calc_AeroElem = function() {
        var cv0;
        var blv = lam_breite / lam_hoehe;
        var klg;
        var blichte_aero = ($scope.bfr - abzugB - $scope.mpf_anz * abzugMpf) / 1000;
        var hlichte_aero = ($scope.hfr - abzugH) / 1000;
        var Av = blichte_aero * hlichte_aero;
        if ($scope.anz_choose < 5) {
            cv0 = 0.58
        } else if ($scope.anz_choose == 5 || $scope.anz_choose == 6 || $scope.anz_choose == 7) {
            cv0 = 0.56
        } else if ($scope.anz_choose > 7) {
            cv0 = 0.54
        }
        var calc_AeroElem_ = (Av * cv0).toFixed(2);
        $scope.AeroElem = calc_AeroElem_ + " m²";
        $scope.AeroElem_Gesamt = (calc_AeroElem_ * $scope.fens_anz).toFixed(2) + " m²";
    }
    $scope.ug_calc = function(ug) {
        $scope.ug_c = parseFloat(ug.replace(',', '.'));
    }
    $scope.rand_calc = function(rverb) {
        if (rverb == 0.000) {
            $scope.ug_array = $scope.mitalu;
            $scope.ug = $scope.mitalu[0];
            $scope.ug_c = parseFloat($scope.ug.replace(',', '.'));
        } else {
            $scope.ug_array = $scope.ohnealu;
            $scope.ug = $scope.ohnealu[0];
            $scope.ug_c = parseFloat($scope.ug.replace(',', '.'));
        }
    }
    $scope.$watch('anz_choose', function() {
        $scope.check_nrgw();
        $scope.init();
    });

    function getItems(){
        var calcItem = [{
            "isNRGW" : $scope.showNRGW,
            "mittelpfosten" : $scope.mpf,
            "system": $scope.system,
            "fens_anz": $scope.fens_anz,
            "bfr": $scope.bfr,
            "hfr": $scope.hfr,
            "anz_choose": $scope.anz_choose,
            "ug": $scope.ug,
            "randverbund": $scope.randverbund,
            "bfr": $scope.bfr,
            "h_lam": $scope.h_lam,
            "AeroElem": $scope.AeroElem,
            "AeroElem_Gesamt": $scope.AeroElem_Gesamt,
            "AgeomElem": $scope.AgeomElem,
            "AgeomElem_Gesamt": $scope.AgeomElem_Gesamt,
            "uw_op_s": $scope.uw_op_s,
            "uw_mp_s": $scope.uw_mp_s,
            "windlast": $scope.windlast
        }]

        return calcItem
    }

    $scope.addRow = function(){
        var json = JSON.parse(localStorage.getItem('row'))
        
        if(json){
            json.push(getItems()[0])
        }else{
            json = getItems()
        }

        localStorage.setItem('row',JSON.stringify(json))
        $rootScope.row = json
    }


    $scope.removeRow = function(index){
        var json = JSON.parse(localStorage.getItem('row'))

        for (var i = 0; i < json.length; i++) {
            if(i == index){
             json.splice(index, 1);
            }
        };

        localStorage.setItem('row',JSON.stringify(json))
        $rootScope.row = json
    }

    $rootScope.initRow();

    $scope.printMultipleCalc = function(){
        window.location.href = "/print/#/multiple";
    }

    $scope.printCalc = function(){
        var calcItem = getItems();
        localStorage.setItem('einzeln',JSON.stringify(calcItem))
        window.location.href = "/print/#/simple";
    }

}];