new Vue({
    el: "#venta",
    data: {
      // RUTA CORTA
      url: "https://servidor.costurasximena.cl/",
  
      // FORMULARIOS
      user : '',
      cliente: '',
  
      // ARRAY'S DE DATOS
      datos_cliente: [],
      datos_tabla: [],
      clientes : [],
      array_productos: [],
      datos_costo : '',
      RUT_USUARIO: '',
      NOMBRES_USUARIO: '',
      APELLIDOS_USUARIO:'',
      EMAIL_USUARIO: '',
      TELEFONO_USUARIO: '',
      PASS_USUARIO: '',

    nuevo: '',
    productos: [],
    total : 0,
    nombre_cliente: '',
    apellido_cliente: '',
    telefono_cliente: ''
    },
  
    mounted() {
      token = localStorage.getItem("user-costuras-ximena");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      this.buscarId();

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
      async buscarClientes(){
          await axios.get(this.url + 'api/cliente')
          .then(
              res => {
                  console.log(res.data)
                  this.clientes = res.data
              },
              err => console.log(err)
          )
      },
      async añadirProducto(){

        await axios.get(this.url + 'api/productosCodigo/'+this.nuevo)
        .then(
          res => {
            console.log(res.data[0].VALOR_PRODUCTO)
            let id = this.productos.findIndex( item => item.CODIGO === res.data[0].CODIGO)
            if(id === 0){
              this.productos[id].cantidad += 1
              this.total += parseInt(res.data[0].VALOR_PRODUCTO)

              this.nuevo = ''
            
            }else {
              this.productos.push(
                {
                  CODIGO :res.data[0].CODIGO,
                  NOMBRE_PRODUCTO : res.data[0].NOMBRE_PRODUCTO,
                  VALOR_PRODUCTO : res.data[0].VALOR_PRODUCTO,
                  id : res.data[0].id,
                  cantidad: 1
                }
                  )
                  this.total += parseInt(res.data[0].VALOR_PRODUCTO)
                this.nuevo = ''
            }
          },
          err => console.log(err)
        )
      },
      sumar(codigo){
        let id = this.productos.findIndex( item => item.CODIGO === codigo)
        this.total += parseInt(this.productos[id].VALOR_PRODUCTO)
        this.productos[id].cantidad += 1
      },
      restar(codigo){
        let id = this.productos.findIndex( item => item.CODIGO === codigo)

        if(this.productos[id].cantidad > 1) {
          this.productos[id].cantidad -= 1
          this.total -= parseInt(this.productos[id].VALOR_PRODUCTO)
        }
        
      },
      eliminar(codigo){
        console.log(codigo)
        let id = this.productos.findIndex( item => item.CODIGO === codigo)
        console.log(id)
        this.productos.splice(id, 1)
        
      },
    }
  });
  