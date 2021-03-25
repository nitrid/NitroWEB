angular.module('app.srv', []).service('srv',function($rootScope)
{
    let _Socket = null;
    let _MenuData = {};

    this.SocketConnected = false;
    this.Connection = _Connection;
    this.Execute = _Execute;
    

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
    function _Execute(pFirma)
    {
        console.log(pFirma)
    }
    function _Execute(pQuery,pParam)
    {
        console.log(pQuery + pParam)
    }
});