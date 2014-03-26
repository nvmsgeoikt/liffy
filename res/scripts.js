
var centerOslo = new L.LatLng(59.91545099, 10.73322757);	
var layerGeonorgeMap = L.tileLayer.wms('http://wms.geonorge.no/skwms1/wms.topo2?GetMap', 
	{
	layers: 'N250Hoydelag',
	format: 'image/png',
	attribution: ''
	});
	
var map = new L.Map('map', {
		center: centerOslo,
		zoom: 13,
		layers: layerGeonorgeMap
		});

var popup = L.popup();

function onMapClick(e) {
	popup.
			setLatLng(e.latlng)
			.setContent("You clicked at " + e.latlng.toString())
			.openOn(map);
}

map.on('click', onMapClick);