const loginForm = document.getElementById('loginForm');

loginForm.onsubmit = function (e) {
    e.preventDefault();
    if (loginForm['email'].value === '') {
        alert('이메일을 입력해 주세요.');
        loginForm['email'].focus();
        return false;
    }
    if (!new RegExp('^(?=.{4,50}$)([\\da-z_\\-.]{4,})@([\\da-z][\\da-z\\-]*[\\da-z]\\.)?([\\da-z][\\da-z\\-]*[\\da-z])\\.([a-z]{2,15}\\.)?([a-z]{2,3})$').test(loginForm['email'].value)) {
        alert('올바른 이메일을 입력해 주세요.');
        loginForm['email'].focus();
        loginForm['email'].select();
        return false;
    }
    if (loginForm['password'].value === '') {
        alert('비밀번호를 입력해 주세요.');
        loginForm['password'].focus();
        return false;
    }
    if (!new RegExp('^([\\da-zA-Z`~!@#$%^&*()\\-_=+\\[{\\]}\\\\|;:\'",<.>/?]{4,50})$').test(loginForm['password'].value)) {
        alert('올바른 비밀번호를 입력해 주세요.');
        loginForm['password'].focus();
        loginForm['password'].select();
        return false;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', loginForm['email'].value);
    formData.append('password', loginForm['password'].value);
    xhr.onreadystatechange = function (){
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if (xhr.status >= 200 && xhr.status < 300){
            const responseObject = JSON.parse(xhr.responseText);
            switch (responseObject['result']){
                case 'failure':
                    alert('이메일 혹은 비밀번호가 올바르지 않습니다.');
                    loginForm['email'].focus();
                    loginForm['email'].select();
                    break;
                case 'failure_suspended':
                    alert('해당 계정은 이용이 정지된 계정입니다. 관리자에게 문의해 주세요');
                    break;
                case 'success':
                    location.href = './my';
                    break;
                default:
                    alert('서버가 알수 없는 응답을 반환하였습니다. 잠시 후 다시 시도해 주세요')
            }
        } else {
            alert('서버와 통신하는 도중 오류가 발생하였습니다. 잠시후 다시 시도해 주세요')
        }
    };
    xhr.open('POST', './login');
    xhr.send(formData)
}