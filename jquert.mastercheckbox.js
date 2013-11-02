/**
 * Need two selection entry points:
 *	* The group selector. Whatever collects the related checkboxes together.
 *	* The master checkbox. A selector that identifies the master.
 * Visually, the checkboxes would look something like this:
 * 
 * [x] Select/deselect All
 * [x] Option 1
 * [x] Option 2 etc.
 * 
 * Option 1, 2 etc. would all follow the state of the master checkbox at the top,
 * if the master checkbox is checked or unchecked. The master checkbox would then
 * also follow the state of the other options, if any change of state results in
 * all or not-all being checked.
 *
 * TODO:
 *	* Make this into a jQuery plugin.
 *	* Accept parameters for the selectors.
 *	* Make sure we are being passed selectors for checkboxes. Abort early if not.
 *	* Can the selectors be made live for the more dynamic forms?
 *	* Cater for groups of checkboxes that may share the same selectors, i.e. a selector
 *	  for a group with the master being a selector in the context of the group wrapper.
 */

jQuery(document).ready(function($) {
	var group_selector = '#set-1 input:checkbox';
	var master_selector = '#set-1 .master input:checkbox';

	/* If the master checkbox is toggled, then set all other checkboxes in the group the same. */
	$(master_selector).click(function() {
		var status = this.checked;
		var master = this;
		$(group_selector).each(function() {
			if (this !== master) $(this).prop('checked', status);
		});
	});

	$(group_selector).click(function() {
		// If all checkboxes are checked, then make sure the master is checked,
		// otherwise the master should be unchecked.

		// True if all options selected
		var master_status = true;

		// Get the master checkbox.
		var master = $(master_selector)[0];

		$(group_selector).each(function() {
			// If this checkbox is not checked, and we are not
			// looking at the master checkbox, then the master needs to be unchecked.
			if (this !== master && this.checked == false) {
				master_status = false;

				// No need to look any further.
				return false;
			}
		});

		// Change the master checked status if it needs changing.
		if (master_status !== master.checked) {
			$(master).prop('checked', master_status);
		}
	});
});

