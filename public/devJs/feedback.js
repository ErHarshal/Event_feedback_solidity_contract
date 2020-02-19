$(document).ready(() => {
    $('#submitFeedback').on('click', () => {
        let data = {
            "f1" : $('#f1').val(),
            "f2" : $('#f2').val(),
            "f3" : $('#f3').val(),
            "username":window.localStorage.getItem('username')
        }
        $.ajax({
            url : '/feedback',
            type : 'POST',
            data : data
        }).then((data) => {
            alert(data.message)
        }).catch((err) => {
            alert(err.message)
        });
    });
});