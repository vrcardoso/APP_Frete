<template>
    <v-navigation-drawer   expand-on-hover rail class="bg-blue-grey">
        <template v-slot:image>
                <v-img
                height="1080"
                src="https://cdn.leonardo.ai/users/3d33355b-5659-41ea-a819-f1ac6be24d5f/generations/5c739b59-ff1b-4a12-9c00-cdaed35120d3/DreamShaper_v7_Realistic_photo_of_Packages_are_being_loaded_in_1.jpg"
                cover
                class="imgTruck">
                </v-img>
            </template>
        <v-list>
            <v-list-item
            prepend-avatar="https://cdn.leonardo.ai/users/4bb8d8e8-1f29-46b0-9cd1-760e5ac1fb6f/generations/407d82d7-2655-4a4c-b949-c11f78ab8877/variations/Default_blue_green_color_logo_minimalist_vector_art_logo_illus_3_407d82d7-2655-4a4c-b949-c11f78ab8877_1.jpg"
            title="Apolos"
            subtitle="apolos_a88@gmailcom">
            </v-list-item>
           
        </v-list>

         <v-divider></v-divider>
         
        <v-list nav>
             
            <v-list-item
            prepend-icon="mdi-package-variant"
            title="Produtos"
            link="true"
            to="https://www.google.com/"
            > 
            </v-list-item>
             
            <v-list-item
            prepend-icon="mdi-car-estate"
            title="Veiculos"> 
            </v-list-item>
             
            <v-list-item
            prepend-icon="mdi-truck-delivery"
            title="Fretes"> 
            </v-list-item>

            <v-list-item
            prepend-icon="mdi-history"
            title="Historico">
            </v-list-item>

            <v-list-item
            prepend-icon="mdi-account-circle"
            title="Usuarios">
            </v-list-item>
        </v-list>
      

        <template v-slot:append>
            <v-divider></v-divider>
            <v-list>
                <v-list-item
                prepend-icon="mdi-account-cog-outline"
                title="Account">
                </v-list-item>
                <v-list-item
                prepend-icon="mdi-reply-outline"
                title="Logout">
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script>
export default {
    name:'MenuApp'
}
</script>

<style>

.imgTruck{
        opacity: 0.3;
    }

</style>