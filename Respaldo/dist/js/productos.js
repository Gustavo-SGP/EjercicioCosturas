new Vue({
  el: "#productos",
  data: {
    // RUTA CORTA
    url: "https://servidor.costurasximena.cl/",

    // FORMULARIOS
    NOMBRE_PRODUCTO: "",
    TIPO_PRODUCTO: "",
    SEXO_PRODUCTO: "",
    TIPO_POLERA: "",
    TALLA_PRODUCTO: "",
    INSTITUCION_PRODUCTO: "",
    CANTIDAD_PRODUCTO: "",
    ID_USUARIO: "",
    VALOR_PRODUCTO: "",
    CODIGO: "",
    id: "",
    // ARRAY'S DE DATOS
    datos_producto: [],
    datos_nombre: [],
    datos_tabla: []
  },

  mounted() {
    this.cargarTabla();
  },

  methods: {
    // CARGAR TABLA
    async cargarTabla() {
      axios
        .get(this.url + "api/productos")
        .then(response => {
          this.datos_tabla = response.data;
        })
        .catch(err => console.log(err));
    },

    // NUEVO PRODUCTO
    // nuevoProducto(id) {
    //   axios
    //     .post(this.url + "api/productos/" + id, {
    //       NOMBRE_PRODUCTO: this.NOMBRE_PRODUCTO,
    //       TIPO_POLERA: this.TIPO_POLERA,
    //       TALLA_PRODUCTO: this.TALLA_PRODUCTO,
    //       INSTITUCION_PRODUCTO: this.INSTITUCION_PRODUCTO,
    //       CANTIDAD_PRODUCTO: this.CANTIDAD_PRODUCTO,
    //       VALOR_PRODUCTO: this.VALOR_PRODUCTO,
    //       CODIGO: this.CODIGO
    //     })

    //     .then(response => {
    //       console.log(response);
    //       this.datos_tabla();
    //       alertify.alert("¡Usuario añadido correctamente!");
    //       this.ID_USUARIO = this.RUT_USUARIO = this.NOMBRES_USUARIO = this.APELLIDOS_USUARIO = this.EMAIL_USUARIO = this.TELEFONO_USUARIO = this.ROL_USUARIO =
    //         "";
    //     })

    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    // VER USUARIO
    verProducto(id) {
      axios
        .get(this.url + "api/productos/" + id)
        .then(response => {
          this.datos_producto = response.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },

    // EDITAR USUARIO
    editarProducto(id) {
      axios
        .put(this.url + "api/productos/" + this.datos_producto.id, {
          NOMBRE_PRODUCTO: this.datos_producto.NOMBRE_PRODUCTO,
          CANTIDAD_PRODUCTO: this.datos_producto.CANTIDAD_PRODUCTO,
          VALOR_PRODUCTO: this.datos_producto.VALOR_PRODUCTO,
          TALLA_PRODUCTO: this.datos_producto.TALLA_PRODUCTO,
          INSTITUCION_PRODUCTO: this.datos_producto.INSTITUCION_PRODUCTO,
          CODIGO: this.datos_producto.CODIGO
        })

        .then(response => {
          console.log(response);
          alertify.alert("¡Usuario editado correctamente!");
          this.datos_tabla();
        })

        .catch(err => {
          console.log(err);
        });
    },

    // ELIMINAR USUARIO
    eliminarProducto(id) {
      let r = confirm(
        "Esta apunto de eliminar un usuario del sistema. ¿Desea continuar?"
      );
      if (r == true) {
        axios
          .delete(this.url + "api/productos/" + id)

          .then(response => {
            console.log(response);
            alertify.alert("¡Usuario eliminado correctamente!");
            this.datos_tabla();
          })

          .catch(err => {
            console.log(err);
          });
      }
    }
  }
});
