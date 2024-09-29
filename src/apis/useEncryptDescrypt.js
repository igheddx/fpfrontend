
import {useState, useEffect} from "react";
import CryptoJS from 'crypto-js';
const useEncryptDecrypt = () => {

    const [data, setData] = useState('');
    // useEffect(() => {
    //     console.log("i called useEffect")
    //     const data2 = '8216EB35-BB77-49AD-94CA-A7C3520DC464';
    //     const iv = 'F5cEUty4UwQL2EyW';
    //     const key = 'CHqcPp7MN3mTY3nF6TWHdG8dHPVSgJBj';
    
    //     const fkey = CryptoJS.enc.Utf8.parse(key);
    //     const fiv = CryptoJS.enc.Utf8.parse(iv);
    
    //     const enc = CryptoJS.AES.encrypt(data2, fkey, {
    //             iv: fiv,
    //             mode: CryptoJS.mode.CBC,
    //             padding: CryptoJS.pad.Pkcs7,
    //     });
    
    //     const final = enc.ciphertext.toString(CryptoJS.enc.Base64);
    //     setData(final);

    //     console.log("my encryption = " + final )
    
    // }, [])

    
    const getEncryptDecryptWithUserName = async (username) => {
        
        let data2 = ""
        //if  (username == "") {
           // data2 = '8216EB35-BB77-49AD-94CA-A7C3520DC464';
        //} else {
        data2 = username + "|8216EB35-BB77-49AD-94CA-A7C3520DC464";
       // }
        
       console.log("ENCRYP WITH USER NAME", data2)
        const iv = 'F5cEUty4UwQL2EyW';
        const key = 'CHqcPp7MN3mTY3nF6TWHdG8dHPVSgJBj';
    
        const fkey = CryptoJS.enc.Utf8.parse(key);
        const fiv = CryptoJS.enc.Utf8.parse(iv);
    
        const enc = CryptoJS.AES.encrypt(data2, fkey, {
                iv: fiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
        });


    
        const final = enc.ciphertext.toString(CryptoJS.enc.Base64);

        sessionStorage.setItem('xapikey', final)

        console.log("ENCRYPTED WITH USER NAME", final)

        setData(final);

       // console.log("my encryption = " + final )
        
    }
   // return {data, };

    const  getEncryptDecryptNoUserName = async () => {
        
        let data2 = ""
        //if  (username == "") {
            data2 = '8216EB35-BB77-49AD-94CA-A7C3520DC464';
        //} else {
         //   data2 = await username + '|8216EB35-BB77-49AD-94CA-A7C3520DC464';
        //}
        
        const iv = 'F5cEUty4UwQL2EyW';
        const key = 'CHqcPp7MN3mTY3nF6TWHdG8dHPVSgJBj';
    
        const fkey = CryptoJS.enc.Utf8.parse(key);
        const fiv = CryptoJS.enc.Utf8.parse(iv);
    
        const enc = CryptoJS.AES.encrypt(data2, fkey, {
                iv: fiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
        });
    
        const final = enc.ciphertext.toString(CryptoJS.enc.Base64);

        sessionStorage.setItem('xapikeyNoAccessToken', final)
        console.log("ENCRYPTED WITH  NO USER NAME", final)

        setData(final);

       // console.log("my encryption = " + final )
        
    }
    return {data,  getEncryptDecryptNoUserName, getEncryptDecryptWithUserName};
 
 
};

export default useEncryptDecrypt;