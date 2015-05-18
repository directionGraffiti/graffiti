Flux = {

    _url_flux : 'http://www.urban-radio.com/appli/graffiti.js',//http://80.82.229.204/datasun/bocetoplayer/frap.js',

    _frap_flux : '',

    init : function() {
        this.getFlux();
    },

    getFlux : function() {
		$.ajax({ 
			type: 'GET',
			url: Flux._url_flux,
			timeout: 3000,
			dataType:'json',
			success: function(data) {
				Flux._frap_flux = data;
				if(Flux._frap_flux) {
					Podcasts.init();
					//Videos.init();
					Api.init();
					Player.init();
					Direct.init();
				} else {
					alert('connexion error flux');
				}
			},
			error: function() {
				console.log('error de connexion au FLUX');
			}
		});
    },

}
