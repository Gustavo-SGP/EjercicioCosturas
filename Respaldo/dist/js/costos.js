new Vue({
  el: "#costos",
  data: {
    // RUTA CORTA
    url: "https://servidor.costurasximena.cl/",

    // FORMULARIOS
    user: "",

    // ARRAY'S DE DATOS
    datos_costo: [],
    datos_tabla: [],
    proveedores: []
  },

  mounted() {
    token = localStorage.getItem("user-costuras-ximena");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    this.buscarId();
    this.cargarTabla();
  },

  methods: {
    async getProv() {
      await axios.get(this.url + "api/proveedorNom").then(
        res => {
          this.proveedores = res.data;
          console.log(res.data);
        },
        err => console.log(err)
      );
    },
    async buscarId() {
      await axios.post(this.url + "api/details").then(
        res => {
          this.user = res.data.success.id;
        },
        err => console.log(err)
      );
    },
    limpiar() {
      this.datos_costo = [];
    },
    // // CARGAR TABLA
    async cargarTabla() {
      await axios.get(this.url + "api/costos").then(
        response => {
          this.datos_tabla = response.data;
          console.log(response.data);
        },
        err => console.log(err)
      );
    },

    // // NUEVO USUARIO
    nuevoCosto() {
      console.log(`
        NOMBRE_COSTO        : ${this.datos_costo.NOMBRE_COSTO},
        TOTAL_COSTO         : ${this.datos_costo.TOTAL_COSTO},
        DESCRIPCION_COSTO   : ${this.datos_costo.DESCRIPCION_COSTO},
        ID_USUARIO          : ${this.user}
        ID_PROVEEDOR        : ${this.datos_costo.ID_PROVEEDOR}
        `);

      if (this.pass == this.pass2) {
        axios
          .post(this.url + "api/costos", {
            NOMBRE_COSTO: this.datos_costo.NOMBRE_COSTO,
            TOTAL_COSTO: this.datos_costo.TOTAL_COSTO,
            DESCRIPCION_COSTO: this.datos_costo.DESCRIPCION_COSTO,
            ID_USUARIO: this.user,
            ID_PROVEEDOR: this.datos_costo.ID_PROVEEDOR
          })
          .then(response => {
            this.cargarTabla();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          })

          .catch(err => {
            console.log(err);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "<a href>Why do I have this issue?</a>"
        });
      }
    },

    // // VER USUARIO
    verCosto(id) {
      this.datos_usuario = [];

      axios
        .get(this.url + "api/costos/" + id)
        .then(response => {
          console.log(response.data[0]);
          this.datos_costo = response.data[0];
          this.datos_costo.usuario =
            response.data[0].nombres + " " + response.data[0].apellidos;
          this.datos_costo.proveedor =
            this.datos_costo.NOMBRES_PROVEEDOR +
            " " +
            response.data[0].APELLIDOS_PROVEEDOR;
          fecha = response.data[0].created_at.split("-");
          this.datos_costo.fecha =
            fecha[2].split(" ")[0] + "-" + fecha[1] + "-" + fecha[0];
          console.log(this.datos_costo.fecha);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // // EDITAR USUARIO
    editarUsuario() {
      console.log(`
                NOMBRE_COSTO        : ${this.datos_costo.NOMBRE_COSTO},
                TOTAL_COSTO         : ${this.datos_costo.TOTAL_COSTO},
                DESCRIPCION_COSTO   : ${this.datos_costo.DESCRIPCION_COSTO},
                ID_PROVEEDOR        : ${this.datos_costo.ID_PROVEEDOR},
                created_at          : ${this.datos_costo.fecha}
        `);
      let r = confirm(
        "Esta apunto de modificar los datos del usuario. ¿Desea continuar?"
      );
      if (r == true) {
        if (this.pass2 != null && this.pass != null && this.pass2 === this.pass)
          this.datos_usuario.password = this.pass;

        axios
          .put(this.url + "api/usuarios/" + this.datos_usuario.id, {
            NOMBRE_COSTO: this.datos_costo.NOMBRE_COSTO,
            TOTAL_COSTO: this.datos_costo.TOTAL_COSTO,
            DESCRIPCION_COSTO: this.datos_costo.DESCRIPCION_COSTO,
            ID_PROVEEDOR: this.datos_costo.ID_PROVEEDOR,
            created_at: this.datos_costo.fecha
          })

          .then(response => {
            console.log(response);
            alertify.alert("¡Usuario editado correctamente!");
            this.cargarTabla();
          })

          .catch(err => {
            console.log(err);
          });
      }
    },

    // // ELIMINAR COSTO
    eliminarCosto(ID_USUARIO) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete(this.url + "api/usuarios/" + this.RUT_USUARIO)

            .then(response => {
              console.log(response);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.datos_tabla();
            });
        }
      });

      // let r = confirm(
      //   "Esta apunto de eliminar un usuario del sistema. ¿Desea continuar?"
      // );
      // if (r == true) {
      //   axios
      //     .delete(this.url + "api/usuarios/" + this.RUT_USUARIO)

      //     .then(response => {
      //       console.log(response);
      //       alertify.alert("¡Usuario eliminado correctamente!");
      //       this.datos_tabla();
      //     })

      //     .catch(err => {
      //       console.log(err);
      //     });
      // }
    }
  }
});
