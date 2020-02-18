$(document).ready(() => {
    $('#login').on('click',() => {
        let data = {
            username : $('#email').val(),
            password : $('#password').val()
        }
        $.ajax({
            url:"/login",
            type:"POST",
            data:data,
            success:function(data) {
                localStorage.setItem("username",data.username);
                alert(data.message);
            },
            error:function(data){
                alert(data.message);
            }
        });
    });
});