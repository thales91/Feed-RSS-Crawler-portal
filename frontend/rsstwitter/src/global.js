import  vue  from "vue";
export const baseApiUrl = `http://${window.location.hostname}:4000`

export function showError(e){
    if (e && e.response && e.response.data)
    {
        vue.toasted.global.defaultError({msg: e.response.data})
    }
    else if(typeof e === 'string')
    {
        vue.toasted.global.defaultError({msg: e})
    }
    else{
        vue.toasted.global.defaultError();
    } 
}

export function MenuMobile(){
   console.log('menu')
    let menu = document.querySelector('[data-toggle="offcanvas"]') //.addEventListener('click', function() {
   menu.onclick = function (){ 
       console.log('click')
       document.querySelector('.sidebar-offcanvas').classList.toggle('active')
      }
}

export default {baseApiUrl, showError,MenuMobile}