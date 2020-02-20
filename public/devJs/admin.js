$(document).ready(() => {
    $('#transferEther').on('click', () => {
        $.ajax({
            url:'/admin',
            type:'POST',
            success:function(data){
                alert(data.message);
            },
            error:function(data){
                alert(data.message);
            }
        })
    });
});
