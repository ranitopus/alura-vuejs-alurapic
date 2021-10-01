<template>
  <div class="register-container">
    <h1 class="centered-text page-title">Cadastro</h1>

    <h2 class="centered-text" v-if="foto._id">Editando Foto</h2>
    <h2 class="centered-text" v-else>Nova Foto</h2>

    <h3 class="centered-text">{{ foto.titulo }}</h3>

    <form @submit.prevent="savePhoto()">
      <div class="input-control">
        <label for="titulo">TÍTULO</label>
        <input
          id="titulo"
          name="titulo"
          autocomplete="off"
          v-model="foto.titulo"
          v-validate
          data-vv-as="Título"
          data-vv-rules="required|min:3|max:50"
        />
        <span class="error" v-show="errors.has('titulo')">
          {{ errors.first('titulo') }}
        </span>
      </div>

      <div class="input-control">
        <label for="url">URL</label>
        <input
          id="url"
          name="url"
          autocomplete="off"
          v-model="foto.url"
          v-validate
          data-vv-as="URL"
          data-vv-rules="required"
        />
        <span class="error" v-show="errors.has('url')">
          {{ errors.first('url') }}
        </span>
        <responsive-img
          v-show="foto.url"
          :url="foto.url"
          :title="foto.titulo"
        />
      </div>

      <div class="input-control">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centered-text">
        <my-button text="GRAVAR" type="submit"/>
        <router-link :to="{name: 'Home'}">
          <my-button text="VOLTAR" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import Foto from '../../domain/foto/Foto';

  import FotoService from '../../domain/foto/FotoService';

  import ResponsiveImage from '../shared/ResponsiveImage'
  import Button          from '../shared/Button';

  export default {
    components: {
      'responsive-img': ResponsiveImage,
      'my-button':      Button
    },
    data() {
      return {
        foto: new Foto(),
        id:   this.$route.params.id
      };
    },
    created() {
      this.service = new FotoService(this.$resource);

      if (this.id) {
        this.service.search(this.id).then(data => (
          this.foto = data
        ));
      }
    },
    methods: {
      savePhoto() {
        this.$validator.validateAll().then(success => {
          if (success) {
            this.service.save(this.foto).then(() => {
              if (this.id) this.$router.push({name: 'Home'});
              this.foto = new Foto();
            });
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/vars.scss";

  .register-container {
    .input-control {
      font-size:     1.2em;
      margin-bottom: 20px;

      label {
        display:     block;
        font-weight: bold;
      }

      label + input, textarea {
        width:         100%;
        font-size:     inherit;
        border-radius: 5px;
      }

      .error {
        color:       $danger-color;
        font-size:   0.875rem;
        font-weight: bold;
      }
    }
  }
</style>
