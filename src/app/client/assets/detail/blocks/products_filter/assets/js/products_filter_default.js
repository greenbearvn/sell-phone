$(document).ready(function () {
    $('.close-all-btn').click(function () {
        $(this).parents('.dropdown').find('button.dropdown-toggle').dropdown('toggle');
        $('.bg').toggleClass('active');
        $('html body').toggleClass('flow-hidden');
        $('.mb-fix').toggleClass('fix-filter');
    });

    $('.btnFilterAll').click(function () {
        $('.bg').toggleClass('active');
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".filterAll").offset().top - 70
        }, 800);
        $('html body').toggleClass('flow-hidden');
        $('.mb-fix').toggleClass('fix-filter');
    });

    $('.bg').click(function () {
        $(this).toggleClass('active');
        $('html body').toggleClass('flow-hidden');
    });

    $('.fi_all').change(function () {
        let value = $(this).val();
        let field = $(this).attr('data-field');
        let cid = $('#cid').val();
        let title = $(this).attr('data-title');
        $('#filer_submit').html('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>').addClass('none');
        $('#submit_item_' + field).html('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>').addClass('none');
        if ($(this).prop("checked") == true) {
            add_filter(cid, value, field, 1, title);
        }
        else if ($(this).prop("checked") == false) {
            add_filter(cid, value, field, 0, '');
            $('.list-filter-exist #' + field + '-' + value).remove();
        }
    });

    $('.btn-custom').click(function(){
        let check = $(this).attr('data-check');
        let value = $(this).attr('data-value');
        let field = $(this).attr('data-field');
        let cid = $('#cid').val();
        let title = $(this).attr('data-title');
        if(check == 1){
            $(this).attr('data-check',0);
            add_filter(cid, value, field, 0, title);
            $('.list-filter-exist #' + field + '-' + value).remove();
        } else{
            $(this).attr('data-check',1);
            add_filter(cid, value, field, 1, title); 
        }
    })

    if ($(window).width() <= 769) {
        $('.btn.dropdown-toggle').click(function () {
            if($(this).attr('aria-expanded') == 'true'){
                $('html body').removeClass('flow-hidden');
            } else
                $('html body').addClass('flow-hidden');
        });

        $(document).on('click','.dropdown-backdrop',function () {
            $('html body').removeClass('flow-hidden');
        })
    }

});

$(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
});

function add_filter(cid, value, field, type, title) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/index.php?module=products&view=cat&raw=1&task=ajax_filter',
        data: '&cid=' + cid + '&value=' + value + '&field=' + field + '&type=' + type,
        success: function (data) {
            // console.log(data);
            if (data.count == 0)
                $('#count_filter').attr('data-count', data.count).html(data.count).addClass('none');
            else
                $('#count_filter').attr('data-count', data.count).html(data.count).removeClass('none');
            if (type == 0) {
                $('#' + field + '-' + value).remove();
                $('#' + field + '-' + value + '_all').prop('checked', false);
                $('#' + field + '-' + value + '_item').prop('checked', false);
            } else if (type == 1) {
                $('#' + field + '-' + value + '_item').prop('checked', true);
                $('#' + field + '-' + value + '_all').prop('checked', true);
                let row = `
                <span id="${field}-${value}" class="a_exist" onclick='add_filter("${cid}","${value}","${field}","0","")'>
                      ${title}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg>
                </span>
                `;
                $('.list-filter-exist').append(row);
            }
            $('#area_item_' + field).removeClass('none');
            $('#submit_item_' + field).attr('href', data.link).html('Xem ' + data.total + ' kết quả').removeClass('none');
            $('#filer_submit').attr('href', data.link).html('Xem ' + data.total + ' kết quả').removeClass('none');

        }
    });
}