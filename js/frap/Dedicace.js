Dedicace = {

    _url_get_hour : 'http://80.82.229.204/dedicace/selection_auditeur/selecteur_heures.php',

    _url_get_min : 'http://80.82.229.204/dedicace/selection_auditeur/selecteur_minutes.php',

    _url_get_list : 'http://80.82.229.204/dedicace/selection_auditeur/recherche_creation_tableau.php',

    _url_get_info : 'http://80.82.229.204/dedicace/selection_auditeur/traitement_musiqueEnAvant.php',

    _url_send_dedicace : 'http://80.82.229.204/dedicace/selection_auditeur/validation.php',

    _list_days : new Array('Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'),

    _list_month : new Array('Jan','Fév','Mars','Avr','Mai','Juin','Juil','Août','Sept','Oct','Nov','Déc'),

    _today : new Date(),

    _json_hour : '',

    _json_min : '',

    _json_list : '',

    _json_info : '',

    _json_adressbook : '',

    _select_hour : '',

    _select_min : '',

    _select_day : '',

    _line_open : '',

    _num_of_tel : 0,

    _num_of_tel_max : 5,

    _num_line_adressbook : 1,

    _current_dedicace_play : -1,

    _search_open : false,

    _search_words : '',

    _id_music : 0,

    init : function() {
        if(Dedicace._select_hour) {
            Dedicace._select_hour.destroy();
            Dedicace._select_min.destroy();
        }
        Dedicace._select_hour = new CardView('#wrapperH', {
            effect: 'rotate',
            direction: 'h',
            //startPage: Dedicace._today.getHours(),
            dataset: Dedicace._json_hour,
            onUpdateContent: function (el, data) {
                el.querySelector('div').innerHTML = data.heures+'H';
                console.log('test test');

                Dedicace.changeMinutes();
                //console.log('data.heures = '+ data.heures);
                //console.log('currCard = '+ this.currCard);
                //console.log('*********************');
            }
        });
        Dedicace._select_min = new CardView('#wrapperM', {
            effect: 'rotate',
            direction: 'h',
            //startPage: Math.ceil((Dedicace._today.getMinutes())/5),
            dataset: Dedicace._json_min,
            onUpdateContent: function (el, data) {
                el.querySelector('div').innerHTML = data.minutes+'MIN';
            }
        });
    },

    launch : function() {
        Api.switchMenu('dedicace');
        //this.displayHourAvailable();
        $('#step1').css('display','block');
        $('#step2, #step3').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
        Api._scrollPage_Dedicace.refresh();
    },

    changeMinutes : function() {
        var h=0;
        if(Dedicace._select_hour.nextCard>0) h=$('#wrapperH ul#deck li:nth-child('+Dedicace._select_hour.nextCard+')').find('div').html();
        else h=$('#wrapperH ul#deck li:last-child').find('div').html();
        h=substr(h,0,-1);
        Dedicace._today.setHours(h);
        jembe.http.post({
            url: Dedicace._url_get_min,
            data: 'jour='+Dedicace.returnTimeStamp()+'&heures='+Dedicace._today.getHours(),
            onSuccess: Dedicace.callback_minute_change,
            onError: Dedicace.callback_error
        });
    },

    callback_minute_change : function(msg) {
        eval('Dedicace._json_min = '+msg);
        Dedicace._select_min.destroy();
        Dedicace._select_min = new CardView('#wrapperM', {
            effect: 'rotate',
            direction: 'h',
            //startPage: Math.ceil((Dedicace._today.getMinutes())/5),
            dataset: Dedicace._json_min,
            onUpdateContent: function (el, data) {
                el.querySelector('div').innerHTML = data.minutes+'MIN';
            }
        });
    },

    displayMinuteAvailable : function() {
        jembe.http.post({
            url: Dedicace._url_get_min,
            data: 'jour='+Dedicace.returnTimeStamp()+'&heures='+Dedicace._today.getHours(),
            onSuccess: Dedicace.callback_minute,
            onError: Dedicace.callback_error
        });
    },

    callback_minute : function(msg) {
        eval('Dedicace._json_min = '+msg);
        Dedicace.init();
    },

    displayHourAvailable : function() {
        jembe.http.post({
            url: Dedicace._url_get_hour,
            data: 'valeur='+Dedicace.returnTimeStamp(),
            onSuccess: Dedicace.callback_hour,
            onError: Dedicace.callback_error
        });
    },

    callback_error : function(msg) {
        console.log('Error hour or min function = '+msg);
    },

    callback_hour : function(msg) {
        eval('Dedicace._json_hour = '+msg);
        Dedicace.displayMinuteAvailable();
    },

    selectDay : function(p_param) {
        this._select_day=p_param;
        if(this._select_day=='tomorrow'){
            Dedicace._today = null;
            Dedicace._today = new Date();
            Dedicace._today.setTime(Dedicace._today.getTime()+86400000);
        } else {
            Dedicace._today = null;
            Dedicace._today = new Date();
        }

        $('#step1').css('display','none');
        $('#step1bis').fadeIn(function() {
            $('#datetime').html(Dedicace.returnDayString());
        });
        this.displayHourAvailable();
    },

    returnDayString : function() {
        var content ='';
        content += Dedicace._list_days[Dedicace._today.getDay()]+' ';
        content += Dedicace._today.getDate()+' ';
        content += Dedicace._list_month[Dedicace._today.getMonth()];

        return content;
    },

    returnTimeString : function() {
        var content ='';
        content += ((Dedicace._today.getHours()<10)? '0':'')+Dedicace._today.getHours();
        content += ':';
        content += ((Dedicace._today.getMinutes()<10)? '0':'')+Dedicace._today.getMinutes();

        return content;
    },

    returnTimeStamp : function() {
        return Math.ceil(Dedicace._today.getTime()/1000);
    },

    valideDedicace : function() {
        var h=0;
        var m=0;

        if(Dedicace._select_hour.nextCard>0) h=$('#wrapperH ul#deck li:nth-child('+Dedicace._select_hour.nextCard+')').find('div').html();
        else h=$('#wrapperH ul#deck li:last-child').find('div').html();
        h=substr(h,0,-1);
        if(Dedicace._select_min.nextCard>0) m=$('#wrapperM ul#deck li:nth-child('+Dedicace._select_min.nextCard+')').find('div').html();
        else m=$('#wrapperM ul#deck li:last-child').find('div').html();
        m=substr(m,0,-3);

        console.log('*********************** '+h+'h '+m+'min');

        Dedicace._today.setHours(h);
        Dedicace._today.setMinutes(m);

        $('#step1bis').css('display','none');
        $('#step2').fadeIn();
        $('.seach-dedicace .champs').fadeOut();
        $('#step2').html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');

        jembe.http.post({
            url: Dedicace._url_get_list,
            data: 'artiste=&chaine_recherche='+Dedicace._search_words+'&dateheure='+Dedicace._today.getTime()+'&mode=',
            onSuccess: Dedicace.callback_selectDay,
            onError: Dedicace.callback_error
        });
    },

    callback_selectDay : function(msg) {
        try {
			eval('Dedicace._json_list = '+msg);
			//console.log('Dedicace._json_list.length'+Dedicace._json_list.length);
        	Dedicace.displayTitles();
		} catch(e) {
	        jembe.alert.show({
	            buttons : 'Envoyer un email|Annuler',
	            onSuccess : Dedicace.callback_select_options
	        });
		}
    },

	callback_select_options : function(button) {
	    if (button==0) {
			Api.switchMenu('contact');
		} else {
			console.log('retour à la liste')
			Dedicace.valideDedicace()
		}
    
	},

    displayTitles : function() {
        var content ='';
        content += ' <table cellpadding="0" cellspacing="0" border="0" class="table-dedicace">' +
                    '<tr>' +
                        '<td class="title">' +
                            'sélectionner<br />votre titre<br /><span id="datetime2"></span>' +
                            '<div class="fs1" aria-hidden="true" onclick="Dedicace.backStep1();" data-icon="&#xe136;"></div>' +
                            '<div class="seach-dedicace">' +
                                '<div class="champs"><input type="text" value="" placeholder="Recherche" id="input_recherche" /></div>' +
                                '<div class="button" aria-hidden="true" data-icon="&#xe07f;" onclick="Dedicace.launch_search();"></div>' +
                            '</div>' +
                        '</td>' +
                    '</tr>';
        for(var i=0;i<Dedicace._json_list.length;i++) {
            content +=  '<tr>'+
                            '<td class="line-artiste" onclick="Dedicace.openLineArtiste('+i+');">' +
                                '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="background-color: '+Dedicace._json_list[i].background_color+';">' +
                                    '<tr>' +
                                        '<td valign="top" width="60">' +
                                            '<div style="position:relative;" id="btn_play_pause_dedicace_'+i+'">' +
                                                '<div>'+Dedicace._json_list[i].element_image+'</div>';
            if (Dedicace._json_list[i].extrait_audio!='')
            content +=                          '<div class="play" onclick="Dedicace.play('+i+')"><img src="images/player/play.png" /></div>'+
                                                '<div class="pause" onclick="Dedicace.pause('+i+')"><img src="images/player/pause.png" /></div>';
            content +=                      '</div>' +
                                            '<div class="line_play_dedicace" id="line_'+i+'_play_dedicace"><div class="timer_dedicace"></div></div>' +
                                        '</td>' +
                                        '<td valign="top">' +
                                            '<strong style="text-transform:uppercase;">'+Dedicace._json_list[i].artiste+' - '+Dedicace._json_list[i].titre+'</strong><br /><small>'+Dedicace._json_list[i].fld_next_available+'</small>' +
                                        '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                        '<td colspan="2">' +
                                            '<div id="line-artiste-'+i+'" style="display:none;">' +
                                                '<div>Album : '+Dedicace._json_list[i].album+'</div>' +
                                                '<div><em>'+Dedicace._json_list[i].annee+' - '+Dedicace._json_list[i].duree+'</em></div>' +
                                                '<div class="popularite">'+Dedicace._json_list[i].popularite+'</div>' +
                                                '<div>' +
                                                    '<a href="javascript:" onclick="Dedicace.dedicacer('+Dedicace._json_list[i].id_musique+');"><span class="fs1" aria-hidden="true" data-icon="&#xe008;"></span> dédicacer</a>' +
                                                    //((Dedicace._json_list[i].extrait_audio!='') ? '<a href="javascript:" onclick="Dedicace.playPause('+i+');" class="playPause" id="btn_playpause_'+i+'"><span class="fs1" aria-hidden="true" data-icon="&#xe105;"></span></a><a href="javascript:" class="playPause"  onclick="Dedicace.stop('+i+');Player.playDirect()"><img src="images/player/refresh.png" border="0" height="30"></a>' : '')+
                                                '</div>' +
                                            '</div>' +
                                        '</td>' +
                                    '</tr>' +
                                '</table>' +
                            '</td>'+
                        '</tr>';
        }

        content += '</table>';

        $('#step2').html(content);
        $('#datetime2').html(Dedicace.returnDayString()+' à '+Dedicace.returnTimeString());
        Api._scrollPage_Dedicace.refresh();
    },
	
	stop : function(p_id) {
        console.log('****************************************** stop ='+p_id);
		$('#line_'+p_id+'_play_dedicace').fadeOut();
        $('#btn_play_pause_dedicace_'+p_id).find('.pause').css('display','none');
        $('#btn_play_pause_dedicace_'+p_id).find('.play').css('display','block');
        Dedicace._current_dedicace_play=-1;
	},

    play : function(p_id) {
        console.log('-------------------------------------------------------------------***********'+Dedicace._current_dedicace_play+'!='+p_id);
        if(Dedicace._current_dedicace_play!=p_id) {
            Dedicace.stop(Dedicace._current_dedicace_play);
        }
        $('#line_'+p_id+'_play_dedicace').fadeIn().find('.timer_dedicace').css('width','0%').stop().animate({'width':'100%'},31000);
        $('#btn_play_pause_dedicace_'+p_id).find('.pause').css('display','block').delay(31000).fadeOut();
        $('#btn_play_pause_dedicace_'+p_id).find('.play').css('display','none').delay(31000).fadeIn(function() {
            //$(this).css('display','block');
            //Dedicace._current_dedicace_play='-1';
            //$('#line_'+p_id+'_play_dedicace').fadeOut();
            if(Dedicace._current_dedicace_play==p_id) {
                Dedicace.stop(p_id);
                Player.player.pause();
            }
        });
        Player.player.aod({
            'track_url': Dedicace._json_list[p_id].extrait_audio,
            'time_end': getTimeStamp()+10000,
            'time_start': getTimeStamp()
        });
        Dedicace._current_dedicace_play=p_id;
    },

    pause : function(p_id) {
        Player.refresh_status('dedicace');
        Player.player.pause();
        Dedicace.stop(p_id);
    },

    playPause : function(p_id) {
        console.log('playPause function');
		Player.refresh_status('dedicace');
        if(Dedicace._current_dedicace_play==p_id) {
            //pause
            console.log('pause dedicace');
            Dedicace.stop(p_id);
        } else {
            //play
            $('#line_'+p_id+'_play_dedicace').fadeIn().find('.timer_dedicace').css('width','0%').stop().animate({'width':'100%'},31000);
            $('#btn_playpause_'+p_id).html('<span class="fs1" aria-hidden="true" data-icon="&#xe107;"></span>').delay(31000).fadeIn(function() {
                $(this).html('<span class="fs1" aria-hidden="true" data-icon="&#xe105;"></span>');
                Dedicace._current_dedicace_play='-1';
                $('#line_'+p_id+'_play_dedicace').fadeOut();
            });
            Player.player.aod({
                'track_url': Dedicace._json_list[p_id].extrait_audio,
                'time_end': getTimeStamp()+10000,
                'time_start': getTimeStamp()
            });
            Dedicace._current_dedicace_play=p_id;
        }
    },

    openLineArtiste : function(p_num) {
        if(this._line_open!=='' && this._line_open!==p_num) $('#line-artiste-'+this._line_open).slideUp();
        this._line_open=p_num;
        $('#line-artiste-'+this._line_open).slideDown(function() {
            Api._scrollPage_Dedicace.refresh();
        });
    },

    launch_search : function() {
        if(this._search_open) {
            // lance la recherche
            Dedicace._search_words=$('#input_recherche').val();
            this.valideDedicace();
            this._search_open=false;
        } else {
            $('.seach-dedicace .champs').toggle();
            this._search_open=true;
        }
    },

    backStep1 : function() {
        $('#step3').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
        $('#step2').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
        $('#step1bis').fadeOut();
        $('#step1').fadeIn(function() {
            Api._scrollPage_Dedicace.refresh();
        });
    },

    backStep2 : function() {
        $('#step3').fadeOut().html('<div align="center"><img src="images/player/301.gif" border="0" width="50" /></div>');
        $('#step2').fadeIn(function() {
            Api._scrollPage_Dedicace.refresh();
        });
    },

    dedicacer :function(p_id) {
        $('#step2').css('display','none');
        $('#step3').fadeIn();

        Dedicace._id_music=p_id;

        jembe.http.post({
            url: Dedicace._url_get_info,
            data: 'id='+p_id,
            onSuccess: Dedicace.callback_dedicacer,
            onError: Dedicace.callback_error
        });
    },

    callback_dedicacer : function(msg) {
        console.log('callback_dedicacer');
        eval('Dedicace._json_info = '+msg);
        console.log(Dedicace._json_info);

        var content = ' <table cellpadding="0" cellspacing="0" border="0" class="table-dedicace">' +
                    '<tr>' +
                        '<td class="title">' +
                            'dédicacer<br /><span id="datetime3"></span>' +
                            '<div class="fs1" aria-hidden="true" onclick="Dedicace.backStep2();" data-icon="&#xe136;"></div>' +
                        '</td>' +
                    '</tr>';

        content +=  '<tr>' +
                        '<td class="line-artiste">' +
                            '<table width="100%" cellpadding="5" cellspacing="0" border="0">' +
                                '<tr>' +
                                    '<td valign="top" width="100"><img src="'+Dedicace._json_info[0].chemin_image+'" border="0" width="95" height="95" /></td>' +
                                    '<td valign="top">' +
                                        ''+Dedicace._json_info[0].artiste+' - '+Dedicace._json_info[0].titre+'<br /><small>'+Dedicace._json_info[0].duree+'</small>' +
                                        '<div>Album : '+Dedicace._json_info[0].album+'</div>' +
                                        '<div>'+Dedicace._json_info[0].annee+'</div>' +
                                        '<div><a href="'+Dedicace._json_info[0].lien_achat+'" target="_blank">Acheter le morceau</a></div>' +
                                    '</td>' +
                                '</tr>' +
                            '</table>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td>' +
                            '<textarea placeholder="Taper votre message">dédicace '+Dedicace._json_info[0].titre+' de '+Dedicace._json_info[0].artiste+'</textarea>' +
                        '</td>' +
                    '<tr>' +
                        '<td class="line-artiste">' +
                            '<div id="retour_phone_number"></div>' +
                            '<table width="100%" cellpadding="5" cellspacing="0" border="0">' +
                                '<tr>' +
                                    '<td valign="top">' +
                                        '<div><a href="javascript:" onclick="Dedicace.choseInAdressBook();" class="add_phone">Ajouter un numéro de téléphone</a></div>' +
                                        '<div><a href="javascript:" onclick="Dedicace.sendDedicace();" class="send">envoyer ma dédicace</a></div>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>'+
                                    '<td valign="top">Partager : <a href="#" class="facebook"><span aria-hidden="true" class="icon-facebook"></span> facebook</a> <a href="#" class="twitter"><span aria-hidden="true" class="icon-twitter"></span> twitter</a></td>' +
                                '</tr>' +
                            '</table>' +
                        '</td>' +
                    '</tr>';

        content += '</table>';

        $('#step3').html(content).fadeIn(function() {
            $('#datetime3').html(Dedicace.returnDayString()+' à '+Dedicace.returnTimeString());
            Api._scrollPage_Dedicace.refresh();
        });
    },

    choseInAdressBook : function() {
        console.log('choseInAdressBook');
        jembe.addressbook.search({
            onSelected : Dedicace.callback_addressbook,
            onCancel : Dedicace.callback_error_addressbook
        });
    },

    callback_addressbook : function(msg) {
        //console.log('callback_addressbook');
        Dedicace._json_adressbook = msg;
        Dedicace._num_of_tel++;
        Dedicace._num_line_adressbook++;
	    //alert(JSON.stringify(msg));
        var content =   '<div id="line_addressbook_'+Dedicace._num_line_adressbook+'" style="padding:5px;background:#fff;margin-bottom:2px;">' +
                            '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
                                '<tr>' +
                                    '<td>' +
                                        '<div>'+Dedicace._json_adressbook.firstname+' '+Dedicace._json_adressbook.lastname+'</div>' +
                                        '<div><input type="text" value="'+Dedicace._json_adressbook.phone+'" id="phone_number_'+Dedicace._num_of_tel+'" readonly="readonly"  /></div>' +
                                    '</td>' +
                                    '<td align="center" width="30" onclick="Dedicace.delete_adressbook('+Dedicace._num_line_adressbook+');"><a href="javascript:" data-icon="&#xe0fd;"></a></td>' +
                                '</tr>' +
                            '</table>' +
                        '</div>';

        if(Dedicace._num_of_tel<=Dedicace._num_of_tel_max) $('#retour_phone_number').append(content);
        if(Dedicace._num_of_tel==Dedicace._num_of_tel_max) {
            $('a.add_phone').css('display','none');
            alert('Vous avez atteint le nombre maximal de numéro téléphone!');
        }
        Api._scrollPage_Dedicace.refresh();
    },

    callback_error_addressbook : function(msg) {
        console.log('cancel adressbook ='+msg);
    },

    delete_adressbook : function(p_id) {
        Dedicace._num_of_tel--;
        $('a.add_phone').css('display','block');
        $('#line_addressbook_'+p_id).remove();
    },

    sendDedicace : function() {
        console.log('nb de tel : '+Dedicace._num_of_tel);

        jembe.http.post({
            url: Dedicace._url_send_dedicace,
            data: 'date_recherche='+Dedicace._today.getTime()+'&dedicaceOuiNom=oui&id='+Dedicace._id_music+'&nom=&telephone1=&telephone2=&telephone3=&telephone4=&telephone5=',
            onSuccess: Dedicace.callback_sendDedicace,
            onError: Dedicace.callback_error
        });
    },

    callback_sendDedicace : function(msg) {
        alert('Nous avons bien reçu votre Dédicace !');
        Dedicace.backStep1();
    }

}
