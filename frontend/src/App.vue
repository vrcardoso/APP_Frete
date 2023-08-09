<template>
  <v-app>
      
    <HeaderApp />  
    <MenuApp />
    <ContentApp />
    <FooterApp/>
        
  </v-app>     
  
</template>

<script>
import HeaderApp from './components/template/HeaderApp.vue'
import MenuApp from './components/template/MenuApp.vue'
import ContentApp from './components/template/ContentApp.vue'
import FooterApp from './components/template/FooterApp.vue'


export default {
  name: 'App',

  components: {
    HeaderApp,
    MenuApp,
    ContentApp,
    FooterApp
  },

  data: () => ({
    //
  }),
}
</script>

<style>
  *{
    font-family: 'Asap', sans-serif;
    font-family: 'Roboto', sans-serif;
  }

  body{
    margin: 0;
  }

</style>
