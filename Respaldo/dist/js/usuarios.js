new Vue({
  el: "#usuarios",
  data: {
    // RUTA CORTA
    url: "https://servidor.costurasximena.cl/",

    // FORMULARIOS
    RUT_USUARIO: "",
    NOMBRES_USUARIO: "",
    APELLIDOS_USUARIO: "",
    EMAIL_USUARIO: "",
    TELEFONO_USUARIO: "",
    ROL_USUARIO: "",
    PASS_USUARIO: '',
    datos_pers: '',
    pass : '',
    pass2: '',

    // ARRAY'S DE DATOS
    datos_usuario: [],
    datos_tabla: []
  },

  mounted() {
    token = localStorage.getItem("user-costuras-ximena");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    this.cargarTabla();
  },

  methods: {
    limpiar(){
      this.datos_usuario = []
    },
    // // CARGAR TABLA
    async cargarTabla() {
      await axios.get(this.url + "api/usuarios").then(response => {
        this.datos_tabla = response.data;
        console.log(response.data)
      },
      err => console.log(err)
      );
    },

    // // NUEVO USUARIO
    nuevoUsuario() {
            console.log(`
      rut       : ${this.datos_usuario.rut},
      nombres   : ${this.datos_usuario.nombres},
      apellidos : ${this.datos_usuario.apellidos},
      email     : ${this.datos_usuario.email},
      telefono  : ${this.datos_usuario.telefono},
      rol       : ${this.datos_usuario.rol}
      `)  
      if(this.pass == this.pass2){
        axios
        .post(this.url + "api/register", {
          rut       : this.datos_usuario.rut,
          nombres   : this.datos_usuario.nombres,
          apellidos : this.datos_usuario.apellidos,
          email     : this.datos_usuario.email,
          telefono  : this.datos_usuario.telefono,
          rol       : this.datos_usuario.rol,
          password  : this.pass,
          c_password: this.pass2
        })
        .then(response => {
          this.cargarTabla();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })

        })

        .catch(err => {
          console.log(err);
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
    
    },

    // // VER USUARIO
    verUsuario(id) {
        this.datos_usuario = []

        axios
          .get(this.url + "api/usuarios/" + id)
          .then(response => {
            console.log(response.data[0])
            this.datos_usuario = response.data[0];
          })
          .catch(err => {
            console.log(err);
          });
    },

    // // EDITAR USUARIO
    editarUsuario() {
      // console.log(`
      // rut       : ${this.datos_usuario.rut},
      // nombres   : ${this.datos_usuario.nombres},
      // apellidos : ${this.datos_usuario.apellidos},
      // email     : ${this.datos_usuario.email},
      // telefono  : ${this.datos_usuario.telefono},
      // rol       : ${this.datos_usuario.rol}
      // `)  
      let r = confirm(
        "Esta apunto de modificar los datos del usuario. ¿Desea continuar?"
      );
      if (r == true) {
        if(this.pass2 != null && this.pass != null && this.pass2 === this.pass) this.datos_usuario.password = this.pass

        axios
          .put(this.url + "api/usuarios/" + this.datos_usuario.id, {
            rut       : this.datos_usuario.rut,
            nombres   : this.datos_usuario.nombres,
            apellidos : this.datos_usuario.apellidos,
            email     : this.datos_usuario.email,
            telefono  : this.datos_usuario.telefono,
            rol       : this.datos_usuario.rol
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

    // // ELIMINAR USUARIO
    eliminarUsuario(id) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios
          .delete(this.url + "api/usuarios/" + id)

          .then(response => {
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.datos_tabla();
          })

        }
      })


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
