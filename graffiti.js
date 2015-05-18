FrapFlux = {
	
	id: 'graffiti',
	nom: 'Graffiti Urban Radio',
	racine: 'http://www.urban-radio.com',
	//http://80.82.229.202/sun.aac
	mp3_direct: {
	    hifi: 'http://80.82.229.202/graffiti.mp3',
	    lofi: 'http://80.82.229.202/graffiti.mp3'
	},	
	mp3_ts: 'http://www.urban-radio.com/.mp3?date=%HMS%',
	mp3_racine_podcast : '/var/www1/sites/default/files/podcasts',
	
	ws_meta_direct: 'http://www.urban-radio.com/block_now/nodes.json',
	ws_podcasts: 'http://www.urban-radio.com/services/views/services.json',
	//ws_video: 'https://api.dailymotion.com/playlist/x231ha_lesonunique_playlist-player/videos&fields=thumbnail_medium_url,id,title,channel,owner,embed_html,duration,views_total,url',
	
	facebook_url : 'https://www.facebook.com/GraffitiUR',
	twitter_msg: 'J\'écoute {url} #graffiti',
	telephone_std: '02 51 37 91 91',
	email_contact: 'graffiti@urban-radio.com',
	url_like: '',
	
	//url_dedicace: 'http://www.lesonunique.com/datasun/selection_auditeur/selection_date_jquery.php',
	url_contact: 'http://frap.jembe.fr/formulaire/send.php',

	destinataires : [
		{nom:'Accueil',mail:'graffiti@urban-radio.com'}
	]
}
