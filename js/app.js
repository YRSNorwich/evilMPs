// initialise by decorating each mp in the voting record with a person id
$.each(mpdata, function(i, mp){
	mp.person_id = _.find(directory,  function(mp_info){
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
		.prepend("<td class='policy'><p class='lead'>"+pol+"</p></td>")
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


	console.log(angels[0].name, angels[0].person_id);

});