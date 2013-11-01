
/*
  The source code, written for a specific project. 
  The intention is to make this more generic, so it can apply to any
  group of checkboxes on a page.
  
  Visially, the checkboxes would look something like this:
  
  [x] Select/deselect All
  [x] Option 1
  [x] Option 2 etc.
  
  Option 1, 2 etc. would all follow the state of the master checkbox at the top,
  if the master checkbox is checked or unchecked. The master checkbox would then
  also follow the state of the other options, if any change of state results in
  all or not-all being checked.
*/

jQuery(document).ready(function($) {
	/* If the master checkbox is toggled, then set all checkboxes the same. */
	$('#master-checkbox').click(function() {
		$('input:checkbox.select-invoice').attr('checked', this.checked);
		$('input#form_pay_invoices').attr('disabled', !this.checked);
	});

	$('input:checkbox.select-group').click(function() {
		/* 
			If all checkboxes are unchecked, then make sure the master is checked,
			otherwise it should be unchecked.
		*/
		var master_flag = true; // True if all options selected
		var submit_flag = true; // True if submit to be disabled
		$('input:checkbox.select-group').each(function() {
			if (this.checked == false) master_flag = false;
			if (this.checked == true) submit_flag = false;
		});
		$('#pay_all').attr('checked', master_flag);
		$('input#my_form').attr('disabled', submit_flag);
	});
});
