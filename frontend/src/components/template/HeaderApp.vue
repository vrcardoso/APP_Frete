<template>
    <v-app-bar scroll-behavior="elevate" class="bg-brown">
            <template v-slot:image>
                <v-img
                src="https://cdn.leonardo.ai/users/3d33355b-5659-41ea-a819-f1ac6be24d5f/generations/5c739b59-ff1b-4a12-9c00-cdaed35120d3/DreamShaper_v7_Realistic_photo_of_Packages_are_being_loaded_in_1.jpg"
                cover
                class="imgTruck">
                </v-img>
            </template>

                <template v-slot:prepend>
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>
                </template>
                

                <v-app-bar-title>Titulo</v-app-bar-title>
                
                <v-spacer></v-spacer>
                 <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>
</template>

<script>
export default {
    name:'HeaderApp'
}
</script>

<style>
    .imgTruck{
        opacity: 0.5;
    }
</style>