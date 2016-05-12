        $(function () {

            $('body').on('click', '.list-group .canBeClicked', function () {
                $(this).toggleClass('active');
            });
            $('button').click(function () {
                var $button = $(this), actives = '';
                if ($button.hasClass('move-team-1')) {
                    actives = $('.list-main ul li.active');
                    actives.removeClass('active');
                    actives.clone().appendTo('.list-team-1 ul');
                    actives.remove();
                } else if ($button.hasClass('move-team-2')) {
                    actives = $('.list-main ul li.active');
                    actives.removeClass('active');
                    actives.clone().appendTo('.list-team-2 ul');
                    actives.remove();
                }
            });
            // $('.dual-list .selector').click(function () {
            //     var $checkBox = $(this);
            //     if (!$checkBox.hasClass('selected')) {
            //         $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
            //         $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
            //     } else {
            //         $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
            //         $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
            //     }
            // });
            // $('[name="SearchDualList"]').keyup(function (e) {
            //     var code = e.keyCode || e.which;
            //     if (code == '9') return;
            //     if (code == '27') $(this).val(null);
            //     var $rows = $(this).closest('.dual-list').find('.list-group li');
            //     var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
            //     $rows.show().filter(function () {
            //         var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            //         return !~text.indexOf(val);
            //     }).hide();
            // });

        });