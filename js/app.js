var globalImage = [];
var countForSubmit = 0;

$('#submit').attr('disabled',true);

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

var items = [];
var policy_template = _.template([
	'<div id="<%= i %>" class="col-lg-4">',
	'<div id="item" class="policy well" data-policy="<%= policy %>">',
	'<p class="lead">',
	'<%= policy %>',
	'</p>',
	'<div id="buttons<%= i %>">',
	'<span class="label label-success"><input type="radio" name="<%= i %>" value="1"> For</input></span>',
	'<span class="label label-default ii"><input type="radio" class="unsure" name="<%= i %>" value="0"> Unsure</input></span>',
	'<span class="label label-danger ii"><input type="radio" name="<%= i %>" value="-1"> Against</input></span>',
	'</div>',
	'</div>',
	'</div>',
	].join(''));

$.each(policies, function(i, pol, sthird, ethird){
	items.push(policy_template({policy:pol,i:i,sthird:sthird,ethird:ethird}));
});

$('#main').append(items);

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

	var parentElement = $(self).attr('name');
	$(parentElement).append("<h1>HELLO</h1>");

	$.when.apply(null, _.map(angels.concat(devils), function(angel){
		return getInfoForPerson(angel);
	})).then(function(){
		$('#submit').attr('disabled',false);
		console.log(angels, devils);
		$("<img title='"+angels[0].name+"' class='ang' style='margin-left:5px' src='http://www.theyworkforyou.com"+angels[0].image+"' />").insertAfter('#buttons' + $(self).attr('name'));
		$("<img title='"+devils[0].name+"' class='dev' style='margin-right:5px' src='http://www.theyworkforyou.com"+devils[0].image+"' />").insertAfter('#buttons' + $(self).attr('name'));
		$("<p class='devil'>"+devils[0].name+angels[0].name+"</p>");
		$(self).closest('#buttons'+$(self).attr('name')).find('input').attr('disabled',true);
		globalImage.push({
			devil: devils[0].name,
			devilImg: devils[0].image,
			angel: angels[0].name,
			angelImg: angels[0].image
		});
		console.log(globalImage);
	});

});

// mockup

$('#submit').click(function(){
	$('.selectthree').fadeOut('fast');
	$('#submit').fadeOut('slow');
	$('#main').empty().append("<div class='banner'><ul></ul></div>");
	var items = [];
	for (var i = 0; i<globalImage.length; i++)
	{
		items.push($("<li class='conimg'><img style='margin-left:30%;' class='anon' src='http://www.theyworkforyou.com" + globalImage[i].angelImg + "'><img class='koki' src='koki/fake-2.png' /></li>"));
		items.push($("<li class='conimg'><img style='margin-left:30%;' class='anon' src='http://www.theyworkforyou.com" + globalImage[i].devilImg + "'><img class='koki' src='koki/real-2.png' /></li>"));
	}
	$('#main .banner ul').append(items);
	$('.banner').unslider({
		speed:10000,
		fluid:false
	});
});