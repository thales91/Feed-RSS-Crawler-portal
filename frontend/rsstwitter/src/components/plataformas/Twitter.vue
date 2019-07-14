<template>
    <div class="row">
        <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Twitter Keys</h4>
                      <p class="card-description">
                        Chaves de acesso a sua conta no Twitter
                      </p>
                      <form class="forms-sample">
                        <input type="hidden" v-model="keys._id" id="_id">
                        <div class="form-group">
                          <label for="consumer_key">Consumer Key</label>
                          <input type="text" class="form-control" v-model="keys.consumer_key" id="consumer_key" placeholder="Consumer Key">
                        </div>
                        <div class="form-group">
                          <label for="consumer_secret">Consumer Secret</label>
                          <input type="text" class="form-control" v-model="keys.consumer_secret" id="consumer_secret" placeholder="Consumer Secret">
                        </div>
                        <div class="form-group">
                          <label for="access_token_key">Access Token Key</label>
                          <input type="text" class="form-control" v-model="keys.access_token_key" id="access_token_key" placeholder="Access Token Key">
                        </div>
                        <div class="form-group">
                          <label for="access_token_secret">Access Token Secret</label>
                          <input type="text" class="form-control" v-model="keys.access_token_secret" id="access_token_secret" placeholder="Access Token Secret">
                        </div>
                        <button class="btn btn-outline-success mr-2" type="button" @click="save">Enviar</button>
                        <button class="btn btn-outline-light" @click="reset">Cancelar</button>
                      </form>
                    </div>
                  </div>
                </div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from 'axios'
export default {
  
    name: 'Twitter',
    data: () =>
    {
        return{
            mode: 'save',
            keys:{}
        } 
    },
    methods:{
        loadkeys(){
          
            const url = `${baseApiUrl}/plataforma/twitter`
            axios.get(url).then(res => {
                if (res.data){
                this.keys = res.data
              }
              else{
                this.keys = {}
              }
            }).catch(showError)
        },
        reset(){
            this.keys = {}
            this.loadkeys()
        },
        save()
        {
            const method = this.keys._id != null ? 'put' : 'post'
            axios[method](`${baseApiUrl}/plataforma/twitter`, this.keys)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    watch:{
        page(){
          this.loadkeys()
        }
    },
    mounted()
    {
      this.loadkeys();
    }
}
</script>

<style>

</style>
