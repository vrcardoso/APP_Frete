<template>
    
    <v-main>
        <v-container fluid>
          <v-row dense>
            <v-col>
                <div class="content">conteudo</div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

  
</template>

<script>
export default {
    name:'ContentApp'
}
</script>

<style>
    .content {
        grid-area: content;
        background-color: white;
        padding: 20px;
    }
</style>