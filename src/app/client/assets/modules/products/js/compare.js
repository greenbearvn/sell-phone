$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    $('#keyword_compare').on('keyup',debounce(function(){
        let key = $(this).val();
        let name = $(this).attr('data-name');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/index.php?module=products&view=cat&raw=1&task=ajax_compare_search',
            data: {key,name},
            success: function (data) {
                if(data.error === false){
                    $('.list-compare-search').html(data.html).addClass('active');
                } else{
                    if ($('.alert_error').css('display') == 'none')
                        $('.alert_error').html(data.message).fadeIn().delay(1500).fadeOut();
                }
            }
        });
    }));
})

function debounce(func, wait = 300, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

$(document).on('click','.a_compare',function(){
    let id = $(this).attr('data-id');
    let name = $('#cat_name').val();
    let products = $('#products').val();
    let url = $('#url_compare').val()
    let type = 1;
    ajax_compare(id,name,products,url,type);
})

$(document).on('click','.del_compare',function(){
    let id = $(this).attr('data-id');
    let name = $('#cat_name').val();
    let products = $('#products').val();
    let url = $('#url_compare').val()
    let type = 0;
    ajax_compare(id,name,products,url,type);
    
})

function ajax_compare(id,name,products,url,type){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/index.php?module=products&view=compare&raw=1&task=ajax_compare',
        data: {id,name,products,url,type},
        success: function (data) {
            $('#compare-detail').html(data.html);
            window.history.propertyIsEnumerable(null, null, data.url);
            if(data.total < 3)
                $('.compare-title a').css('display','flex');
            else     
                $('.compare-title a').css('display','none');
            $('#modalCompare').modal('hide');
        }
    });
}