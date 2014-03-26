var map = L.map('map').setView([51.505, -0.09], 13);
//var map = L.map('map').setView([59.91545099, 10.73322757], 13);  //Ved slottsparken i Oslo

//L.tileLayer('http://wms.geonorge.no/skwms1/wms.topo2?GetMap',
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
        {
            attribution: 'Map data &copy; <a href="http://www.geonorge.no">GeoNorge</a>',
            maxZoom: 18
        }
).addTo(map);

var popup = L.popup();

function onMapClick(e) {
	popup.
			setLatLng(e.latlng)
			.setContent("You clicked at " + e.latlng.toString())
			.openOn(map);
}

map.on('click', onMapClick);