<template>
    <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="cabecalho">
                    <div class="actions">
                     <h4 class="card-title">Posts</h4>
                  <p class="card-description">
                    Posts Cadastrados
                  </p></div>
                  <div class="actions">
                    <router-link to="/post" class="btn btn-icons btn-rounded btn-outline-success"><i class="fa fa-plus"></i></router-link>
                  </div>
                  </div>
                 
                  <div class="table-responsive">
                    <Grid :data-items="posts" 
                      :columns="fields" 
                      :pageable="true"
                      :skip= "skip"
                      :take="take"
                      :total="total"
                      @rowclick="onRowClick"
                      @pagechange="pageChangeHandler"></Grid>
                  </div>
                </div>
              </div>
            </div>
</template>

<script>
import { baseApiUrl, showError} from '@/global'
import axios from 'axios'

import { Grid } from "@progress/kendo-vue-grid";
export default {
    name: 'ListaPost',
    components:{
      Grid
    },
    data: () =>{
        return {
            mode: 'save',
            skip: 0,
            take: 10,
            total: 0,
            posts: [],
            fields: [
            {field: 'title', title: 'titulo', sortable: true},      
            {field: 'processado', title:'Postado'}]
        }
    },
    methods:{
        loadPosts(){
            const url = `${baseApiUrl}/post`
            axios.get(url).then(res => {
                this.posts = res.data
                this.total = res.total
           }).catch(showError)
        },
        onRowClick(event)
        {
          this.$router.push(`/post/${event.dataItem._id}`)  
        },
        pageChangeHandler(event){
          this.skip = event.page.skip
          this.take = event.page.take
            const url = `${baseApiUrl}/post?skip=${event.page.skip}&limit=10`
            axios.get(url).then(res => {
                this.posts = res.data
                
            }).catch(showError)       
        }
       
    },  
    mounted()
    {
      this.loadPosts();
    }
}
</script>

<style>
.cabecalho{
    
    display: flex;
    justify-content: space-between;
}

</style>
