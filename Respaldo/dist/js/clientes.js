new Vue({
    el: "#clientes",
    data: {
      // RUTA CORTA
      url: "https://servidor.costurasximena.cl/",
  
      // FORMULARIOS
      user: "",
  
      // ARRAY'S DE DATOS
      datos_cliente: [],
      datos_tabla: [],
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
      limpiar() {
        this.datos_cliente = [];
      },
      async cargarTabla(){
        await axios.get(this.url + 'api/cliente')
        .then(
            res => {
                this.datos_tabla = res.data
                console.log(res.data)
            },
            err => console.log(err)
        )
      },
      async nuevoCliente(){
        // console.log(`
        // NOMBRES_CLIENTE     : ${this.datos_cliente.NOMBRES_CLIENTE},
        // APELLIDOS_CLIENTE   : ${this.datos_cliente.APELLIDOS_CLIENTE},
        // RUT_CLIENTE         : ${this.datos_cliente.RUT_CLIENTE},
        // TELEFONO_CLIENTE    : ${this.datos_cliente.TELEFONO_CLIENTE},
        // DIRECCION_CLIENTE   : ${this.datos_cliente.DIRECCION_CLIENTE},
        // EMAIL_CLIENTE       : ${this.datos_cliente.EMAIL_CLIENTE},
        // ID_USUARIO          : ${this.user}
        // `)

          await axios.post(this.url+'api/cliente', {
            NOMBRES_CLIENTE     : this.datos_cliente.NOMBRES_CLIENTE,
            APELLIDOS_CLIENTE   : this.datos_cliente.APELLIDOS_CLIENTE,
            RUT_CLIENTE         : this.datos_cliente.RUT_CLIENTE,
            TELEFONO_CLIENTE    : this.datos_cliente.TELEFONO_CLIENTE,
            DIRECCION_CLIENTE   : this.datos_cliente.DIRECCION_CLIENTE,
            EMAIL_CLIENTE       : this.datos_cliente.EMAIL_CLIENTE,
            ID_USUARIO          : this.user,
          }).then(
              res => {
                  this.limpiar()
                  this.cargarTabla()
              },
              err => console.log(err)
          )
      },
      async verCliente(id){
        await axios.get(this.url + 'api/cliente/'+ id).then(
            res => {
                this.datos_cliente = res.data[0]
                console.log(res.data[0])
            },
            err => console.log(err)
        )
      },
      async editarCliente(){
          await axios.put(this.url + 'api/cliente/'+ this.datos_cliente.id, {
            NOMBRES_CLIENTE     : this.datos_cliente.NOMBRES_CLIENTE,
            APELLIDOS_CLIENTE   : this.datos_cliente.APELLIDOS_CLIENTE,
            RUT_CLIENTE         : this.datos_cliente.RUT_CLIENTE,
            TELEFONO_CLIENTE    : this.datos_cliente.TELEFONO_CLIENTE,
            DIRECCION_CLIENTE   : this.datos_cliente.DIRECCION_CLIENTE,
            EMAIL_CLIENTE       : this.datos_cliente.EMAIL_CLIENTE,
            ID_USUARIO          : this.user
          }).then(
            res => {
                this.limpiar()
                this.cargarTabla()
            },
            err => console.log(err)
        )
      },
      async eliminarCliente(id){
          await axios.delete(this.url + 'api/cliente/'+this.datos_cliente.id)
          .then(
              res => {
                this.cargarTabla()
              },
              err => console.log(err)
          )
      }
    }
  });
  