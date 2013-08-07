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
), 'name', 'person_id');

function row(){
	if(i%4 = 0){
		$('<div class="row">').insertBefore('.col-lg-4');
		$('</div>').insertAfter('.col-lg-4');
	}
}

var items = [];
$.each(policies, function(i, pol){
	var tr = $('#main')
		.data('policy', pol)
		.prepend("<div id='"+i+"' class='col-lg-4'><div id='item' class='well'><tr class='policy'><td class='policy policy-name'><p class='lead'>"+pol+"</p></td><div id='buttons'><span class='label label-success'> <input type='radio' name='"+i+"' value='1'> For</input> </span><span class='ii label label-default'> <input type='radio' class='unsure' name='+"+i+"' value='0'> Unsure</input> </span><span class='ii label label-danger'> <input type='radio' name='"+i+"' value='-1'> Against</input> </span></div></tr></div></div>")
	items.push(tr);
});

$('.policies').append(items);

function nthChecker(){
	if(i>1){
		$('.label').addClass('.labelpad');
	}
	else{

	}
}

function getInfoForPerson(person) {
	return $.ajax({
		url: 'http://www.theyworkforyou.com/api/getMP?key=BWADWcCtDrAaDgyWS6A5RqZQ&id='+person.person_id+'&output=js',
		dataType: 'jsonp'
	}).done(function(data){
		$.extend(person, data[0]);
	});
}

$('body').on('change', '.label input:not(.unsure)', function(evt){
	var input = $(evt.currentTarget);
	var policy = input.parents('.policy').data('policy');
	console.log(policy);
	console.log(input.val());
	var mps_sorted = _.reject(_.sortBy(mpdata, function(mp){ return mp[policy]; }), function(mp){ return mp[policy] === null; });
	var angels = (input.val() === '1') ? mps_sorted.slice(-3) : mps_sorted.slice(0,3);
	var devils = (input.val() === '1') ? mps_sorted.slice(0,3) : mps_sorted.slice(-3);
	var self = this;
	console.log(angels[0].name, angels[0].member_id);

	var parentElement = $(self).parent('div');
	console.log(parentElement);

	$.when.apply(null, _.map(angels.concat(devils), function(angel){
		return getInfoForPerson(angel);
	})).then(function(){
		console.log(angels);
		$("<img class='ang' style='margin-left:5px' src='http://www.theyworkforyou.com/"+angels[0].image+"' />").insertAfter(parentElement);
		$("<img class='dev' style='margin-right:5px' src='http://www.theyworkforyou.com/"+devils[0].image+"' />").insertAfter(parentElement);
		$("<p class='devil'>"+devils[0].name+angels[0].name+"</p>");
		$(self).closest('#buttons').find('input').attr('disabled',true);
	});

});
