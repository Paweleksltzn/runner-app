export function convertBase64ToImage(base64: string) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], {type: 'image/png'});
    let file;
    return file = new File([blob], 'file.png', {type:"image/png"});
    
  }
  