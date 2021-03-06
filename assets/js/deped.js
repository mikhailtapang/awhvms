
var valid = true;
var action = '';

/*
	*naa ni siya add_item_modal.php
	*form ni siya kung mag add og item
*/

//fill the changepassword form
$(document).ready(function() {
	$.ajax({
			url: '../data/get_admin_data.php',
			type: 'post',
			dataType: 'json',
			success: function (data) {
				if(data.valid == valid){
					// console.log(data);
					$('#admin-account').append('<span class="glyphicon glyphicon-user" aria-hidden="true"></span> '+
								data.logged+
								'<span class="caret"></span>');
					$('#change-username').val(data.logged_un);
				}else{
					alert('Account is Invalid!');
				}
			},
			error: function(){
				alert('Error: L11+');
			}
		});
	
});
                       

$(document).on('submit', '#add-item-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_data = new Array(
								$('input[id=accountNumber]'),
								$('input[id=ownerAddress]'),
								$('input[id=itemname]'),
								$('input[id=serialNumber]'),
								$('input[id=modelNumber]'),
								$('input[id=brand]'),
								$('input[id=amount]'),
								$('input[id=rfidCode]'),
								$('input[id=stickerType]'),
								$('input[id=stickerNumber]'),								
								$('input[id=purDate]')
							);
	
	console.log('form_data: ', form_data);
	var data = new Array(form_data.length);

	console.log('data: ', data);
	// console.log('Data: ', data);
	
	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].val().length == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');
			data[i] = form_data[i].val();
			validate += i;
		}
	}
	console.log('validate: ', validate);
	if(validate == '012345678910'){
		$.ajax({
			url: '../data/addItem.php',
			type: 'post',
			dataType: 'json',
			data: {
				data: JSON.stringify(data)
			},
			success: function(event){

				//console.log(result)
				if(event.valid == valid){
					$('#modal-add-item').modal('hide');
					$('#add-item-form').trigger('reset');
					$('#modal-message-box').modal('show');
					$('#modal-message-box').find('.modal-body').text(event.msg);
					action = event.action;
					show_all_item();
					

				}
			},
			error: function(){
				//console.log();
				alert('Error: L57+ add item');
			}
		});//end ajax
	}//end validate
});//submit #add-item-form

//display all item

$(document).ready(function() {
    $('#js-example-basic-multiple').select2();
});

function show_all_item()
{
	$.ajax({
		url: '../data/show_all_item.php',
		type: 'post',
		async: false,
		success: function(event){
			$('#allItem').html(event);

		},
		error: function(){
			alert('Error: show all item L100+');
		}
	});

	
}

show_all_item();

//display all item
function show_all_item_security()
{
	$.ajax({
		url: '../data/show_all_item_security.php',
		type: 'post',
		async: false,
		success: function(event){
			$('#allItemsec').html(event);

		},
		error: function(){
			alert('Error: show all item L100+ security');
		}
	});

	
}

show_all_item_security();
	


/*kung e lick ang table nga row sa item table*/
function item_profile(iID)
{
	$('#modal-item-profile').modal('show');
	$.ajax({
		url: '../data/item_profile.php',
		dataType: 'json',
		type: 'post',
		data: {
			iID: iID
		},
		success: function(event){
			console.log(event);
			$('.account-number').val(event.account_number);
			$('.item-name').val(event.item_name);
			$('.owner-address').val(event.owner_address);
			$('.item-brand').val(event.item_brand);
			$('.item-serial').val(event.item_serno);
			$('.item-model').val(event.item_modno);
			$('.item-amount').val(event.item_amount);
			$('.rfid-code').val(event.rfid_code);
			$('.sticker-type').val(event.vehicle_sticker_type);
			$('.sticker-number').val(event.vehicle_sticker_number);
			$('.item-purchased').val(event.item_purdate);
			$('.item-owner').val(event.emp_fname+' '+event.emp_mname+' '+event.emp_lname);
			$('.item-category').val(event.cat_desc);
			$('.item-condition').val(event.con_desc);
		},
		error: function(){
			alert('Error: item_profile L136+');
		}

	});
}//end function item_profile

function violation_profile(iID)
{
	$('#modal-violations-profile').modal('show');
	$.ajax({
		url: '../data/violation_profile.php',
		dataType: 'json',
		type: 'post',
		data: {
			iID: iID
		},

		success: function(event){
			console.log(event)
			$('.account-number-profile').val(event.account_number);
			$('.item-amount-profile').val(event.item_amount);
			$('.owner-address-profile').val(event.owner_address);
			$('.item-name-profile').val(event.item_name);
			$('.item-serial-profile').val(event.item_serno);
			$('.item-model-profile').val(event.item_modno);
			$('.item-brand-profile').val(event.item_brand);
			$('.sticker-type-profile').val(event.vehicle_sticker_type);
			$('.sticker-number-profile').val(event.vehicle_sticker_number);
			$('.driversName-profile').val(event.driver_name);
			$('.dateApprehended-profile').val(event.date_apprehended);
			$('.violationOfficer-profile').val(event.violation_officer);
			$('.ticketNumber-profile').val(event.violation_number);
			$('.violation-profile').val(event.violation);

		},
		error: function(){
			alert('Error: violation_profile');
		}

	});

}//end function item_profile

function add_violation(iID)
{
	$.ajax({
			url: '../data/item_profile.php',
			type: 'post',
			dataType: 'json',
			data: { iID: iID},
			
			success: function (data) {
				
				$('#accountNumber-violation').val(data.account_number);
				$('#ownerName').val(data.item_amount);
				$('#plateNumber').val(data.item_name);
				$('#iID').val(data.item_id)//iID
				$('#modal-add-violation').modal('show');
				$('#basic-multiple').select2();
				
			},
			error: function (){
				
				alert('Error: fill_update_modal L172+');
			}
		});
}

function add_payment(iID)
{
	
	$.ajax({
			url: '../data/payment_profile.php',
			type: 'post',
			dataType: 'json',
			data: { iID: iID},
			
			success: function (data) {
					
				$('#accountNumber-payment').val(data.account_number);
				$('#ownerName-payment').val(data.item_amount);
				$('#plateNumber-payment').val(data.item_name);
				$('#dateApprehended-payment').val(data.date_apprehended);
				$('#ticketNumber-payment').val(data.violation_number);
				$('#vID').val(data.violation_id);
				$('#iID').val(data.vehicle_id)//iID
				$('#modal-add-payment').modal('show');
				console.log(data);	
			},
			error: function (){
			alert('Error: add_payment');
			}
		});
}
/*
*e fill ang update modal
*/
function fill_update_modal(iID){
	$.ajax({
			url: '../data/item_profile.php',
			type: 'post',
			dataType: 'json',
			data: { iID: iID},
			success: function (data) {
				$('#accountNumber-update').val(data.account_number);
				$('#ownerAddress-update').val(data.owner_address);
				$('#itemName-update').val(data.item_name);
				$('#serialNumber-update').val(data.item_serno);
				$('#modelNumber-update').val(data.item_modno);
				$('#brand-update').val(data.item_brand);
				$('#amount-update').val(data.item_amount);
				$('#rfidCode-update').val(data.rfid_code);
				$('#stickerType-update').val(data.vehicle_sticker_type);
				$('#stickerNumber-update').val(data.vehicle_sticker_number);
				$('#purDate-update').val(data.item_purdate);
				$('#empID-update').val(data.emp_id);
				$('#catID-update').val(data.cat_id);
				$('#conID-update').val(data.con_id);

				$('#iID').val(data.item_id)//iID

				$('#modal-update-item').modal('show');
			},
			error: function (){
				alert('Error: fill_update_modal L172+');
			}
		});

}

// e update ang data nga naa sa modal kung e click ang save nga button
$(document).on('submit', '#update-item-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_data = new Array(
								$('input[id=accountNumber-update]'), 
								$('input[id=ownerAddress-update]'), 
								$('input[id=itemName-update]'), 
								$('input[id=serialNumber-update]'), 
								$('input[id=modelNumber-update]'), 
								$('input[id=brand-update]'), 
								$('input[id=amount-update]'), 
								$('input[id=rfidCode-update]'),
								$('input[id=stickerType-update]'),
								$('input[id=stickerNumber-update]'),
								$('input[id=purDate-update]'),
								$('#iID')
							);

	var data = new Array(form_data.length);
	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].val().length == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');
			data[i] = form_data[i].val();
			validate += i;
		}
	}


	if(validate == '01234567891011'){
		$.ajax({
				url: '../data/update_item.php',
				type: 'post',
				dataType: 'json',
				data: {
					data: JSON.stringify(data)
				},
				success: function (data) {
					if(data.valid == valid){
						$('#modal-update-item').modal('hide');
						$('#modal-message-box').find('.modal-body').text(data.msg);
						$('#modal-message-box').modal('show');
						show_all_item();
					}
				},
				error: function (){
					console.log(validate);
					alert('Error: update item L250+');
				}
			});
	}//end valdidate
});//end submit $update-item-form

$(document).on('submit', '#add-violation-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var violations = $('#basic-multiple').val().toString().replace(/,/g, ", ");
	var form_data = new Array(
								$('input[id=driverName]'), 
								$('input[id=dateApprehended]'), 
								$('input[id=violationOfficer]'), 
								$('input[id=ticketNumber]'),
								$('select[id=basic-multiple]'),
								$('#iID'),
								$('#status')
							);

	var data = new Array(form_data.length);

	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].length == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');

			if (form_data[i] == form_data[4]){
				data[4] = violations;
				validate += i;
			}else{
				data[i] = form_data[i].val();
				validate += i;
			}
		}
	}

	if(validate == '0123456'){
		$.ajax({
				url: '../data/add_violation.php',
				type: 'post',
				dataType: 'json',
				data: {
					data: JSON.stringify(data)
				},
				success: function (data) {

					if(data.valid == valid){
						console.log("success",data);
						$('#modal-add-violation').modal('hide');
						$('#modal-message-box').find('.modal-body').text(data.msg);
						$('#modal-message-box').modal('show');
						show_all_item();
					}
				},
				error: function (){
					console.log("failed", data);
					alert('Error: update item L250+');
				}
			});
	}//end validdate
});

$(document).on('submit', '#add-payment-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_data = new Array(
								$('input[id=amount_payment]'), 
								$('input[id=or_number]'), 
								$('input[id=paymentDate]'),
								$('#vID'),
								$('#iID')
							);

	var data = new Array(form_data.length);
	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].val().length == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');
			data[i] = form_data[i].val();
			validate += i;
		}
	}



	if(validate == '01234'){
		$.ajax({
				url: '../data/add_payment.php',
				type: 'post',
				dataType: 'json',
				data: {
					data: JSON.stringify(data)
				},
				success: function (data) {
					
					console.log("data", data)
					if(data.valid == valid){
						$('#modal-add-payment').modal('hide');
						$('#modal-message-box').find('.modal-body').text(data.msg);
						$('#modal-message-box').modal('show');
						violation_list();
					}
				},
				error: function (){
					console.log("validate", validate)
					console.log("data", data);
					alert('Error: [payment]');
				}
			});
	}//end valdidate
});

/*
*employee logic begin here
*/
//clear inputs of add employeee if update used it
// for reusable used of modal we need this line of code to
//clean the inputs after update
$('#add-employee-menu').click(function(event) {
	/* Act on the event */
	$('#add-employee-form').trigger('reset');
});
$(document).on('submit', '#add-employee-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_data = new Array(
								$('input[id=fN]'), 
								$('input[id=mN]'), 
								$('input[id=lN]'),
								$('#type')
							);
	var data = new Array(form_data.length);

	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].val().length == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');
			data[i] = form_data[i].val();
			validate += i;
		}
	}

	if(validate == '0123'){
		$.ajax({
				url: '../data/add_employee.php',
				type: 'post',
				dataType: 'json',
				data: { data: JSON.stringify(data) },
				success: function (response) {
					if(response.valid == valid){
						$('#modal-add-employee').modal('hide');
						$('#modal-message-box').find('.modal-body').text(response.msg);
						$('#modal-message-box').modal('show');
						$('#add-employee-form').trigger('reset');
						 // window.location="../admin/employee.php";
						show_all_employee();

					}
				},
				error: function (){
					alert('Error: L235+');
				}
			});
	}
	

});


/*
*show all employee function
*and display on the table
*/
function show_all_employee()
{
	$.ajax({
			url: '../data/show_all_employee.php',
			type: 'post',
			async: false,
			success: function (data) {
				$('#all_employee').html(data);
			},
			error: function (){
				alert('Error: L266+ show_all_employee');
			}
		});
}//end show_all_employee
show_all_employee();

//employee remove or undo 
var remove_undo_choice;
var eid;//employee id
function employee_remove_undo(choice, id){
	$('#modal-employee-remove-undo').modal('show');
	remove_undo_choice = choice;
	eid = id;
}

$('#remove_undo').click(function(event) {
	//this event trigered when confirmed button is clicked
	var emp_at_deped;
	if(remove_undo_choice == 'remove'){
		// emp_at_deped = false;
		emp_at_deped = 0;
	}else{
		// emp_at_deped = true;
		emp_at_deped = 1;
	}
	$.ajax({
			url: '../data/employee_remove_undo.php',
			type: 'post',
			dataType: 'json',
			data: {
				emp_at_deped	: emp_at_deped,
				eid 			: eid
			},
			success: function (data) {
				// console.log(data);
				$('#modal-employee-remove-undo').modal('hide');
				show_all_employee();
			},
			error: function(){
				alert('Error: L294+ #remove_undo');
			}
		});
});
//end employee remove or undo 

/*add position logic*/
$(document).on('submit', '#add-position-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var pos = $('input[id=position]');
 	if(pos.val() == ''){
 		pos.parent().parent().addClass('has-error');
 	}else{
 		pos.parent().parent().removeClass('has-error');
 		$.ajax({
 				url: '../data/add_position.php',
 				type: 'post',
 				dataType: 'json',
 				data: { 
 					pos: pos.val()
 				},
 				success: function (data) {
 					if(data.valid = valid){
 						$('#modal-add-position').modal('hide');
 						$('#modal-message-box').find('.modal-body').text(data.msg);
 						$('#modal-message-box').modal('show');
 						$('#add-position-form').trigger('reset');
 					}//end if
 				},
 				error: function(){
 					alert('Error: L328+ submit #add-position-form');
 				}
 			});
 	}



});	
/*end add position logic*/

/*add new office logic here*/
$(document).on('submit', '#add-office-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var office = $('input[id=office]');
	if(office.val() == ''){
		office.parent().parent().addClass('has-error');
	}else{
		office.parent().parent().removeClass('has-error');
		$.ajax({
				url: '../data/add_office.php',
				type: 'post',
				dataType: 'json',
				data: {
					off : office.val()
				},
				success: function (data) {
					if(data.valid == valid){
						$('#modal-add-office').modal('hide');
						$('#modal-message-box').find('.modal-body').text(data.msg);
 						$('#modal-message-box').modal('show');
 						$('#add-position-form').trigger('reset');
					}
				},
				error: function(){
					alert('Error: L366+ on submit #add-office-form');
				}
			});
	}
});
/*end add new office logic here*/


/*view employee 1 by 1*/
function employee_profile(eid){
	var at_deped;
	$('#modal-employee-profile').modal('show');
	$.ajax({
			url: '../data/employee_profile.php',
			type: 'post',
			dataType: 'json',
			data: {
				eid : eid
			},
			success: function (data) {
				console.log(data);
				if(data){
					$('.fN').val(data.emp_fname);
					$('.mN').val(data.emp_mname);
					$('.lN').val(data.emp_lname);
					$('.position').val(data.pos_desc);
					$('.office').val(data.off_desc);
					$('.type').val(data.type_desc);
					at_deped = data.emp_at_deped == 1 ? 'YES':'NO';
					$('.wh').val(at_deped);
				}
			},
			error: function(){
				alert('Error: L389+ employee_profile');
			}
		});
}
/*end view employee 1 by 1*/

/*edit employee*/
function edit_employee_fill(eid){
	$('#modal-update-employee').modal('show');
	$('#modal-update-employee').find('.modal-title').text('Update Employee');

	//get employee data using ajax and fill the modal 
	$.ajax({
			url: '../data/employee_profile.php',
			type: 'post',
			dataType: 'json',
			data: {
				eid : eid
			},
			success: function (data) {
				if(data){
					$('#update-fN').val(data.emp_fname);
					$('#update-mN').val(data.emp_mname);
					$('#update-lN').val(data.emp_lname);
					$('#update-type').val(data.type_id);

					$('#update-eid').val(eid);

				}
			},
			error: function(){
				alert('Error: L434+ update employee');
			}
		});
}

$(document).on('submit', '#update-employee-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_data = new Array(
									$('#update-fN'),	
									$('#update-mN'),	
									$('#update-lN'),	
									$('#update-type'),
									$('#update-eid')
								);

	var data = new Array(form_data.length);
	for(var i = 0; i < form_data.length; i++){
		if(form_data[i].val() == 0){
			form_data[i].parent().parent().addClass('has-error');
		}else{
			form_data[i].parent().parent().removeClass('has-error');
			data[i] = form_data[i].val();
			validate += i;
		}
	}


	if(validate == "01234"){
		$.ajax({
				url: '../data/update_employee.php',
				type: 'post',
				dataType: 'json',
				data: {
					data : JSON.stringify(data)
				},
				success: function (data) {
					if(data.valid == valid){
						$('#modal-update-employee').modal('hide');
						show_all_employee();
						$('#"modal-message-box').find('.modal-body').text(data.msg);
					}
				},
				error: function(){
					console.log(validate);
					alert('Error: L485+ update_employee');
				}
			});
	}

});
/* end edit employee*/


//all request to admin
function all_request_to_admin()
{
	$.ajax({
			url: '../data/all_request_to_admin.php',
			type: 'post',
			success: function (data) {
				// console.log(data);
				$('#request-to-admin').html(data);
			},
			error: function(){
				alert('Error: L510+ all req to admin');
			}
		});
}
all_request_to_admin();

//violation list
function violation_list()
{
	$.ajax({
			url: '../data/get_violations.php',
			type: 'post',
			success: function (data) {
				// console.log(data);
				$('#myTable-violations').html(data);
			},
			error: function(){
				alert('Error: violations');
			}
		});
}
violation_list();

//violation list
function violation_listSec()
{
	$.ajax({
			url: '../data/get_violationssec.php',
			type: 'post',
			success: function (data) {
				// console.log(data);
				$('#myTable-violationsSec').html(data);
			},
			error: function(){
				alert('Error: violations');
			}
		});
}
violation_listSec();


//request_action
var action = '';
var request_id = '';
var item_id = '';
var req_type = '';

function request_action(action_choice, rid, iid, r_type){
	action = action_choice;
	request_id = rid;
	item_id = iid;
	req_type = r_type;
	$('#modal-request-action').modal('show');
}

$('#confirm-action').click(function(event) {
	/* Act on the event */
	$.ajax({
			url: '../data/admin_request_action.php',
			type: 'post',
			// dataType: 'json',
			data: {
				action : action,
				req_id : request_id,
				item_id : item_id,
				req_type : req_type
			},
			success: function (data) {
				console.log(data);
				$('#modal-request-action').modal('hide');
				all_request_to_admin();	
			},
			error: function(){
				alert('Error: L537+');
			}
		});
});
//end all request to admin


//changepass logic
$(document).on('submit', '#form-changepassword', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = '';
	var form_att = new Array(
							$('input[id=change-username]'),
							$('input[id=change-password]'),
							$('input[id=confirm-password]')
						);
	var data = new Array(form_att.length);
	for(var i = 0; i < data.length; i ++){
		if(form_att[i].val() == 0){
			form_att[i].parent().parent().addClass('has-error');
		}else{
			form_att[i].parent().parent().removeClass('has-error');
			validate += i;
			data[i] = form_att[i].val();
		}
	}//end for
	//check if pass match
	if(validate == '012'){
		if($('input[id=change-password]').val() == $('input[id=confirm-password]').val()){
			// console.log('equal');
			$.ajax({
					url: '../data/update_admin_data.php',
					type: 'post',
					dataType: 'json',
					data: {
						data: JSON.stringify(data)
					},
					success: function (data) {
						// console.log(data);
						if(data.valid == valid){
							//if success
							$('#modal-changepass').modal('hide');
							$('#modal-message-box').modal('show');
							$('#modal-message-box').find('.modal-body').text(data.msg);
						}else{
							alert('Oops: Something went wrong! check db!');
						}
					},
					error: function(){
						alert('Error: L612+');
					}
				});
		}else{
			// console.log('not equal');
			alert('Password Not Matched!');
		}
	}
});

//get all positions available and put in the table
function get_positions() {
	$.ajax({
			url: '../data/get_all_positions.php',
			type: 'post',
			success: function (data) {
				$('#positions').html(data);
			},
			error: function(){
				alert('Error: L643+');
			}
		});
}//end get_positions
get_positions();

//get position id to be deleted or update
var pos_id;
function get_pos_id(pid, choice){
	pos_id = pid;
	if(choice == 'del'){
		$('#modal-position').modal('show');
	}
}//end get_pos_id

$('#confirm-position').click(function(event) {
	/* Act on the event */
	$.ajax({
			url: '../data/delete_position.php',
			type: 'post',
			dataType: 'json',
			data: {
				pid : pos_id
			},
			success: function (data) {
				if(data.valid == valid){
					$('#modal-position').modal('hide');
					$('#modal-message-box').modal('show');
					$('#modal-message-box').find('.modal-body').text(data.msg);
					get_positions();
				}
			},
			error: function(){
				alert('Error: L671+');
			}
		});
});

//fill position 
function fill_position(id){
	$.ajax({
			url: '../data/fill_position.php',
			type: 'post',
			dataType: 'json',
			data: {
				pid : id
			},
			success: function (data) {
				if(data.valid == valid){
					$('#upt-pos-id').val(data.pid);
					$('#upt-position').val(data.desc);
					$('#modal-upt-position').modal('show');
					// console.log(data);
				}
			},
			error: function(){
				alert('Error: L691+');
			}
		});
}
//end fill position 

//update position
$(document).on('submit', '#upt-position-form', function(event) {
	event.preventDefault();
	/* Act on the event */
	var validate = "";
	var form_att = new Array(
				$('input[id=upt-pos-id]'),
				$('input[id=upt-position]')
		);
	var form_data = new Array(form_att.length);
	for(var i = 0; i < form_data.length; i++){
		if(form_att[i].val() == 0){
			form_att[i].parent().parent().addClass('has-error');
		}else{
			form_att[i].parent().parent().removeClass('has-error');
			validate += i;
			form_data[i] = form_att[i].val();
		}
	}//end for
	if(validate == "01"){
		$.ajax({
				url: '../data/update_position.php',
				type: 'post',
				dataType: 'json',
				data: {
					data : JSON.stringify(form_data)
				},
				success: function (data) {
					if(data.valid = valid){
						$('#modal-upt-position').modal('hide');
						get_positions();
						$('#modal-message-box').modal('show');
						$('#modal-message-box').find('.modal-body').text(data.msg);
					}
				},
				error: function(){
					alert('Error: L734+');
				}
			});
	}

});
//end update position

//get offices
function get_offices()
{
	$.ajax({
			url: '../data/get_violations.php',
			type: 'post',
			success: function (data) {
				$('#offices').html(data);
			},
			error: function(){
				alert('Error: L760+');
			}
		});
}
get_offices();
//end get offices

var off_id;
function fill_office_form(id){
	off_id = id;
	$('#modal-update-office').modal('show');
}

$(document).on('submit', '#modal-update-office', function(event) {
	event.preventDefault();
	/* Act on the event */
	alert('bogkot');

});

// alert('test');

//on change ang select nga cat
$(document).on('change', '#catID', function(event) {
	event.preventDefault();
	/* Act on the event */
	// $('#serialNumber').attr('type', 'hidden');
	var cat = $('#catID').val();
	if(cat == 2){
		$('#sr').hide();
		$('#mn').hide();
		$('#b').hide();
		//put spaces value 
		$('#serialNumber').val(' ');
		$('#modelNumber').val(' ');
		$('#brand').val(' ');
	}else{
		$('#sr').show();
		$('#mn').show();
		$('#b').show();		
	}

});


$('#addItem').click(function(event) {
	/* Act on the event */
	$('#sr').show();
		$('#mn').show();
		$('#b').show();	

		$('#catID').val('1');
});

$(document).on('change', '#report-choice', function(event) {
	event.preventDefault();
	/* Act on the event */
	var choice = $('#report-choice').val();
	$.ajax({
			url: '../data/show_report.php',
			type: 'post',
			data: {
				choice: choice
			},
			success: function (data) {
				$('#show-report').html(data);
			},
			error: function(){
				alert('Error: L825+');
			}
		});
});

function show_report(){
	$.ajax({
			url: '../data/show_report.php',
			type: 'post',
			data: {
				choice: 'all'
			},
			success: function (data) {

				$('#show-report').html(data);
			},
			error: function(){
				alert('Error: L825+');
			}
		});
}//end function show_report
show_report();

$('#print-btn').click(function(event) {
	/* Act on the event */
	var choice = $('#report-choice').val();
	window.open('../data/print.php?choice='+choice,'name','width=600,height=400');
});

$('#pdf-btn').click(function(event) {
	/* Act on the event */
	var choice = $('#report-choice').val();
	window.open('../data/savepdf.php?choice='+choice,'name','width=600,height=400');
});

