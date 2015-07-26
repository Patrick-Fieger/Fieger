var FLW40 =['$scope', '$log', '$location',function ($scope, $log, $location) {
    $scope.system = "FLW40";
    $scope.fens_anz = 1;
    $scope.bfr = 1000;
    $scope.hfr = 2000;
    $scope.anz = [4, 5, 6, 7];
    $scope.anz_choose;
    $scope.h_lam = 235;
    $scope.mpf = 0;
    $scope.windlast = 0;
    $scope.ffl = 0;
    $scope.AgeomElem = 0;
    $scope.AeroElem = 0;
    $scope.AgeomElem_Gesamt = 0;
    $scope.AeroElem_Gesamt = 0;
    var hla_max = 600;
    var hla_min = 225;
    var hla_max_nrwg = 500;
    var hla_min_nrwg = 250;
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
    var abzugB = 84;
    var abzugH = 100;
    var abzugMpf = 0;
    var abzugLamHoe = 50.8;
    $scope.ohnealu = ["0,4", "0,5", "0,6", "0,7", "0,8", "0,9"];
    $scope.mitalu = ["0,67"];
    $scope.ug_array = $scope.ohnealu;
    $scope.ug = $scope.ohnealu[2];
    setTimeout(function(){$('#setug').val($scope.ohnealu[2])},500);
    $scope.ug_c = parseFloat($scope.ug.replace(',', '.'));
    $scope.randverbund = $('.randverbund').find('option').eq(2).val();
    $scope.initFirst = function() {
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
        $scope.uw_calc();
    }
    $scope.init = function(string) {
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
        $scope.uw_calc();
    }
    $scope.pathSwitch = function(system) {
        var system = system.replace(' ', '');
        $location.path('/fensterberechnung/' + system)
    }
    $scope.setLichte = function() {
        lichte = $scope.hfr - 83;
    }
    $scope.optimaleLamellenanzahl = function() {
        $scope.anz_choose = Math.round(lichte / 350);
    }
    $scope.setValues = function() {
        fensterflaeche = $scope.bfr / 1000 * $scope.hfr / 1000;
        lam_breite = $scope.bfr - 84;
        lam_hoehe = (lichte - ($scope.anz_choose + 1) * 3) / $scope.anz_choose;
        lam_flaeche = lam_hoehe / 1000 * lam_breite / 1000;
        lam_flaeche = Math.round(lam_flaeche * 100) / 100;
        var hlam = Math.round(lam_hoehe * 10) / 10;
        $scope.h_lam = hlam.toString();
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
        $scope.windlast = int_ + " N/m²"
    }
    // WINDLAST
    $scope.calc_windlast = function() {
        var e = lam_flaeche;
        if (e < 0.4) {
            setWindlast(5000);
        } else if (e >= 0.4 && e < 0.5) {
            setWindlast(4000);
        } else if (e >= 0.5 && e < 0.6) {
            setWindlast(3250);
        } else if (e >= 0.6 && e < 0.7) {
            setWindlast(2750);
        } else if (e >= 0.7 && e < 0.8) {
            setWindlast(2500)
        } else if (e >= 0.8 && e < 0.9) {
            setWindlast(2250);
        } else if (e >= 0.9 && e < 1.0) {
            setWindlast(2000)
        } else if (e >= 1 && e < 1.1) {
            setWindlast(1750)
        } else if (e > 1.1) {
            setWindlast(1500)
        }
    }
    $scope.calc_AgeomElem = function() {
        var ageom = (($scope.bfr - abzugB) * ($scope.hfr - abzugH - $scope.anz_choose * abzugLamHoe)) / 1000000
        var zwischageom = Math.round(ageom * 100) / 100
        $scope.AgeomElem = zwischageom + " m²";
        $scope.AgeomElem_Gesamt = (zwischageom * $scope.fens_anz).toFixed(2) + " m²";
    }
    $scope.calc_AeroElem = function() {
        var cv0;
        var blv = lam_breite / lam_hoehe;
        var klg;
        var blichte_aero = ($scope.bfr - 80) / 1000;
        var hlichte_aero = ($scope.hfr - 80) / 1000;
        var Av = blichte_aero * hlichte_aero;
        if ($scope.anz_choose < 6) {
            cv0 = 0.57
        } else if ($scope.anz_choose == 6 || $scope.anz_choose == 7) {
            cv0 = 0.56
        } else if ($scope.anz_choose > 7) {
            cv0 = 0.54
        }
        if (blv < 2) {
            klg = 0;
        } else if (blv >= 2 && blv < 4) {
            klg = -0.01;
        } else if (blv >= 4 && blv < 7) {
            klg = -0.02;
        } else if (blv >= 7) {
            klg = -0.03;
        }
        var calc_AeroElem_ = (Av * cv0 + klg).toFixed(2)
        $scope.AeroElem = calc_AeroElem_+ " m²";
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
    $scope.uw_calc = function() {
        var t = 1000;
        var r_oben_op = 2.3;
        var r_unten_op = 2.2;
        var r_seit_op = 2.7;
        var stoss_op = 2.2;
        var r_oben_mp = 2.0;
        var r_unten_mp = 1.9;
        var r_seit_mp = 2.3;
        var stoss_mp = 1.9;
        var r_oben_anzahl = 1;
        var r_unten_anzahl = 1;
        var r_seit_anzahl = 2;
        var stoss_anzahl = $scope.anz_choose - 1;
        var r_oben_breite = 70;
        var r_unten_breite = 70;
        var r_seit_breite = 70;
        var stoss_breite = 59;
        var r_oben_lange = $scope.bfr;
        var r_unten_lange = $scope.bfr;
        var r_seit_lange = $scope.hfr - r_oben_breite - r_unten_breite;
        var stoss_laenge = $scope.bfr - 2 * r_seit_breite;
        var r_oben_af = r_oben_breite / t * r_oben_lange / t;
        var r_unten_af = r_unten_breite / t * r_unten_lange / t;
        var r_seit_af = (r_seit_breite / t * r_seit_lange / t) * r_seit_anzahl;
        var stoss_af = (stoss_breite / t * stoss_laenge / t) * stoss_anzahl;
        var r_oben_ufxaf_op = r_oben_op * r_oben_af
        var r_unten_ufxaf_op = r_unten_op * r_unten_af;
        var r_seite_ufxaf_op = r_seit_op * r_seit_af;
        var stoss_ufxaf_op = stoss_op * stoss_af;
        var r_oben_ufxaf_mp = r_oben_mp * r_oben_af
        var r_unten_ufxaf_mp = r_unten_mp * r_unten_af;
        var r_seite_ufxaf_mp = r_seit_mp * r_seit_af;
        var stoss_ufxaf_mp = stoss_mp * stoss_af;
        var b_glas = $scope.bfr - 2 * r_seit_breite;
        var h_glas = ($scope.hfr - r_oben_breite - r_unten_breite - stoss_anzahl * stoss_breite) / $scope.anz_choose
        var ug_ = $scope.ug_c;
        var psie_ = $scope.randverbund;
        var glas_flaeche = (b_glas / t * h_glas / t) * $scope.anz_choose;
        var glas_umfang = (b_glas / 500 + h_glas / 500) * $scope.anz_choose;
        var ug_x_ag = ug_ * glas_flaeche;
        var psie_x_gu = psie_ * glas_umfang;
        var faenster_flaeche = $scope.bfr / t * $scope.hfr / t;
        var sum_op = r_oben_ufxaf_op + r_unten_ufxaf_op + r_seite_ufxaf_op + stoss_ufxaf_op;
        var sum_mp = r_oben_ufxaf_mp + r_unten_ufxaf_mp + r_seite_ufxaf_mp + stoss_ufxaf_mp;
        var uw_op = (ug_x_ag + psie_x_gu + sum_op) / faenster_flaeche;
        var uw_mp = (ug_x_ag + psie_x_gu + sum_mp) / faenster_flaeche;
        $scope.uw_op_s = Math.floor(uw_op * 10) / 10 + " W/m²K";
        $scope.uw_mp_s = Math.floor(uw_mp * 10) / 10 + " W/m²K";
    }
    $scope.$watch('anz_choose', function() {
        $scope.check_nrgw();
        $scope.init();
    });

    serialize = function(obj, prefix) {
      var str = [];
      for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(typeof v == "object" ?
            serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    }

    $scope.printCalc = function(){
        var calcItem = {
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
        }
        window.location.href = "/print/?"+ serialize(calcItem);
    }

}];