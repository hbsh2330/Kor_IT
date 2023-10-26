const addressFinder = document.getElementById('addressFinder');

addressFinder.show = function () {
    new daum.Postcode({
        width: '100%',
        height : '100%',
       oncomplete: function (e){
            registerForm['addressPostal'].value = e['zonecode'];
            registerForm['addressPrimary'].value = e['roadAddress'];
            registerForm['addressSecondary'].focus();
            registerForm['addressSecondary'].select();
            addressFinder.hide();
       }
    }).embed(addressFinder.querySelector(':scope > [rel="dialog"]'));
    addressFinder.classList.add('visible');
}

addressFinder.hide = function () {
    addressFinder.classList.remove('visible');
}

addressFinder.querySelector(':scope > [rel="close"]').onclick = function (){
    addressFinder.hide();
}

const registerForm = document.getElementById('registerForm');

registerForm['addressFind'].onclick = function (){
    addressFinder.show();
}

registerForm.onsubmit = function(e) {
    e.preventDefault();

    if (registerForm['email'].value === '') {
        alert('이메일을 입력해 주세요.');
        registerForm['email'].focus();
        return false;
    }
    if (!new RegExp('^(?=.{4,50}$)([\\da-z_\\-.]{4,})@([\\da-z][\\da-z\\-]*[\\da-z]\\.)?([\\da-z][\\da-z\\-]*[\\da-z])\\.([a-z]{2,15}\\.)?([a-z]{2,3})$').test(registerForm['email'].value)) {
        alert('올바른 이메일을 입력해 주세요.');
        registerForm['email'].focus();
        registerForm['email'].select();
        return false;
    }
    if (registerForm['password'].value === '') {
        alert('비밀번호를 입력해 주세요.');
        registerForm['password'].focus();
        return false;
    }
    if (!new RegExp('^([\\da-zA-Z`~!@#$%^&*()\\-_=+\\[{\\]}\\\\|;:\'",<.>/?]{4,50})$').test(registerForm['password'].value)) {
        alert('올바른 비밀번호를 입력해 주세요.');
        registerForm['password'].focus();
        registerForm['password'].select();
        return false;
    }
    if (registerForm['passwordCheck'].value === '') {
        alert('비밀번호를 한 번 더 입력해 주세요.');
        registerForm['passwordCheck'].focus();
        return false;
    }
    if (registerForm['password'].value !== registerForm['passwordCheck'].value) {
        alert('비밀번호가 일치하지 않습니다. 한 번 더 확인해 주세요.');
        registerForm['passwordCheck'].focus();
        registerForm['passwordCheck'].select();
        return false;
    }
    if (registerForm['nickname'].value === '') {
        alert('닉네임을 입력해 주세요.');
        registerForm['nickname'].focus();
        return false;
    }
    if (!new RegExp('^([\\da-zA-Z가-힣]{2,10})$').test(registerForm['nickname'].value)) {
        alert('올바른 닉네임을 입력해 주세요.');
        registerForm['nickname'].focus();
        registerForm['nickname'].select();
        return false;
    }
    if (registerForm['contactFirst'].value === '') {
        alert('연락처를 입력해 주세요.');
        registerForm['contactFirst'].focus();
        return false;
    }
    if (!new RegExp('^(010)$').test(registerForm['contactFirst'].value)) {
        alert('올바른 연락처를 입력해 주세요.');
        registerForm['contactFirst'].focus();
        registerForm['contactFirst'].select();
        return false;
    }
    if (registerForm['contactSecond'].value === '') {
        alert('연락처를 입력해 주세요.');
        registerForm['contactSecond'].focus();
        return false;
    }
    if (!new RegExp('^([\\d]{3,4})$').test(registerForm['contactSecond'].value)) {
        alert('올바른 연락처를 입력해 주세요.');
        registerForm['contactSecond'].focus();
        registerForm['contactSecond'].select();
        return false;
    }
    if (registerForm['contactThird'].value === '') {
        alert('연락처를 입력해 주세요.');
        registerForm['contactThird'].focus();
        return false;
    }
    if (!new RegExp('^([\\d]{4})$').test(registerForm['contactThird'].value)) {
        alert('올바른 연락처를 입력해 주세요.');
        registerForm['contactThird'].focus();
        registerForm['contactThird'].select();
        return false;
    }
    if (registerForm['addressPostal'].value === '' || registerForm['addressPrimary'].value === '') {
        alert('주소 찾기를 통해 주소를 입력해 주세요.');
        registerForm['addressFind'].focus();
        return false;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', registerForm['email'].value);
    formData.append('password', registerForm['password'].value);
    formData.append('nickname', registerForm['nickname'].value);
    formData.append('contactFirst', registerForm['contactFirst'].value);
    formData.append('contactSecond', registerForm['contactSecond'].value);
    formData.append('contactThird', registerForm['contactThird'].value);
    formData.append('addressPostal', registerForm['addressPostal'].value);
    formData.append('addressPrimary', registerForm['addressPrimary'].value);
    formData.append('addressSecondary', registerForm['addressSecondary'].value);

    xhr.onreadystatechange = function (){
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if (xhr.status >=200 && xhr.status < 300){

        } else {
            alert('서버와 통신하는 도중 오류가 발생하였습니다. 잠시후 다시 시도해 주세요')
        }
    }
    xhr.open('POST', './register');
    xhr.send(formData)
}