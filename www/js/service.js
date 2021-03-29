angular.module('app.srv', []).service('srv',function($rootScope)
{
    let _Socket = null;
    let _MenuData = {};
    
    this.SocketConnected = false;
    this.Connection = _Connection;
    this.Execute = _Execute;
    
    this.SafeApply = function(pScope,pFn) 
    {
        var phase = pScope.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') 
        {
          if(pFn && (typeof(pFn) === 'function')) 
          {
            pFn();
          }
        } else 
        {
            pScope.$apply(pFn);
        }
    };     
    this.On = function(eventName,callback)
    {   
        _Socket.on(eventName, function(data) 
        {   
            var args = arguments;
            $rootScope.$apply(function()
            {   
                callback.apply(_Socket, args);
            });
        });
    }
    this.Emit = function(eventName,data,callback)
    {        
        _Socket.emit(eventName, data, function () 
        {
            var args = arguments;
            $rootScope.$apply(function () 
            {
                if (callback) 
                {
                  callback.apply(_Socket, args);
                }
            });
        });
    }
    function _Connection()
    {
        return new Promise(resolve => 
        {
            if(_Socket == null || _Socket.connected == false)
            {
                _Socket = io.connect(window.location.origin,{autoConnect: false,reconnectionDelay:10});
                _Socket.open();

                _Socket.on('MaxUserCounted',function(MenuData)
                {               
                    if (typeof(MenuData) !== "undefined")
                    {
                        _MenuData = MenuData;
                    }
                    else
                    {
                        _Socket.disconnect();
                    
                        $('#alert-box').html('<div class="alert alert-icon alert-danger alert-dismissible" role="alert" id="alert">' +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '<i class="icon wb-bell" aria-hidden="true"></i> Maksimum kullanıcı sayısına eriştiniz... Diğer kullanıcılardan çıkınız ya da ek lisans satın alınız.' +
                            '</div>');
                    }
                });

                _Socket.on('connect',(data) => 
                {
                    this.SocketConnected = true;
                    resolve(true);  
                });
                _Socket.on('connect_error',(error) => 
                {
                    this.SocketConnected = false;                    
                    console.log('connect_error');

                    resolve(false);
                });
                _Socket.on('error', (error) => 
                {
                    this.SocketConnected = false;
                    resolve(false);
                });
            }
            else
            {
                this.SocketConnected = true;
                resolve(true); 
            }
        });
    }
    function _Execute()
    {
        return new Promise(resolve => 
        {
            let TmpQuery;

            if(_Socket.connected)
            {
                if(arguments.length == 1)
                {
                    TmpQuery = arguments[0];
                }
                else if(arguments.length > 1)
                {
                    TmpQuery = window["Query"][arguments[1]];
                    TmpQuery.value = arguments[2];
                    TmpQuery.db = '{M}.' + arguments[0];
                }
                else
                {
                    resolve();
                }    

                //PARAMETRE UNDEFINED KONTROLÜ (17.07.2020 - ALI KEMAL KARACA)
                if(typeof(TmpQuery.value) != 'undefined')
                {
                    for (let i = 0; i < TmpQuery.value.length; i++) 
                    {
                        if(typeof TmpQuery.value[i] == 'undefined')
                        {
                            //$rootScope.MessageBox("Parametre değerlerinde problem oluştu ! "); 
                            resolve();
                        }
                    }
                }
                /********************************************************** */
                //$rootScope.LoadingShow();                
                _Socket.emit('QMikroDb', TmpQuery, function (data) 
                {
                    //$rootScope.LoadingHide();
                    if(typeof(data.result.err) == 'undefined')
                    {
                        resolve(data.result.recordset)
                    }
                    else
                    {     
                        //$rootScope.MessageBox(data.result.err);                 
                        console.log("Mikro Sql Query Çalıştırma Hatası : " + data.result.err);
                        resolve()
                    }
                });
            }
            else
            {
                console.log("Server Erişiminiz Yok.");
            }
            
        });
    }
});