/**
 * Copyright 2013 Academe Computing Ltd
 * Released under the MIT license
 */
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
 * TODO: support "live" selectors.
 * TODO: if no checkbox matches the master selector, then assume the first in a group is it.
 */


(function($) {
	$.fn.masterCheckbox = function(options) {
		// this.each() is the wrapper for each selected group of checkboxes.
		return this.each(function() {

			var settings = $.extend({
				// The selector within the group to identify the master checkbox.
				master_sub_selector: '.master',

				// The name of the data key that stores a group checkbox selection against any group checkbox.
				group_key_name: 'masterCheckboxGroupCheckboxes',

				// The name of the data key to store the master reference against a group checkbox.
				master_key_name: 'masterCheckboxMasterCheckbox'
			}, options);

			// Get the master within the group.
			// The sub-selector could select the checkbox directly, or could select a wrapper for it.
			// find() finds the checkbox within the wrapper (if it exists) then the selector is added on
			// then the combined result is filtered to select only the checkboxes.
			var master_checkbox = $(settings.master_sub_selector, this)
				.find('input:checkbox')
				.addBack().filter('input:checkbox');

			// The master checkbox is filtered out of the group list here so we don't need to
			// keep checking later.
			var group_checkboxes = $(this).find('input:checkbox').not(master_checkbox);

			// Only set up the click events if we have identified exactly one master checkbox and at least
			// one other checkbox in the group.
			if (master_checkbox.length == 1 && group_checkboxes.length >= 1) {
				// If the master checkbox is toggled, then set all other checkboxes in the group
				// to the same state.

				// Store the group checkboxes against the master checkbox.
				master_checkbox.data(settings.group_key_name, group_checkboxes);

				// Store the group against any group checkbox, including the master.
				group_checkboxes
					.data(settings.group_key_name, group_checkboxes)
					.data(settings.master_key_name, master_checkbox);

				master_checkbox.click(function() {
					var status = this.checked;

					$.data(this, settings.group_key_name).each(function() {
						$(this).prop('checked', status);
					});
				});

				group_checkboxes.click(function() {
					// If all checkboxes are checked, then make sure the master is checked,
					// otherwise the master should be unchecked.

					// The state we want to put the master checkbox into.
					// True if all non-master checkboxes are selected.
					var master_status = true;

					$(this).data(settings.group_key_name).each(function() {
						// If this checkbox is not checked, and we are not
						// looking at the master checkbox, then the master needs to be unchecked.
						if (this.checked == false) {
							master_status = false;

							// No need to look any further.
							return false;
						}
					});

					// Change the master 'checked' status if it needs changing.
					if (master_status !== master_checkbox[0].checked) {
						$(this).data(settings.master_key_name).prop('checked', master_status);
					}
				});
			}

			// Support chaining.
			return this;
		});
	};
}(jQuery));

