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
		.prepend('<td class="poli"><p class="lead">'+pol+'</p></td>')
		.prepend("<td><div style='margin-top:16px' class='btn-group' data-toggle='buttons'><td class='opti'><label class='btn btn-success'><input type='radio' name='options' id='option1'> For </input></label></td><td class='opti'><label class='btn btn-default'><input type='radio' name='options' id='option2'> Unsure </input></label></td><td class='opti'><label class='btn btn-danger'><input type='radio' name='options' id='option1'> Against </input></label></td></div></td>");
	
	items.push(tr);

});
$('.policies').append(items);