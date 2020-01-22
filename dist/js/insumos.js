new Vue({
    el: "#insumos",
    data: {
      // RUTA CORTA
      url: "https://servidor.costurasximena.cl/",
  
      // FORMULARIOS
      user : '',
  
      // ARRAY'S DE DATOS
      datos_insumo: [],
      datos_tabla: []
    },
  
    mounted() {
      token = localStorage.getItem("user-costuras-ximena");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      this.buscarId();
      this.cargarTabla();
    },
  
    methods: {
      async buscarId() {
        await axios.post(this.url + "api/details").then(
          res => {
            this.user = res.data.success.id;
          },
          err => console.log(err)
        );
      },
      // CARGAR TABLA
      async cargarTabla() {
        axios
          .get(this.url + "api/insumos")
          .then(response => {
            this.datos_tabla = response.data;
          })
          .catch(err => console.log(err));
      },
  
      // NUEVO INSUMO
      nuevoInsumo() {
        // console.log(`
        // NOMBRE_INSUMO       :  ${this.datos_insumo.NOMBRE_INSUMO},
        // CANTIDAD_DISPONIBLE :  ${this.datos_insumo.CANTIDAD_DISPONIBLE},
        // PESO_INSUMO         :  ${this.datos_insumo.PESO_INSUMO},
        // COLOR_INSUMO        :  ${this.datos_insumo.COLOR_INSUMO},
        // DESCRIPCION_INSUMO  :  ${this.datos_insumo.DESCRIPCION_INSUMO},
        // TAMANIO_INSUMO      :  ${this.datos_insumo.TAMANIO_INSUMO},
        // ID_USUARIO          :  ${this.user}
        // `)
        axios
          .post(this.url + "api/insumos", {
            NOMBRE_INSUMO       :  this.datos_insumo.NOMBRE_INSUMO,
            CANTIDAD_DISPONIBLE :  this.datos_insumo.CANTIDAD_DISPONIBLE,
            PESO_INSUMO         :  this.datos_insumo.PESO_INSUMO,
            COLOR_INSUMO        :  this.datos_insumo.COLOR_INSUMO,
            DESCRIPCION_INSUMO  :  this.datos_insumo.DESCRIPCION_INSUMO,
            TAMANIO_INSUMO      :  this.datos_insumo.TAMANIO_INSUMO,
            ID_USUARIO          :  this.user,
          }).then(response => {
            console.log(response);
            this.cargarTabla()
          }).catch(err => {
            console.log(err);
          });
      },
  
      // VER INSUMO
      async verInsumo(ID_INSUMO) {
          console.log(this.datos_insumo);
          axios
            .get(this.url + "api/insumos/" + ID_INSUMO)
            .then(response => {
              this.datos_insumo = response.data[0];
            })
            .catch(err => {
              console.log(err);
            });
      },
  
      // EDITAR INSUMO
      editarInsumo() {
        // console.log(`
        // NOMBRE_INSUMO       :  ${this.datos_insumo.NOMBRE_INSUMO},
        // CANTIDAD_DISPONIBLE :  ${this.datos_insumo.CANTIDAD_DISPONIBLE},
        // PESO_INSUMO         :  ${this.datos_insumo.PESO_INSUMO},
        // COLOR_INSUMO        :  ${this.datos_insumo.COLOR_INSUMO},
        // DESCRIPCION_INSUMO  :  ${this.datos_insumo.DESCRIPCION_INSUMO},
        // TAMANIO_INSUMO      :  ${this.datos_insumo.TAMANIO_INSUMO},
        // `)
        let r = confirm(
          "Esta apunto de modificar los datos del insumo. ¿Desea continuar?"
        );
        if (r == true) {
          axios
            .put(this.url + "api/insumos/" + this.datos_insumo.id, {
              NOMBRE_INSUMO       :  this.datos_insumo.NOMBRE_INSUMO,
              CANTIDAD_DISPONIBLE :  this.datos_insumo.CANTIDAD_DISPONIBLE,
              PESO_INSUMO         :  this.datos_insumo.PESO_INSUMO,
              COLOR_INSUMO        :  this.datos_insumo.COLOR_INSUMO,
              DESCRIPCION_INSUMO  :  this.datos_insumo.DESCRIPCION_INSUMO,
              TAMANIO_INSUMO      :  this.datos_insumo.TAMANIO_INSUMO,
            })
  
            .then(response => {
              console.log(response);
              alertify.alert("¡Insumo modificado correctamente!");
              this.cargarTabla();
            })
  
            .catch(err => {
              console.log(err);
            });
        }
      },
  
      // ELIMINAR INSUMO
      eliminarInsumo(ID_INSUMO) {
        let r = confirm(
          "Esta apunto de eliminar un insumo del sistema. ¿Desea continuar?"
        );
        if (r == true) {
          axios
            .delete(this.url + "api/insumos/" + ID_INSUMO)
  
            .then(response => {
              console.log(response);
              alertify.alert("¡Insumo eliminado correctamente!");
              this.cargarTabla();
            })
  
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  });
  