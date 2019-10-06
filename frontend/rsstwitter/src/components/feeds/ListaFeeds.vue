<template>
    <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="cabecalho">
                    <div class="actions">
                     <h4 class="card-title">Feeds</h4>
                  <p class="card-description">
                    Feeds Cadastrados
                  </p></div>
                  <div class="actions">
                    <router-link to="/feed" class="btn btn-icons btn-rounded btn-outline-success"><i class="fa fa-plus"></i></router-link>
                  </div>
                  </div>
                 
                  <div class="table-responsive">
                    <Grid :data-items="feeds" :columns="fields" @rowclick="onRowClick"></Grid>
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
    name: 'ListaFeed',
    components:{
      Grid
    },
    data: () =>{
        return {
            mode: 'save',
            feeds: [],
            fields: [
            {field: 'nome', title: 'Nome', sortable: true},
            {field: 'TotalPosts', title: 'Quantidade', sortable: true},
            {field: 'quantidadeProcessado', title: 'Quantidade Processado'},        
            {field: 'ativo', title:'Ativo'}]
        }
    },
    methods:{
        loadFeeds(){
            const url = `${baseApiUrl}/feed`
            axios.get(url).then(res => {
                this.feeds = res.data
            }).catch(showError)
        },
        onRowClick(event)
        {
          this.$router.push(`/feed/${event.dataItem._id}`)  
        },
       
    },  
    mounted()
    {
      this.loadFeeds();
    }
}
</script>

<style>
.cabecalho{
    
    display: flex;
    justify-content: space-between;
}

</style>
