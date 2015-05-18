Direct = {

    _open_menu : false,

    _box_titre : $('#box_titre_direct'),

    _box_partage : $('#box_partage_direct'),
	
	_url_direct : '',
	
	_meta : '',

	init : function() {
		this._url_direct = Flux._frap_flux.ws_meta_direct;
        jembe.http.get({url:Direct._url_direct, onSuccess:Direct.callback_direct, onError:Direct.callaback_error});
	},

	callback_direct : function(msg) {
		eval('Direct._meta = '+msg);
		
		
		Direct.showTitle();
		
	},

    /*menuToggle : function() {
        if(!this._open_menu) {
            //ouvert
            //this._box_titre.html('');
            this._box_titre.animate({'left':'95%'},400);
            this._box_partage.animate({'left':'0%'},400);
            this._box_partage.find('.btn').html('-');
        } else {
            //fermer
            //this._box_titre.html(this.showTitle());
            this._box_titre.animate({'left':'5%'},400);
            this._box_partage.animate({'left':'-90%'},400);
            this._box_partage.find('.btn').html('+');
        }
        this._open_menu = !this._open_menu;
    },*/

    showTitle : function() {
        var meta = '<table width="100%" height="80" cellpadding="0" celcspacing="0" border="0"><tr><td><div>'+Direct._meta.nodes[1].node.title+'</div><div></div><div>'+Direct._meta.nodes[1].node.field_artiste+'<br />'+Direct._meta.nodes[1].node.field_image_album+'</div></td></tr></table>';
		console.log('title = '+meta)
		$('#box_titre_direct').html(meta);
        $('#player_picture').html('<img src="'+Direct._meta.nodes[1].node.field_image+'" border="0" height="158">');       
        //return title;
    }



}