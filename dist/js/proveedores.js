new Vue({
  el: "#proveedores",
  data: {
    // RUTA CORTA
    url: "https://servidor.costurasximena.cl/",

    // FORMULARIOS
    RUT_PROVEEDOR: "",
    NOMBRES_PROVEEDOR: "",
    APELLIDOS_PROVEEDOR: "",
    EMAIL_PROVEEDOR: "",
    TELEFONO_PROVEEDOR: "",
    DIRECCION_PROVEEDOR: "",
    CUENTA_BANCARIA: "",
    DESCRIPCION_PROVEEDOR: "",

    // ARRAY'S DE DATOS
    datos_proveedor: [],
    datos_tabla: [],
    user: '',
  },

  mounted() {
    token = localStorage.getItem("user-costuras-ximena");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    this.buscarId()
    this.cargarTabla();
  },

  methods: {
    async buscarId(){
      await axios.post(this.url + "api/details").then(
        res => {
          this.user = res.data.success.id
        }, 
        err => console.log(err)
      )
    },
    // CARGAR TABLA
    async cargarTabla() {
      await axios.get(this.url + "api/proveedor").then(response => {
        this.datos_tabla = response.data;
        console.log(response.data)
      },
      err => console.log(err)
      );
    },

    // NUEVO USUARIO
    nuevoUsuario() {
      axios
        .post(this.url + "api/proveedor", {
          ID_USUARIO            : this.user,
          RUT_PROVEEDOR         : this.datos_proveedor.RUT_PROVEEDOR,
          NOMBRES_PROVEEDOR     : this.datos_proveedor.NOMBRES_PROVEEDOR,
          APELLIDOS_PROVEEDOR   : this.datos_proveedor.APELLIDOS_PROVEEDOR,
          EMAIL_PROVEEDOR       : this.datos_proveedor.EMAIL_PROVEEDOR,
          TELEFONO_PROVEEDOR    : this.datos_proveedor.TELEFONO_PROVEEDOR,
          DIRECCION_PROVEEDOR   : this.datos_proveedor.DIRECCION_PROVEEDOR,
          CUENTA_BANCARIA       : this.datos_proveedor.CUENTA_BANCARIA,
          DESCRIPCION_PROVEEDOR : this.datos_proveedor.DESCRIPCION_PROVEEDOR
        }).then(response => {
          this.datos_proveedor = []
        }).catch(err => {
          console.log(err);
        });
    },

    // VER USUARIO
    verProveedor(ID_PROVEEDOR) {
        axios
          .get(this.url + "api/proveedor/" + ID_PROVEEDOR)
          .then(response => {
            this.datos_proveedor = response.data[0];
            console.log(this.datos_proveedor)
          })
          .catch(err => {
            console.log(err);
          });
    },

    // EDITAR USUARIO
    editarUsuario() {

      let r = confirm(
        "Esta apunto de modificar los datos del usuario. ¿Desea continuar?"
      );
      if (r == true) {
        axios
          .put(this.url + "api/proveedor/" + this.datos_proveedor.id, {
            RUT_PROVEEDOR         : this.datos_proveedor.RUT_PROVEEDOR,
            NOMBRES_PROVEEDOR     : this.datos_proveedor.NOMBRES_PROVEEDOR,
            APELLIDOS_PROVEEDOR   : this.datos_proveedor.APELLIDOS_PROVEEDOR,
            EMAIL_PROVEEDOR       : this.datos_proveedor.EMAIL_PROVEEDOR,
            TELEFONO_PROVEEDOR    : this.datos_proveedor.TELEFONO_PROVEEDOR,
            DIRECCION_PROVEEDOR   : this.datos_proveedor.DIRECCION_PROVEEDOR,
            CUENTA_BANCARIA       : this.datos_proveedor.CUENTA_BANCARIA,
            DESCRIPCION_PROVEEDOR : this.datos_proveedor.DESCRIPCION_PROVEEDOR
          })
          .then(response => {
            console.log(response);
            this.cargarTabla();
          })

          .catch(err => {
            console.log(err);
          });
      }
    },

    // ELIMINAR USUARIO
    eliminarProveedor(id) {
      let r = confirm(
        "Esta apunto de eliminar un proveedor del sistema. ¿Desea continuar?"
      );
      if (r == true) {
        axios
          .delete(this.url + "api/proveedor/" + id)
          .then(response => {
            this.cargarTabla();
          })

          .cath(err => {
            console.log(err);
          });
      }
    },
    limpiar(){
      this.datos_proveedor = []
    }
  }
});
