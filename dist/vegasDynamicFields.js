/**
 * @name vegas dynamic fields
 * @copyright by vegas s.
 * @date: 15.08.2018
 * @version  1.0
 *
 */
(function( $ ) {

	$.fn.vegasDynamicFields = function(options) {

		var options = $.extend({

		}, arguments[0] || {});

		var section = this;

		var names = options.names || section.data('names') || false;

		var section_append = section.find('.append-fields');

		var clone_section = section.find('.clone-fields');

		var key = section_append.find('.clone-field').length || 1;

		clone_section.hide();

		section.on('click', '.add-fields', function () {
			getClone(clone_section, section_append);
			return false;
		});

		section.on('click', '.delete-fields', function () {
			if (confirm('Вы действительно хотите удалить эти поля?')) {
				$(this).closest('.clone-field').remove();
			}
			return false;
		});

		var cloned = section_append.find('.clone-fields');
		if (cloned.length > 1) {
			section_append.find('.clone-fields').first().find('.delete-fields').removeClass('delete-fields');
		}

		function getClone(section_clone, section_append) {
			var clone = section_clone.clone();
			clone.css('display', 'block');
			clone.removeClass('clone-fields');
			clone.addClass('clone-field');

			setNames(clone);

			section_append.append(clone);

			return false;
		}

		function setNames(clone)
		{
			if (names) {
				obj = names.split(",");
				var inputs = clone.find('input');
				$.each(inputs, function (index) {
					var input = $(this),
						name = input.attr('name');

					$(this).attr('name', name+'['+key+']['+obj[index]+']');
				});
				key = key + 1;
			}

			return false;
		}

		return this;
	};
})(jQuery);