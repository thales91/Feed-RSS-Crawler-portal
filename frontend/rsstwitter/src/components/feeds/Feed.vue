<template>
    <div class="row">
        <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Feed</h4>
                      <p class="card-description">
                        Configure o feed RSS aqui
                      </p>
                      <form class="forms-sample">
                        <input type="hidden" v-model="feed._id" id="_id">
                        <div class="form-group">
                          <label for="nome">Nome</label>
                          <input type="text" class="form-control" v-model="feed.nome" id="nome" placeholder="Nome">
                        </div>
                        <div class="form-group">
                          <label for="url">URL</label>
                          <input type="text" class="form-control" v-model="feed.url" id="url" placeholder="URL">
                        </div>
                        <div class="form-check form-check-flat">
                            <label class="form-check-label">
                              <input type="checkbox" class="form-check-input" v-model="feed.ativo"> Ativo
                            <i class="input-helper"></i></label>
                        </div>
                        <button class="btn btn-outline-success mr-2" type="button" @click="save">Enviar</button>
                        <button class="btn btn-outline-light" @click="reset"  type="button">Cancelar</button>
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
            feed:{}
        } 
    },
    methods:{
        loadfeed(){
          if (this.$route.params.id){
              const url = `${baseApiUrl}/feed/${this.$route.params.id}`
              axios.get(url).then(res => {
                  if (res.data){
                  this.feed = res.data
                }
                else{
                  this.feed = {}
                }
              }).catch(showError)
            }
        },
        reset(){
            this.feed = {}
            this.loadfeed()
            this.$router.push('/feeds')
        },
        save()
        {
            const method = this.feed._id != null ? 'put' : 'post'
            axios[method](`${baseApiUrl}/feed`, this.feed)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    watch:{
        page(){
          this.loadfeed()
        }
    },
    mounted()
    {
      this.loadfeed();
    }
}
</script>

<style>

</style>
