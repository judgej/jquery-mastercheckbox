/**
 * Need two selection entry points:
 *	* The group selector. Whatever collects the related checkboxes together.
 *	* The master checkbox. A selector that identifies the master.
 */

jQuery(document).ready(function($) {
	/* If the master checkbox is toggled, then set all other checkboxes in the group the same. */
	$('#set-1 .master input:checkbox').click(function() {
		var status = this.checked;
		var master = this;
		$('#set-1 input:checkbox').each(function() {
			if (this !== master) $(this).prop('checked', status);
		});
	});

	$('#set-1 input:checkbox').not('.master').click(function() {
		/* 
			If all checkboxes are unchecked, then make sure the master is checked,
			otherwise it should be unchecked.
		*/
		// True if all options selected
		var master_status = true;

		// Find the master checkbox.
		var master = $('#set-1 .master input:checkbox')[0];

		$('#set-1 input:checkbox').each(function() {
			if (this !== master && this.checked == false) {
				master_status = false;
			}
		});
		if (master_status !== master.checked) {
			$(master).prop('checked', master_status);
		}
	});
});

