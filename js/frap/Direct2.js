Direct = {

    _open_menu : false,

    _box_titre : $('#box_titre_direct'),

    _box_partage : $('#box_partage_direct'),
	
	_url_direct : '',
	
	_meta : '',
	
	_intervalle : '',

    _current_direct : '',

	init : function() {
		this._url_direct = Flux._frap_flux.ws_meta_direct;
		Direct.refreshData();
		if (Direct._intervalle) clearInterval(Direct._intervalle);
		Direct._intervalle = setInterval(Direct.refreshData,5000);
	},

	refreshData : function() {
		$.ajax
		({
			url: Direct._url_direct, 		
			method: 'GET',
			dataType: 'json',
			success: function(data) 
			{
				Direct._meta = data;
				if(Direct._current_direct != Direct._meta.current.title) {
					Direct._current_direct = Direct._meta.current.title;
					console.log('Show title');
					Direct.showTitle();
				}
			},
			error: function() 
			{
				console.log('********************************************* Direct.callback_error=');
			}
		});
		
		//jembe.http.get({url:Direct._url_direct, datatype_demande:'json', onSuccess:Direct.callback_direct, onError:Direct.callaback_error});		
	},


	callback_direct : function(msg) {
        try {
            //console.log('********************************************* Direct.callback_direct='+msg);
            Direct._meta = '';
            eval('Direct._meta = '+msg);
            //console.log('typeof(Direct._meta)='+typeof(Direct._meta)+', '+Direct._meta.current.title);
            //alert('Direct._meta.current.length = '+Direct._meta.current.length);
            if(Direct._current_direct != Direct._meta.current.title) {
                Direct.showTitle();
                Direct._current_direct = Direct._meta.current.title;
            }
        } catch(e) {
            console.log('********************************************* erreur eval callback ='+e);
        }
	},

    callaback_error : function(msg) {
        console.log('********************************************* Direct.callback_error='+JSON.stringify(msg));
        $('#box_titre_direct').html('DATA Direct indisponible !'+msg);
        $('#player_picture').html('<img src="images/sun-radio-logo.png" border="0" height="158">');
    },

    menuToggle : function() {
        if(!this._open_menu) {
            //ouvert
            //this._box_titre.html('');
            this._box_titre.animate({'left':'100%'},400);
            this._box_partage.animate({'left':'0%'},400);
            this._box_partage.find('.btn').html('-');
            this._box_partage.parent().addClass('open');
        } else {
            //fermer
            //this._box_titre.html(this.showTitle());
            this._box_titre.animate({'left':'10%'},400);
            this._box_partage.animate({'left':'-90%'},400);
            this._box_partage.find('.btn').html('+');
            this._box_partage.parent().removeClass('open');
        }
        this._open_menu = !this._open_menu;
    },

    showTitle : function() {
		var meta = '<table width="100%" height="80" cellpadding="0" celcspacing="0" border="0"><tr><td><div>'+Direct._meta.nodes[1].node.title+'</div><div></div><div>'+Direct._meta.nodes[1].node.field_artiste+'<br />'+Direct._meta.nodes[1].node.field_image_album+'</div></td></tr></table>';
		console.log('title = '+meta)
		$('#box_titre_direct').html(meta);
        $('#player_picture').html('<img src="'+Direct._meta.nodes[1].node.field_image+'" border="0" height="158">');       
        //return title;
    },

}