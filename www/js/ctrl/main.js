function Main($scope,$state,srv)
{
    $scope.Init = function()
    {
        Menu();
        if(srv.SocketConnected)
        {
            srv.Emit('GetMenu','',function(MenuData)
            {
                let TmpHtml = "";
                let TmpMenu = JSON.parse(MenuData).Menu.Item;
                for (let i = 0; i < TmpMenu.length; i++) 
                {
                    TmpHtml += '<li class="nav-item dropdown">'
                    TmpHtml += '<a class="nav-link dropdown-toggle yaziayari" href="#" data-toggle="dropdown"><i class="fa fa-bars" aria-hidden="true"></i> ' + TmpMenu[i].Name +  '</a>'
                    
                    TmpHtml += '<ul class="dropdown-menu">'
                    for (let m = 0; m < TmpMenu[i].Item.length; m++) 
                    {
                        TmpHtml += '<li><a class="dropdown-item" href="' + TmpMenu[i].Item[m].Link +'">' + TmpMenu[i].Item[m].Name +'</a>'
                    }
                    TmpHtml += '</ul></li></li>'
                }
                $('#Menu').html(TmpHtml)
            })
        }
    }
    
    function Menu()
    {
        $(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
        });

        if ($(window).width() < 992) {
            $('.dropdown-menu a').click(function(e){
                e.preventDefault();
                if($(this).next('.submenu').length){
                    $(this).next('.submenu').toggle();
                }
                $('.dropdown').on('hide.bs.dropdown', function () {
                $(this).find('.submenu').hide();
                })
            });
        }
        
    }
}