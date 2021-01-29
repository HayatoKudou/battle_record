export const frontUrl = 'https://gamer-lab.net';
export const serverUrl = 'https://auth.gamer-lab.net';
export const copyright = 'gamer-lab.net';

//日付フォーマット
export function dateFormat(date, format) {
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, date.getMonth() + 1);
    format = format.replace(/DD/, date.getDate());
    format = format.replace(/HH/, date.getHours());
    format = format.replace(/MM/, date.getMinutes());
    return format;
}

export function diffDate(t1){
    var date = new Date(t1);
    let t2 = new Date();
    let diff = t2.getTime() - date.getTime();
    //HH部分取得
    let diffHour = diff / (1000 * 60 * 60);
    //MM部分取得
    let diffMinute = (diffHour - Math.floor(diffHour)) * 60;
    if(('00' + Math.floor(diffHour)).slice(-2) === '00'){
        return ('00' + Math.floor(diffMinute)).slice(-2) + '分前';
    } else {
        return ('00' + Math.floor(diffHour)).slice(-2) + '時間' + ('00' + Math.floor(diffMinute)).slice(-2) + '分前';
    }
}

//0埋め
export function zeroPadding(num,length){
    return ('0000000000' + num).slice(-length);
}

export function reloadPage(){
    window.location.reload();
}