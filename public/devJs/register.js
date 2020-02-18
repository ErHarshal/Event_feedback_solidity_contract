$(document).ready(()=>{
    
    $('#submit').on('click', () => {
        let pswRepeat = document.getElementById('pswRepeat').value;
        if(pswRepeat === document.getElementById('psw').value)
        {
            let data = {
                "email" : document.getElementById('email').value,
                "name" : document.getElementById('name').value,
                "password" : document.getElementById('psw').value,
            }
            $.ajax({
                url:"/register",
                type:"POST",
                data:data,
                success: function(data) {
                    alert(data.message);
                    location.url="/login"
                },
                error: function (data) {
                    alert(data.message);
                }
            });
        }
        else{
            alert("password does not matched !!!");
        }
    });
})