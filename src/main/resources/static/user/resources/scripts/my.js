const addressFinder = document.getElementById('addressFinder');

addressFinder.show = function () {
    new daum.Postcode({
        width: '100%',
        height : '100%',
        oncomplete: function (e){
            myForm['addressPostal'].value = e['zonecode'];
            myForm['addressPrimary'].value = e['roadAddress'];
            myForm['addressSecondary'].focus();
            myForm['addressSecondary'].select();
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

const myForm = document.getElementById('myForm');

myForm['addressFind'].onclick = function (){
    addressFinder.show();
}

myForm.onsubmit = function(e) {
    e.preventDefault();

    if (myForm['password'].value === '') {
        alert('현재 비밀번호를 입력해 주세요.');
        myForm['newPassword'].focus();
        return false;
    }
    if (!new RegExp('^([\\da-zA-Z`~!@#$%^&*()\\-_=+\\[{\\]}\\\\|;:\'",<.>/?]{4,50})$').test(myForm['password'].value)) {
        alert('올바른 현재 비밀번호를 입력해 주세요.');
        myForm['password'].focus();
        myForm['password'].select();
        return false;
    }

    if (myForm['passwordChange'].checked){
        if (myForm['newPassword'].value === '') {
            alert('새 비밀번호를 입력해 주세요.');
            myForm['newPassword'].focus();
            return false;
        }
        if (!new RegExp('^([\\da-zA-Z`~!@#$%^&*()\\-_=+\\[{\\]}\\\\|;:\'",<.>/?]{4,50})$').test(myForm['newPassword'].value)) {
            alert('새 올바른 비밀번호를 입력해 주세요.');
            myForm['newPassword'].focus();
            myForm['newPassword'].select();
            return false;
        }
        if (myForm['newPasswordCheck'].value === '') {
            alert('새 비밀번호를 한 번 더 입력해 주세요.');
            myForm['newPasswordCheck'].focus();
            return false;
        }
        if (myForm['newPassword'].value !== myForm['newPasswordCheck'].value) {
            alert('새 비밀번호가 일치하지 않습니다. 한 번 더 확인해 주세요.');
            myForm['newPasswordCheck'].focus();
            myForm['newPasswordCheck'].select();
            return false;
        }
    }

    if (myForm['nickname'].value === '') {
        alert('닉네임을 입력해 주세요.');
        myForm['nickname'].focus();
        return false;
    }
    if (!new RegExp('^([\\da-zA-Z가-힣]{2,10})$').test(myForm['nickname'].value)) {
        alert('올바른 닉네임을 입력해 주세요.');
        myForm['nickname'].focus();
        myForm['nickname'].select();
        return false;
    }
    if (myForm['contactFirst'].value === '') {
        alert('연락처를 입력해 주세요.');
        myForm['contactFirst'].focus();
        return false;
    }
    if (!new RegExp('^(010)$').test(myForm['contactFirst'].value)) {
        alert('올바른 연락처를 입력해 주세요.');
        myForm['contactFirst'].focus();
        myForm['contactFirst'].select();
        return false;
    }
    if (myForm['contactSecond'].value === '') {
        alert('연락처를 입력해 주세요.');
        myForm['contactSecond'].focus();
        return false;
    }
    if (!new RegExp('^([\\d]{3,4})$').test(myForm['contactSecond'].value)) {
        alert('올바른 연락처를 입력해 주세요.');
        myForm['contactSecond'].focus();
        myForm['contactSecond'].select();
        return false;
    }
    if (myForm['contactThird'].value === '') {
        alert('연락처를 입력해 주세요.');
        myForm['contactThird'].focus();
        return false;
    }
    if (!new RegExp('^([\\d]{4})$').test(myForm['contactThird'].value)) {
        alert('올바른 연락처를 입력해 주세요.');
        myForm['contactThird'].focus();
        myForm['contactThird'].select();
        return false;
    }
    if (myForm['addressPostal'].value === '' || myForm['addressPrimary'].value === '') {
        alert('주소 찾기를 통해 주소를 입력해 주세요.');
        myForm['addressFind'].focus();
        return false;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', myForm['email'].value);
    formData.append('password', myForm['password'].value);
    formData.append('nickname', myForm['nickname'].value);
    formData.append('contactFirst', myForm['contactFirst'].value);
    formData.append('contactSecond', myForm['contactSecond'].value);
    formData.append('contactThird', myForm['contactThird'].value);
    formData.append('addressPostal', myForm['addressPostal'].value);
    formData.append('addressPrimary', myForm['addressPrimary'].value);
    formData.append('addressSecondary', myForm['addressSecondary'].value);
    if(myForm['passwordChange'].checked){
        formData.append('newPassword', myForm['newPassword'].value);
    }
    xhr.onreadystatechange = function (){
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if (xhr.status >=200 && xhr.status < 300){
            const responseObject = JSON.parse(xhr.responseText);
            switch (responseObject['result']){
                case 'failure':
                    alert('알수 없는 이유로 회원정보 수정에 실패하였습니다. 다음에 시도하여 주십시오')
                    break;
                case 'failure_duplicate_nickname':
                    alert('해당 닉네임은 이미 사용중인 닉네임입니다.')
                    myForm['nickname'].focus();
                    myForm['nickname'].select();
                    break;
                case 'failure_duplicate_contact':
                    alert('해당 연락처는 이미 사용 중입니다.')
                    myForm['contactSecond'].focus();
                    myForm['contactSecond'].select();
                    break;
                case 'success':
                    alert('성공적으로 회원정보를 수정 하였습니다.')
                    location.href = './login';
                    break;
                default:
                    alert('알수 없는 이유로 회원가입에 실패하였습니다. 다음에 시도하여 주십시오')
            }
        } else {
            alert('서버와 통신하는 도중 오류가 발생하였습니다. 잠시후 다시 시도해 주세요')
        }
    }
    xhr.open('PATCH' , './my');
    xhr.send(formData);
}