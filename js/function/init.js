var ismobile;
var istablet;
var menu_open_android=false;
var _is_firstTimeOOL = true;
var is_waiting=false;
var _is_alert=false;
var is_started=false;
var isIOS=false;
var isAndroid2=false;
var open_nav=false;
var moveContainer=false;
var espaceTouch=0;
var _header_nav_height= 0;
var _menu_height = 0;
var height_page=0;
var _my_date_to_quit = new Date();
var jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
var mois = new Array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
var getClickEvent = function() {return ('ontouchstart' in window) ? 'touchstart' : 'mousedown';};
var getOnClickEvent = function() {return ('ontouchstart' in window) ? 'ontouchstart' : 'onmousedown';};
var getOnMoveEvent = function() {return ('ontouchmove' in window) ? 'touchmove' : 'mousemove';};
var getOnMoveEndEvent = function() {return ('ontouchend' in window) ? 'touchend' : 'mouseup';};

if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Chrome/i))) isIOS = true;
if(navigator.userAgent.match(/Android/i)) isAndroid2 = true;
jembe.internet.listen(onOffline);

console.log(">---jembe.internet.status---<");
console.log(jembe.internet.status);


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("backbutton", showConfirm, false);
}

// process the confirmation dialog result
function onConfirm(button) {
    //alert('Vous avez appuyé sur le bouton ' + button);
    if (button == 1) 
    {
    	console.log('App close');
    	navigator.app.exitApp();
    }
    else 
    {
    	console.log('Windows close');
        window.close();
    }
}

function showConfirm() {
    navigator.notification.confirm(
        'Voulez-vous quitter l\'application ?',  // message
        onConfirm,            // fonction de callback appelée avec l'indice du bouton pressé
        'Quitter',            // titre
        ['Oui','Non']  // libellés des boutons
    );
}

$(document).ready(function () {
	ismobile = (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()));
	istablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
	jembe.settings.set({'param':'status-bar-style', 'value':'black-translucent'});
	jembe.alert.notify({'tickerText': 'Graffiti Urban Radio', 'contentTitle': 'Graffiti Urban Radio', 'contentText': '', 'flag': 'service'});
	jembe.control.listenState(minimizeAPI);
	//jembe.control.listenKey('4', chooseBackOptions, true);
	//jembe.control.listenKey('82', openMenuAndroid);

	$(document).bind('touchmove',function(e) {
		e.preventDefault();
	});

	if (jembe.internet.status=="NotReachable") onOffline();
	if (jembe.internet.status=="waiting") setTimeout(testConnexion,2000);

    _menu_height=($('#menu').height()+10);
    height_page=(window.innerHeight-_menu_height);
    _header_nav_height=($('#header .nav').height()+6);
    $('#container').css('height',height_page+'px');
    $('#header').css('top','-'+_header_nav_height+'px');
    $('.page').css('height',(height_page)+'px');

    $('#btn_android_footerHome').on(getClickEvent(), function() {
        jembe.control.quit();
    });
    $('#header .bottom').on('click', function() {
        Api.openNav();
    });
    $('#menu #direct').on(getClickEvent(), function() {
        Api.switchMenu('direct');
    });
    $('#menu #podcasts').on(getClickEvent(), function() {
        Api.switchMenu('podcasts');
    });
    $('#menu #videos').on(getClickEvent(), function() {
        Api.switchMenu('videos');
    });
    $('#menu #contact').on(getClickEvent(), function() {
        Api.switchMenu('contact');
    });
    $('#header #informations').on(getClickEvent(), function() {
        Api.switchMenu('informations');
    });
    $('#page_contact .c_telecharger').on(getClickEvent(), function() {
        $('#telechargerphoto').trigger('click');
    });

    $('#box_partage_direct .btn').on(getClickEvent(), function() {
        Direct.menuToggle();
    });

    $('#page_podcasts').swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
            console.log("You swiped " + direction );
            if(direction=='right') Podcasts.changeDate('moins');
            else if(direction=='left') Podcasts.changeDate('plus');
        },
        threshold: 130,
        allowPageScroll : 'vertical'
    });

    Flux.init();
    //Api.init();
	//Player.init();
    //Rater.init();
    //Podcasts.init();
    //Videos.init();
});


$(window).resize(function() {
    Api.update();
});

function minimizeAPI(newState) {
	if(newState=="resume") {
		// come back
	} else {
		_my_date_to_quit=(new Date()).getTime();
	}
}

/*function chooseBackOptions() {
	jembe.alert.show({
		message:'Voulez-vous quitter l\'application ?',
		onSuccess: onConfirmQuit,
		title:'alerte',
		buttons:'Non|Oui'
	});
}
function onConfirmQuit(button) {
	if (button==1) {
		jembe.control.quit();
	}
}*/

function openMenuAndroid() {
	if(menu_open_android) {
		$('#btn_android_footerHome').slideUp();
		menu_open_android=false;
	} else {
		$('#btn_android_footerHome').slideDown();
		menu_open_android=true;
	}
}

function testConnexion() {
	if (jembe.internet.status=="waiting") is_waiting=true;
	onOffline();
}

function onOffline() {
	if(jembe.internet.status == "Reachable") is_waiting=false;
	if(jembe.internet.status == "NotReachable" || is_waiting) {
		if (!_is_alert) {
			alert('La connexion est perdue. Veuillez vérifier l\'état du réseau.');
			_is_alert = true;
		}
		if (_is_firstTimeOOL) checkUpdates();
	} else {
		if (_is_firstTimeOOL) checkUpdates();
		_is_firstTimeOOL=false;
		_is_alert = false;
	}
}

function checkUpdates() {
	if (jembe.internet.status=="Reachable") {
		if (!is_started) {
            //direct
		}
	} else {
		if (!is_started) {
            // pas de pub
		}
	}
}

var getMouseY = function(e){
    if ('ontouchmove' in window) {
        //iOS & android
        mouseY = e.originalEvent.targetTouches[0].pageY;
        return mouseY;
    } else if(window.navigator.msPointerEnabled) {
        //Win8
        mouseY = e.originalEvent.targetTouches[0].pageY;
        return mouseY;
    } else {
        mouseY = e.pageY;
        return mouseY;
    }
}