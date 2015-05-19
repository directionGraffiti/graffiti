Direct = {

    _open_menu : false,

    _box_titre : $('#box_titre_direct'),

    _box_partage : $('#box_partage_direct'),
	
	_url_direct : '',
	
	_meta : '',

	init : function() {
		this._url_direct = Flux._frap_flux.ws_meta_direct;
       
		$.ajax
		({
			url: Direct._url_direct, 		
			method: 'GET',
			dataType: 'json',
			success: function(data) 
			{
				Direct._meta = data;
				Direct.showTitle();
			},
			error: function() 
			{
				console.log('********************************************* Direct.callback_error=');
				//$('#box_titre_direct').html('DATA Direct indisponible !');
				//$('#player_picture').html('<img src="images/sun-radio-logo.png" border="0" height="158">');
			}
		});
	},


    showTitle : function() {
        var meta = '<table width="100%" height="80" cellpadding="0" celcspacing="0" border="0"><tr><td><div>'+Direct._meta.nodes[1].node.title+'</div><div></div><div>'+Direct._meta.nodes[1].node.field_artiste+'<br />'+Direct._meta.nodes[1].node.field_image_album+'</div></td></tr></table>';
		console.log('title = '+meta)
		$('#box_titre_direct').html(meta);
        $('#player_picture').html('<img src="'+Direct._meta.nodes[1].node.field_image+'" border="0" height="158">');       
        //return title;
    }

}