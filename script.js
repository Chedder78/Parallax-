document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('sliding-menu');
    var overlay = document.getElementById('overlay');
    if (menu.style.left === '0px') {
        menu.style.left = '-250px';
        overlay.style.display = 'none';
    } else {
        menu.style.left = '0px';
        overlay.style.display = 'block';
    }
});

document.getElementById('overlay').addEventListener('click', function() {
    var menu = document.getElementById('sliding-menu');
    menu.style.left = '-250px';
    this.style.display = 'none';
});
