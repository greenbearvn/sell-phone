

function submit_comment()
{
	
}

 $("document").ready(function(){
     var alert_info = $('#alert_info').val();
     alert_info1 = alert_info ? JSON.parse(alert_info) : [];
     $('#submitbt').click(function(){
        if(!notEmpty("value","Bạn chưa chọn giá trị nhận xét"))
			return false;
        if(!notEmpty("full_rate","Bạn chưa nhập nhận xét"))
            return false;
        if(!notEmpty("name_rate","Bạn chưa nhập họ tên"))
            return false;
        // if(!notEmpty("email_rate",alert_info1[3]))
        //     return false;
        if(!notEmpty("phone_rate","Bạn chưa nhập số điện thoại"))
            return false;
         if (!isPhone("phone_rate", "Số điện thoại không hợp lệ")) {
             return false;
         }
         if (!lengthMin("phone_rate", 10, 'Số điện thoại phải là 10 số')) {
             return false;
         }
         if (!lengthMax("phone_rate", 10, 'Số điện thoại phải là 10 số')) {
             return false;
         }
   //                  if(!notEmpty("txtCaptcha","Bạn phải nhập mã capcha"))
			// return false;
              document.comment_add_form.submit();
		});
     
    var track_load = 2; //total loaded record group(s)
	var loading  = false; //to prevents multipal ajax loads
	var total_groups = $('#total_page').val(); //total record group(s)
	var recordid = $('#record_id').val(); //total record group(s)
	var url_current = $('#url_current').val(); //total record group(s)
//        alert(total_groups);
//         $(".view-more-cm").click(function(){ //detect page scroll
// 				loading = true; //prevent further ajax loading
// //                                alert("asjdjk");
// //				$('.animation_image').show(); //show loading image
// 				//load data from the server using a HTTP POST request
// 				$.post(url_current+'?raw='+recordid+'&page='+track_load, function(data){
//                                        //hide loading image once data is received
// 					track_load++; //loaded group increment
// 					loading = false; 
//                                         if(data){
//                                          $("#list-comment").append(data); 
//                                             $('.col-rate .star-detail').raty({
//                                              halfShow : true,
//                                                      readOnly: true, 
//                                                      score: function() {
//                                                          return $(this).attr('data-rating');
//                                                        },
//                                                      starOff : 'images/star-empty.png',
//                                                      starOn  : 'images/star-fill.png'
//                                              });  
//                                         }else{
//                                             $(".view-more-cm").hide();
//                                         }
// 					$('.animation_image').hide();
// 				}).fail(function(xhr, ajaxOptions, thrownError) { //any errors?
//                                     alert(thrownError); //alert with HTTP error
//                                     $('.animation_image').hide(); //hide loading image
//                                     loading = false;
				
// 				});
// 	});

$('.view-more-cm').click(function(){
    id = $('#prd_id').val();
    $.ajax({
        type : 'GET',
        dataType: 'html',
        url : '/index.php?module=products&view=product&raw=1&task=all_conment',
        data: "id="+id,
        success : function(data){
            $("#list-comment").html(data);
            $(".comments_contents").addClass('scroll_comment');
            // $("#list-comment_mb").html(data);
            $(".view-more-cm").hide();
        }
    });
})
        
       
});
       