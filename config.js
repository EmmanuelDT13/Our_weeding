/* Configuración central. No coloques información privada: este archivo es público.
   Los textos editoriales adicionales se pueden editar directamente en index.html. */
window.WEDDING_CONFIG = {
  couple: 'Emmanuel & Estacy',
  date: '2027-06-12T16:30:00-06:00',
  endDate: '2027-06-13T02:00:00-06:00',
  // Número internacional, solo dígitos (México: 52 + 10 dígitos). Vacío = demo segura.
  whatsapp: '',
  defaultPasses: 1,
  maxPasses: 10,
  ceremony: {name:'Parroquia de San Miguel Arcángel',address:'Plaza Principal s/n, Zona Centro, San Miguel de Allende, Guanajuato.',query:'Parroquia de San Miguel Arcángel, San Miguel de Allende'},
  reception: {name:'Rosewood San Miguel de Allende',address:'Nemesio Diez 11, Zona Centro, San Miguel de Allende, Guanajuato.',query:'Rosewood San Miguel de Allende'},
  // Pega los enlaces específicos de las mesas. Vacíos se muestran como pendientes.
  registries: [{name:'Liverpool',label:'MESA DE REGALOS',url:''},{name:'Palacio de Hierro',label:'MESA DE REGALOS',url:''},{name:'Amazon',label:'NUESTRA LISTA',url:''}],
  bank: {holder:'',name:'',clabe:''},
  // Opcional: URL o archivo propio con licencia. Sin URL se utiliza la melodía original incluida.
  audio: {url:'assets/atelier-nocturne.mp3',volume:0.65},
  photos: {
    hero:'assets/novios_01.jpeg',
    story:'assets/novios_02.jpeg',
    banner:'assets/novios_03.jpeg',
    ceremony:'assets/1523438885200-e635ba2c371e.jpg',
    reception:'assets/1511795409834-ef04bbd61622.jpg',
    galleryOne:'assets/novios_01.jpeg',
    galleryTwo:'assets/novios_02.jpeg',
    galleryThree:'assets/novios_03.jpeg',
    dress:'assets/1595777457583-95e059d581b8.jpg',
    suit:'assets/1594938298603-c8148c4dae35.jpg'
  }
};
