<template>
  <div class="home-container">
    <h1 class="centered-text page-title">{{ title }}</h1>
    <p
      class="centered-text"
      v-show="message"
      @click="(photos.length > 0) && (message = '')"
    >
      {{ message }}
    </p>

    <input
      type="search"
      class="photos-filter"
      placeholder="Filtre por parte do título"
      v-if="photos.length > 0"
      @input="filter = $event.target.value"
    />

    <ul class="photos-list">
      <li class="photos-list-item"
        v-for="(photo, index) of filteredPhotos"
        :key="photo._id"
      >
        <photo-card :title="photo.title">
          <responsive-img
            v-is-zoomable:click.animate="{
              scale: 3,
              time:  500
            }"
            :url="photo.url"
            :title="photo.title"
          />

          <router-link :to="{name: 'Editar', params: {id: photo._id}}">
            <my-button
              text="ALTERAR"
            />
          </router-link>

          <my-button
            text="REMOVER"
            appearance="danger"
            :has-confirmation="true"
            @executeAction="removePhoto(photo, index)"
          />
        </photo-card>
      </li>
    </ul>
  </div>
</template>

<script>
  import FotoService from "../../domain/foto/FotoService";

  import Zoomable from "../../directives/Zoomable";

  import Card            from '../shared/Card';
  import ResponsiveImage from "../shared/ResponsiveImage";
  import Button          from "../shared/Button";

  export default {
    components: {
      'photo-card':     Card,
      'responsive-img': ResponsiveImage,
      'my-button':      Button
    },
    directives: {
      'is-zoomable': Zoomable
    },
    data: () => ({
      title:   'Alurapic',
      photos:  [],
      filter:  '',
      message: ''
    }),
    created() {
      this.service = new FotoService(this.$resource);

      this.service.list().then(data => (
        this.photos = data.map(({ _id, url, titulo }) => (
          {_id, url, title: titulo}
        ))
      ), error => (
        this.message = error.message
      ));
    },
    computed: {
      filteredPhotos() {
        if (!this.filter) return this.photos;

        const regex = new RegExp(this.filter.trim(), 'i');
        return this.photos.filter(item => regex.test(item.title));
      }
    },
    methods: {
      removePhoto(photo, index) {
        this.service.remove(photo._id).then(() => (
          this.photos.splice(index, 1), this.message = 'Foto removida com sucesso'
        ), error => (
          this.message = error.message
        ));
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home-container {
    .photos-filter {
      display:       block;
      width:         100%;
      height:        2.5rem;
      margin-bottom: 1rem;
      padding:       0.5rem 0.75rem;
    }

    .photos-list {
      list-style: none;

      .photos-list-item {
        display: inline-block;
      }
    }
  }
</style>
