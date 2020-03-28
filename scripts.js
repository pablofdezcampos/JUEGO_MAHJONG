
    let menuBtn = document.getElementsByClassName('menu-icon')[0];
    let submenuButton = document.getElementById('submenuButton');
    let menu = document.getElementsByClassName('navigation')[0];
    let subMenu = document.getElementsByClassName('submenu')[0];


    menuBtn.addEventListener('click',function(){
        if (menu.classList.contains('show')) {
            menu.classList.remove('show')
        }else{
            menu.classList.add('show');
        }
    });

    submenuButton.addEventListener('click', function(){
        if (subMenu.classList.contains('hide')) {
            subMenu.classList.remove('hide')
        } else {
            subMenu.classList.add('hide');
        }
    });
    