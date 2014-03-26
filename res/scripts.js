$('#map').width($(window).width() - $('#results').width() - 12*4 - 7);
$('#map').height($(window).height() - $('#info').height() - $('#top').height() - 12);
$('#info').css('top', ($('#map').height() + $('#top').height() + 12) + 'px' );
$('#info').width($('#map').width() - 14);

var centerOslo = new L.LatLng(59.91545099, 10.73322757);
var layerGeonorgeMap = L.tileLayer.wms('http://wms.geonorge.no/skwms1/wms.topo2?GetMap',
	{
	layers: 'N250Hoydelag,N500Hoydelag,N1000Hoydelag,N2000Hoydelag,N5000Hoydelag,fkb_hoydekurver_1m,fkb_hoydekurver_5m,N250Hoydekurver,N50Hoydekurver,N50Arealdekkeflate,N250Arealdekkeflate,fkb_ar5,N5000Vannflate,N2000Vannflate,N1000Vannflate,N500Vannflate,N250Vannflate,N50Vannflate,fkb_vannflate,N250Elver,N250Vannkontur,N50Vannkontur,fkb_Vannkontur,N50Elver,fkb_elver,N50Skytefeltgrense,N50Verneomradegrense,N50Bygningsflate,N250Bygningspunkt,N50Bygningspunkt,fkb_bygningsflate,fkb_ledning_el,N50Jernbane,fkb_bane,fkb_veg,N5000Bilveg,N2000Bilveg,N1000Bilveg,N500Bilveg,N5000Bilferge,N2000Bilferge,N1000Bilferge,N500Bilferge,N250Bilferge,N50Bilferge,fkb_vegavgrensning,N5000Tettstedsnavn,N2000Stedsnavn,N1000Stedsnavn,N500Stedsnavn,N250Stedsnavn,N50Stedsnavn,fkb_adresse,fkb_vegnavn,fkb_stedsnavn5punkt,fkb_stedsnavn5linje,fkb_stedsnavn1punkt,fkb_stedsnavn1linje,N5000Arealdekkeflate,N2000Arealdekkeflate,N1000Arealdekkeflate,N500Arealdekkeflate,N250Arealdekkeflate,N50Arealdekkeflate,fkb_ar5,N5000Hoydelag,N2000Hoydelag,N1000Hoydelag,N500Hoydelag,N250Hoydelag,N5000Vannflate,N2000Vannflate,N1000Vannflate,N500Vannflate,N250Vannflate,N50Vannflate,fkb_vannflate,N5000Elver,N2000Elver,N1000Elver,N500Elver,N250Elver,N50Elver,fkb_elver,N5000Bilveg,N2000Bilveg,N1000Bilveg,N500Bilveg,N250Bilveg,N50Bilveg,fkb_samferdsel,N1000Bygningspunkt,N500Bygningspunkt,N250Bygningspunkt,N50Bygningspunkt,fkb_bygningspunkt,fkb_bygningsflate,N5000Tettstedsnavn,N5000Fylkesnavn,N2000Stedsnavn,N1000Stedsnavn,N500Stedsnavn,N250Stedsnavn,N50Stedsnavn',
	format: 'image/png',
	attribution: ''
	});

var map = new L.Map('map', {
		center: centerOslo,
		zoom: 13,
		layers: layerGeonorgeMap
		});

var popup = L.popup();

var nvdb_endpoint = "https://www.vegvesen.no/nvdb/api";
function onMapClick(e) {
	 popup
	.setLatLng(e.latlng)
	.setContent("(" + e.latlng.lng + ", " + e.latlng.lat + ")")
	.openOn(map);
    var url = nvdb_endpoint + "/vegreferanse?x="+ e.latlng.lng+"&y="+ e.latlng.lat+"&srid=WGS84";
    $.getJSON(url, function(data) {
        var text = "<div>Route ID: " + data.veglenkeId + "</div>"
            + "<div>Measure: " + data.veglenkePosisjon + "</div>"
            + "<div>Vegreferanse: " + data.visningsNavn + "</div>";
        $("#info").html(text);
    });
}

map.on('click', onMapClick);