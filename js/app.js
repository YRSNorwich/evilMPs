// initialise by decorating each mp in the voting record with a person id
$.each(mpdata, function(i, mp){
	mp.member_id = _.find(directory,  function(mp_info){
		return mp.name === mp_info.name;
	}).person_id;
});

var policies = _.without(_.unique(
	_.flatten(
		_.map(mpdata, function(mp){ return _.keys(mp); })
	)
), 'name');



var items = [];
$.each(policies, function(i, pol){
	var tr = $('<tr></tr>').addClass('policy')
		.data('policy', pol)
		.prepend("<td class='policy policy-name'><p class='lead'>"+pol+"</p></td>")
		.prepend("<span class='label label-success'><input type='radio' name='1' value='1'> For</input></span><span class='label'><input type='radio' class='unsure' name='1' value='0'> Unsure</input></span><span class='label label-danger'><input type='radio' name='1' value='-1'> Against</input></span>");
	
	items.push(tr);

});
$('.policies').append(items);

$('body').on('change', '.policy input:not(.unsure)', function(evt){
	var input = $(evt.currentTarget);
	var policy = input.parents('.policy').data('policy');
	console.log(policy);
	console.log(input.val());
	var mps_sorted = _.reject(_.sortBy(mpdata, function(mp){ return mp[policy]; }), function(mp){ return mp[policy] === null; });
	var angels = (input.val() === '1') ? mps_sorted.slice(-3) : mps_sorted.slice(0,3);
	var devils = (input.val() === '1') ? mps_sorted.slice(0,3) : mps_sorted.slice(-3);
	var imgdata = url: 'http://www.theyworkforyou.com/api/getMP?key=BWADWcCtDrAaDgyWS6A5RqZQ&id='+angels[0].member_id+'&output=js',

	console.log(angels[0].name, angels[0].member_id);

	$('<img class="img-rounded" src="http://www.theyworkforyou.com/images/mpsL/'+angels[0].member_id+'.jpeg" width="55" height="65" />').hide().appendTo('.policy-name').delay(50).show().toggle( "bounce", { times: 3 }, "slow" );

});

function checkq() {
	var umsc = 'http://www.theyworkforyou.com/api/getMP?key=BWADWcCtDrAaDgyWS6A5RqZQ&id='+angels[0].member_id+'&output=js'
	console.log(umsc);
}

$.ajax({
	
	async: false,
	dataType: 'json',
	success: function (response) {
		_.flatten(
		_.map(response, function(imgmp){ return _.keys(imgmp); })
				 )
	}
})

$.each(response, function(i, imgmp){
	mp.member_id = _.find(directory,  function(mp_info){
		return mp.name === mp_info.name;
	}).person_id;
});