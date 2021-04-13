function MonoYariMamulMalKabul($scope, srv) {
    function InitObj() {
        $scope.BtnKasaDaraAl =
        {
            title: "Kasa Darası Al",
            onSelected: async function (pData) {
                if (typeof pData != 'undefined') {
                    $scope.LblKasaDara = (pData.substring(7, 12) / 1000).toFixed(3);
                }
            }
        }
        $scope.BtnManuelKasaDaraAl =
        {
            title: "Kasa Darası Elle Giriş",
            onSelected: async function (pData) {
                if (typeof pData != 'undefined') {
                    $scope.LblKasaDara = (pData.substring(7, 12) / 1000).toFixed(3);
                }
            }
        }
        $scope.CmbEtiketTasarim1 =
        {
            datasource:
            {
                data: $scope.Param.Mono.YariMamulMalKabulEtiket
            },
            key: "special",
            value: "name",
            defaultVal: "1",
            selectionMode: "key",
            return: "",
            onSelected: function (pSelected) {
                $scope.CmbEtiketTasarim.return = pSelected
            }
        }
    }
    function KantarVeriGetir() {
        var net = new WebTCP('localhost', 9999);

        options = { encoding: "utf-8", timeout: 0, noDelay: true, keepAlive: false, initialDelay: 0 }
        var socket = net.createSocket($scope.Param.Mono.BasarSayarKantarIP, $scope.Param.Mono.BasarSayarKantarPORT, options);
        socket.on('connect', function () { console.log('connected'); });

        socket.on('data', function (data) {
            if (data.includes("�,") && data.includes("kg")) {
                data = data.substring(
                    data.lastIndexOf("�,") + 1,
                    data.lastIndexOf("k")
                );
                $scope.LblKantarKilo = data.split(",   ").join("");
            }
        });

        socket.on('end', function (data) { console.log("socket is closed "); });
        socket.write("hello world");
    }
    function HassasTeraziVeriGetir() {
        var net = new WebTCP('localhost', 9999);

        options = { encoding: "utf-8", timeout: 0, noDelay: true, keepAlive: false, initialDelay: 0 }
        var socket = net.createSocket($scope.Param.Mono.BasarSayarHasasTeraziIP, $scope.Param.Mono.BasarSayarHasasTeraziPORT, options);
        socket.on('connect', function () { console.log('connected'); });

        socket.on('data', function (data) {
            if (data.includes("�,") && data.includes("kg")) {
                data = data.substring(
                    data.lastIndexOf("�,") + 1,
                    data.lastIndexOf("k")
                );
                $scope.LblHassasGram = data.split(",   ").join("");
            }
        });

        socket.on('end', function (data) { console.log("socket is closed "); });
        socket.write("hello world");
    }
    $scope.Init = function () {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));

        $scope.LblKasaDara = 0;

        $scope.TxtSpRefMiktar = 0;
        $scope.LblHassasGram = 0;
        $scope.LblKantarKilo = 0;
        $scope.LblKantarMiktar = 0;
        $scope.DataKantarKilo = 0;
        $scope.DataHassasTeraziGram = 0;

        InitObj();
        HassasTeraziVeriGetir();
        KantarVeriGetir();
    }
    $scope.BtnTartimOnayla = function () {
        $scope.DataHassasTeraziGram = $scope.LblHassasGram;
        $scope.DataKantarKilo = $scope.LblKantarKilo;

        $scope.LblKantarMiktar = (($scope.TxtSpRefMiktar / ($scope.DataHassasTeraziGram / 1000)) * $scope.DataKantarKilo).toFixed(2);
    }
}