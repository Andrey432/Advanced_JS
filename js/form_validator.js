const name_input = '#name';
const phone_input = '#phone';
const email_input = '#email';
const message_input = '#plaintext';

const name_reg = /[a-zа-я]+/iu;
// +7 (000) 000-00-00    +7(000)0000000    +7 (000)000-0000    +7 (000) 000 00 00
const phone_reg = /\+7[ ]*\([\d]{3}\)[ ]*\d{3}([- ]?\d{2}){2}/;
const email_reg = /[\w\.-]+@[\w_а-яё]+\.[\w]{2,5}/iu;


function _checkField(field, reg, hint) {
    if (!field.value.match(reg)) {
        console.log(field.value);
        if (!field.classList.contains('incorrect-input')) {
            field.insertAdjacentHTML('beforebegin', `<p class="error-hint">${hint}</p>`);
            field.classList.toggle('incorrect-input');
        }
        return false;
    }
}


function validate() {
    _checkField(document.querySelector(name_input), name_reg, 'Incorrect name');
    _checkField(document.querySelector(phone_input), phone_reg, 'Incorrect phone');
    _checkField(document.querySelector(email_input), email_reg, 'Incorrect email');
    _checkField(document.querySelector(message_input), /.+?/, 'Incorrect message');
}
