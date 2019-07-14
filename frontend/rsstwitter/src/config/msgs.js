import vue from "vue";
import vueToaster from "vue-toasted";

vue.use(vueToaster, {
    iconPack: 'fontawesome',
    duration: 3000
})
vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operaçao realizada com sucesso!' : payload.msg,
    { type:'success', icon:'check' } )

    vue.toasted.register(
        'defaultError',
        payload => !payload.msg ? 'Oops.. erro inesperado.' : payload.msg,
        { type:'error', icon:'times' } )