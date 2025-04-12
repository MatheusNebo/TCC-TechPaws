<template>
    <div class="fade-in">
      <section>
        <div class="slider">
    <div class="slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="slide" v-for="(image, index) in images" :key="index">
          <img :src="image" :alt="'Imagem ' + (index + 1)" />
      </div>
    </div>
    <button class="prev btnslider btnlink" @click="prevSlide">&#10094;</button>
    <button class="next btnslider btnlink" @click="nextSlide">&#10095;</button>
  </div>
      </section>
      <section>
        <h2><nuxt-link to="/doacoes">Nos Ajude</nuxt-link></h2>
        <img class="imgsection" src="/components/assets/img/TechPaws1.png" />
      </section>
      <section>
        <h2><nuxt-link to="/voluntariado">Seja um Voluntário</nuxt-link></h2>
        <img class="imgsection" src="/components/assets/img/TechPaws1.png" />
      </section>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      currentIndex: 0,
      images: [
        'https://super.abril.com.br/wp-content/uploads/2018/05/filhotes-de-cachorro-alcanc3a7am-o-c3a1pice-de-fofura-com-8-semanas1.png?quality=70&strip=all&resize=420',
        'https://www.petelegante.com.br/media/dicas/ado%C3%A7%C3%A3o-de-cachorro-filhote.jpg',
        'https://th.bing.com/th/id/R.6d7d6962d00ec278099411a02e244ab0?rik=URmp1dIeR6w9EA&riu=http%3a%2f%2f4.bp.blogspot.com%2f-al8EiuRNSqk%2fVPzDTSt_6cI%2fAAAAAAAAGgU%2fFa4IjwPc_2o%2fs1600%2fN71_5724.JPG&ehk=jFbnkl98b%2fGsceId%2fUfk0WZd5Xl5%2bHMTmXHhD2IMDsk%3d&risl=&pid=ImgRaw&r=0',
      ],
    };
  },
  methods: {
    nextSlide() {
      // Move para o próximo slide
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      // Move para o slide anterior
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
};
  </script>
  
 
  