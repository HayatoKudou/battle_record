export function webpush(title, options){
    Notification.requestPermission().then((permission) => {
        switch (permission) {
          case 'granted':
            // 許可された場合
            break;
          case 'denied':
            // ブロックされた場合
            break;
          case 'default':
            // 無視された場合
            break;
          default:
            break;
        }
    });
    
    const notification = new Notification(title, options);

    notification.addEventListener('click', (event) => {
        console.dir(event);
    }, false);
}