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
                window.localStorage.setItem("username",data.username);
                if(data.username === "Harshal@gmail.com"){
                    window.location.href='/admin';
                }
                else{
                    window.location.href='/feedback';
                }
                
            },
            error:function(data){
                alert(data.message);
            }
        });
    });
});