<template>
    <div class="row">
        <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">post</h4>
                      <p class="card-description">
                        Configure o post RSS aqui
                      </p>
                      <form class="forms-sample">
                        <input type="hidden" v-model="post._id" id="_id">
                        <div class="form-group">
                          <label for="titulo">Titulo</label>
                          <input type="text" class="form-control" v-model="post.title" id="titulo" placeholder="Titulo">
                        </div>
                        <div class="form-group">
                          <label for="url">URL</label>
                          <input type="text" class="form-control" v-model="post.link" id="url" placeholder="URL" disabled>
                        </div>
                        <div class="form-check form-check-flat">
                            <label class="form-check-label">
                              <input type="checkbox" class="form-check-input" v-model="post.processed" disabled> Processado
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
  
    name: 'Post',
    data: () =>
    {
        return{
            mode: 'save',
            post:{}
        } 
    },
    methods:{
        loadPost(){
          if (this.$route.params.id){
              const url = `${baseApiUrl}/post/${this.$route.params.id}`
              axios.get(url).then(res => {
                  if (res.data){
                  this.post = res.data
                }
                else{
                  this.post = {}
                }
              }).catch(showError)
            }
        },
        reset(){
            this.post = {}
            this.loadPost()
            this.$router.push('/posts')
        },
        save()
        {
            const method = this.post._id != null ? 'put' : 'post'
            axios[method](`${baseApiUrl}/post`, this.post)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    watch:{
        page(){
          this.loadPost()
        }
    },
    mounted()
    {
      this.loadPost();
    }
}
</script>

<style>

</style>
