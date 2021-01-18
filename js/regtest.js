// Т.к. ковычка является крайним символом в фразе, с одной из сторон будет пробельный символ или конец строки
// Т.е. хотя бы один символ сбоку от ковычки не должен являться частью слова
const reg = /\B'|'\B/g;


function regtest() {
    let text = document.querySelector(`#input`).innerHTML;
    document.querySelector(`#output`).innerHTML = text.replace(reg, `"`);
}
