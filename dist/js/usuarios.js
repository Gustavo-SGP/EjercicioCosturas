new Vue({
  el: "#usuarios",
  data: {
    url: "https://servidor.costurasximena.cl/", //Ruta de la API

    datosUsuarios: [],
    datosTabla: []

  },

  mounted() {
    token = localStorage.getItem("user-costuras-ximena");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    this.cargarTabla();
  },

  methods: {
    async cargarTabla() {
      await axios.get(this.url + "api/usuarios").then(
        response => {
          this.datosTabla = response.data;
          console.log(response.data);
        },
        err => console.log(err)
      );
    },

    nuevoUsuario() {
      axios.post(this.url + "api/register", {
        nombres: this.datosUsuarios.nombres,
        apellidos: this.datosUsuarios.apellidos,
        rol: this.datosUsuarios.rol,
        rut: this.datosUsuarios.rut,
        email: this.datosUsuarios.email,
        telefono: this.datosUsuarios.telefono,
        password: this.datosUsuarios.password,
        id: this.datosUsuarios.id,
        c_password: this.datosUsuarios.c_password
      })
        .then(response => {
          this.cargarTabla();
        })
        .catch(err => {
          console.log(err);
        })
    },

    verUsuario(id) {
      axios.get(this.url + "api/usuarios/" + id)

        .then(response => {
          console.log(response.data[0]);
          this.datosUsuarios = response.data[0];
        })
        .catch(err => {
          console.log(err);
        })
    },

    editarUsuario() {
      axios.put(this.url + "api/usuarios/" + this.datosUsuarios.id, {
        nombres: this.datosUsuarios.nombres,
        apellidos: this.datosUsuarios.apellidos,
        rol: this.datosUsuarios.rol,
        rut: this.datosUsuarios.rut,
        email: this.datosUsuarios.email,
        telefono: this.datosUsuarios.telefono,
        password: this.datosUsuarios.password,
      
        c_password: this.datosUsuarios.c_password
      })
      .then(response => {
        console.log(response);
        this.cargarTabla();
      })
      .catch(err => {
        console.log(err);
      });
    },

    eliminarUsuario(id){
      axios.delete(this.url + "api/usuarios/" + id)
      .then(response => {
        console.log(response);
        this.cargarTabla();
      })
    }
  }
});