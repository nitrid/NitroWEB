angular.module('app.srv', []).service('srv',function($rootScope)
{
    moment.locale('tr')
    let _Socket = null;
    
    this.SocketConnected = false;
    this.Connection = _Connection;
    this.Execute = _Execute;
    
    this.SafeApply = function(pScope,pFn) 
    {
        if(pScope.$root.$$phase != null)
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
                    if (typeof(MenuData) == "undefined")
                    {
                        _Socket.disconnect();
                        console.log('Giremezsin !');
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
                            swal("Hata !","Parametre değerlerinde problem oluştu ! ",icon="error");    
                            resolve();
                        }
                    }
                }
                /********************************************************** */
                $('#loading').show()              
                _Socket.emit('QMikroDb', TmpQuery, function (data) 
                {
                    $('#loading').hide()  
                    if(typeof(data.result.err) == 'undefined')
                    {
                        resolve(data.result.recordset)
                    }
                    else
                    {     
                        swal("Hata !","Mikro Sql Query Çalıştırma Hatası : " + data.result.err,icon="error");                 
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