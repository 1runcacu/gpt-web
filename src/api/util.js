// import axios from "axios";

// const AJAX = axios.create({
//     baseURL: "/",
//     timeout: 5000,
//     headers:{
//         'Content-Type': 'application/json'
//     }
// });
// 函数节流
export const throttle = function(fn, delay){
    var timer;
    return function () {
        var _this = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay)
    }
}
 
// 函数防抖
export const shakeProof = (fn, time) => {
    var timer;
    return function(){
        var _this = this;
        var args = arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            fn.apply(_this, args);// 用 apply 指向调用 shakeProof 方法的对象，相当于 _this.fn(args);
        }, time);
    }
}
 
function func(e){
    e.preventDefault(); 
}
  
export function lock(e){
    window.addEventListener('touchmove', func, {passive: false});
}
  
export function unlock(e){
    window.removeEventListener('touchmove', func);
}

export function fireKeyEvent(el, evtType, keyCode){
	var doc = el.ownerDocument,
		win = doc.defaultView || doc.parentWindow,
		evtObj;
	if(doc.createEvent){
		if(win.KeyEvent) {
			evtObj = doc.createEvent('KeyEvents');
			evtObj.initKeyEvent( evtType, true, true, win, false, false, false, false, keyCode, 0 );
		}
		else {
			evtObj = doc.createEvent('UIEvents');
			Object.defineProperty(evtObj, 'keyCode', {
		        get : function() { return this.keyCodeVal; }
		    });     
		    Object.defineProperty(evtObj, 'which', {
		        get : function() { return this.keyCodeVal; }
		    });
			evtObj.initUIEvent( evtType, true, true, win, 1 );
			evtObj.keyCodeVal = keyCode;
			if (evtObj.keyCode !== keyCode) {
		        console.log("keyCode " + evtObj.keyCode + " 和 (" + evtObj.which + ") 不匹配");
		    }
		}
		el.dispatchEvent(evtObj);
	} 
	else if(doc.createEventObject){
		evtObj = doc.createEventObject();
		evtObj.keyCode = keyCode;
		el.fireEvent('on' + evtType, evtObj);
	}
}

export function download(name,url){
    const a = document.createElement("a");
    a.setAttribute("download",name);
    a.setAttribute("href",url);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
}

export function uploader(){
    const input = document.createElement("input");
    input.setAttribute("type","file");
    input.setAttribute("accept",".fsl");
    return new Promise((resolve,reject)=>{
        input.onchange = function(e){
            try{
                // console.log(e.target);
                // const file = e.files;
                // console.log(file);
                // if(window.FileReader){
                //     const file = e.files[0];
                //     let reader = new FileReader();
                //     reader.onload=function(){
                //         console.log(reader.result);
                //     }
                //     reader.readAsText(file);
                // }
            }catch(error){
                console.log(error);
            }
        };
        input.click();
    })
}

export function loader(file){
    return new Promise((resolve,reject)=>{
        if(window.FileReader){
            if(file[0]){
                let reader = new FileReader();
                reader.onload=function(){
                    resolve(reader.result);
                }
                reader.readAsText(file[0]);
            }else{
                reject();
            }
        }else{
            reject();
        }
    });
}

export default {
    throttle,
    shakeProof,
    fireKeyEvent,
    unlock,lock
}




