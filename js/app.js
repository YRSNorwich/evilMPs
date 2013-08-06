console.log(mpdata.length);

var policies = _.without(_.unique(
	_.flatten(
		_.map(mpdata, function(mp){ return _.keys(mp); })
	)
), 'name');

console.log(policies);

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
	console.log(evt);
	var input = $(evt.currentTarget);
	var policy = input.parents('.policy').data('policy');
	console.log(policy);
	console.log(input.val());
	var mps_sorted = _.reject(_.sortBy(mpdata, function(mp){ return mp[policy]; }), function(mp){ return mp[policy] === null; });
	console.log(mps_sorted);
	var angels = (input.val() === '1') ? mps_sorted.slice(-3) : mps_sorted.slice(0,3);
	var devils = (input.val() === '1') ? mps_sorted.slice(0,3) : mps_sorted.slice(-3);
	console.log(angels[0].name);
	console.log(devils[0].name);
});