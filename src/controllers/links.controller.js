import pool from "../database";
//Tablas de administrador
export const tableasAdmin = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    res.render("links/admin");
  } else {
    res.render("profile");
  }
};
//Usuarios
export const renderUsers = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const users = await pool.query("SELECT * FROM users");
    res.render("links/adminUsers", { users });
  } else {
    res.render("profile");
  }
};
//Eliminar Usuario
export const Deleteuser = async (req, res) => {
  const { id } = req.params;
  //Query para la Eliminación de los datos, con el boton de Borrar
  await pool.query("DELETE FROM users WHERE ID = ?", [id]);
  req.flash("message", "Usuario Eliminado");
  res.redirect("/links/users");
};
//Pasajeros
export const renderPassagers = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const pasajeros = await pool.query("SELECT * FROM pasajeros");
    res.render("links/adminPassagers", { pasajeros });
  } else {
    res.render("profile");
  }
};
//Eliminar pasajero
export const DeletePassagerAdmin = async (req, res) => {
  const { id } = req.params;
  //Query para la Eliminación de los datos, con el boton de Borrar
  await pool.query("DELETE FROM pasajeros WHERE ID = ?", [id]);
  req.flash("success", "Pasajero Eliminado");
  res.redirect("/links/passagers");
};
//Conductores
export const renderDrivers = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const conductores = await pool.query("SELECT * FROM conductores");
    res.render("links/adminDrivers", { conductores });
  } else {
    res.render("profile");
  }
};
//Conductores Multados
export const renderDriversMultad = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const conductoresM = await pool.query("SELECT * FROM conductores WHERE disponible = 'Multado' and multa = ''");
    res.render("links/adminDriversMulta", { conductoresM });
  } else {
    res.render("profile");
  }
};
//Liquidar link
export const linkMultados = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    const conduM = await pool.query("SELECT * FROM conductores WHERE id = ?", [id]);
    res.render("links/adminLinkMultados", { liquidar: conduM[0] });
  } else {
    res.render("profile");
  }
};

//Liquidar link multa
export const liquidarMulta = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    const { multa } = req.body;
    await pool.query("UPDATE conductores set multa = ? WHERE id = ?", [multa, id]);
    req.flash("success", "Conductor ", id, "Cobrado");
    res.redirect("/links/adminDriversMulta");
  } else {
    res.render("profile");
  }
};
//Conductores Multados
export const multasCobrar = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const multas = await pool.query("SELECT * FROM conductores WHERE disponible = 'Multado' and multa != ''");
    res.render("links/adminCobrarMultas", { multas });
  } else {
    res.render("profile");
  }
};
//Borrar multa
export const cobraMulta = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    await pool.query("UPDATE conductores set disponible = 'Si', denuncias = 0, multa = '' WHERE id = ?", [id]);
    req.flash("success", "El conductor " + id + " Fue cobrado");
    res.redirect("/links/multasCobrar");
  } else {
    res.render("profile");
  }
};
//disponibilidad conductores
export const driverDisponibilidad = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    //Query para la busqueda de la recolecta que se va a editar
    const conducor = await pool.query("SELECT * FROM conductores WHERE id = ?", [id]);
    res.render("links/adminDispoDriver", { datoConductor: conducor[0] });
  } else {
    res.render("profile");
  }
};
//Autorizo
export const autorizoD = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    const { disponible } = req.body;
    //Query para la Edición de la recolecta que se encontro
    await pool.query("UPDATE conductores set disponible = ? WHERE id = ?", [disponible, id]);
    req.flash("success", "la ruta " + id + " Datos Actualizados");
    res.redirect("/links/drivers");
  } else {
    res.render("profile");
  }
};
//Eliminar Conductor
export const DeleteDriverAdmin = async (req, res) => {
  const { id } = req.params;
  //Query para la Eliminación de los datos, con el boton de Borrar
  await pool.query("DELETE FROM conductores WHERE ID = ?", [id]);
  req.flash("success", "Conductor Eliminado");
  res.redirect("/links/drivers");
};
//Administradores
export const renderAdmins = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { adminP, adminClave } = req.body;
    if (adminP == "4dm1n1str4d0rPr1nc1p4LD3C0M0D1F1" || adminClave == "3st43sL4Cl4V3D3L43Mpr3s4Pr1m3r4") {
      const administradores = await pool.query("SELECT * FROM admin");
      res.render("links/adminAdmins", { administradores });
    } else {
      req.flash("message", "No tienes el permiso para entrar a administrador principal");
      res.redirect("/links/admin");
    }
  } else {
    res.render("profile");
  }
};
//Añadir administrador
export const addManager = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { idUser } = req.body;
    //Query para la inserción de los datos
    await pool.query('INSERT INTO admin set idUser = ?', [idUser]);
    req.flash('success', 'Registraste un nuevo Administrador');
    res.redirect("/links/admins");
  } else {
    res.render("profile");
  }
};
//Eliminar un administrador
export const adminDelete = async (req, res) => {
  const { id } = req.params;
  //Query para la Eliminación de los datos, con el boton de Borrar
  await pool.query("DELETE FROM admin WHERE ID = ?", [id]);
  req.flash("success", "Conductor Eliminado");
  res.redirect("/links/admins");
};
//Rutas
export const renderRutas = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const rutas = await pool.query("SELECT * FROM ruta");
    res.render("links/adminRutas", { rutas });
  } else {
    res.render("profile");
  }
};
//Eliminar Rutas
export const deleteRuta = async (req, res) => {
  const { id } = req.params;
  //Query para la Eliminación de los datos, con el boton de Borrar
  await pool.query("DELETE FROM ruta WHERE ID = ?", [id]);
  req.flash("success", "Ruta Eliminado");
  res.redirect("/links/rutas");
};
//Rutas accionadas
export const rutasActuales = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const viajes = await pool.query("SELECT * FROM viajes");
    res.render("links/adminRutasFuncionando", { viajes });
  } else {
    res.render("profile");
  }
};
//rutas para cobrar
export const rutasCobro = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const rutasCobro = await pool.query("SELECT * FROM ruta WHERE precioPagar >= 2650 AND linkCobro = ''");
    res.render("links/adminRutasParaCobrar", { rutasCobro });
  } else {
    res.render("profile");
  }
};
//Vista para cobrar
export const cobrarLink = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    //Query para la busqueda de la recolecta que se va a editar
    const ruta = await pool.query("SELECT * FROM ruta WHERE id = ?", [id]);
    res.render("links/adminCobro", { cobro: ruta[0] });
  } else {
    res.render("profile");
  }
};
//Enviar cobro
export const enviarCobro = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    const { linkCobro } = req.body;
    await pool.query("UPDATE ruta set linkCobro = ? WHERE id = ? ", [linkCobro, id]);
    req.flash("success", "Ruta ", id, " cobrada");
    res.redirect("/links/rutasCobro");
  } else {
    res.render("profile");
  }
};
//rutas para liquidar
export const rutasLiquidaciones = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const rutasliquidadas = await pool.query("SELECT * FROM ruta WHERE linkCobro != ''");
    res.render("links/adminRutasLiquidadas", { rutasliquidadas });
  } else {
    res.render("profile");
  }
};
//Liquidar link
export const liquidarLink = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    const liquidar = await pool.query("SELECT * FROM ruta WHERE id = ?", [id]);
    res.render("links/adminLiquidar", { liquidar: liquidar[0] });
  } else {
    res.render("profile");
  }
};
//Enviar liquidación
export const enviarLiquidacion = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    const { linkCobro, precioPagar, ocupacion } = req.body;
    const cobro = {
      linkCobro,
      precioPagar,
      ocupacion
    }
    await pool.query("UPDATE ruta set ? WHERE id = ?", [cobro, id]);
    req.flash("success", "Ruta ", id, " cobrada");
    res.redirect("/links/rutasLiquidaciones");
  } else {
    res.render("profile");
  }
};
//Adeudados
export const adeudados = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const deudores = await pool.query("SELECT * FROM ruta WHERE precioPagar >= 3900 AND precioPagar < 5000 AND linkCobro != '' AND ocupacion = 'Disponible'");
    res.render("links/adminAdeudados", { deudores });
  } else {
    res.render("profile");
  }
};

//Denunciar Ruta
export const enviarLiquidacionNueva = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    await pool.query("DELETE FROM viajes WHERE viajes.idruta = ?", [id]);
    const denuncia = "Adeudada";
    await pool.query("UPDATE ruta set ocupacion = ? WHERE id = ?", [denuncia, id]);
    req.flash("success", "Has denunciado esta ruta", id);
    res.redirect("/links/adeudados");
  } else {
    res.render("profile");
  }
};

//Denunciados
export const denuncias = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const denunciados = await pool.query("SELECT * FROM ruta WHERE ocupacion = 'Detenida'");
    res.render("links/adminDenunciados", { denunciados });
  } else {
    res.render("profile");
  }
};

//Liquidar Ruta Denunciada
export const enviarLiquidacionDenunciada = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    const ocupacion = "Disponible"
    await pool.query("UPDATE ruta set ocupacion = ? WHERE id = ?", [ocupacion, id]);
    req.flash("success", "has cambiado el estado a disponible de la ruta ", id);
    res.redirect("/links/denuncias");
  } else {
    res.render("profile");
  }
};
//Actividad de rutas
export const actividadFechas = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const fechas = await pool.query("SELECT * FROM ruta WHERE ocupacion != 'Detenida' AND ocupacion != 'Inactiva'");
    res.render("links/adminFechas", { fechas });
  } else {
    res.render("profile");
  }
};
//Selección ruta sin actividad
export const rutaInictiva = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    //Query para la busqueda de la recolecta que se va a editar
    const inactividad = await pool.query("SELECT * FROM ruta WHERE id = ?", [id]);
    res.render("links/adminInactividad", { actividad: inactividad[0] });
  } else {
    res.render("profile");
  }
};
//Inactivar ruta
export const enviarLiquidacinRutaInactiva = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    const { linkCobro, precioPagar } = req.body;
    const cobro = {
      linkCobro,
      precioPagar,
    }
    await pool.query("UPDATE ruta set ? WHERE id = ?", [cobro, id]);
    const denuncia = "Inactiva";
    await pool.query("UPDATE viajes set acciones = ? WHERE idRuta = ?", [denuncia, id]);
    await pool.query("UPDATE ruta set ocupacion = ? WHERE id = ?", [denuncia, id]);
    await pool.query("DELETE FROM viajes WHERE viajes.idruta = ?", [id]);
    req.flash("success", "Cobrada ruta inactiva", id);
    res.redirect("/links/actividadFechas");
  } else {
    res.render("profile");
  }
};
//Eliminar inactiva
export const deleteRutaInactiva = async (req, res) => {
  const { id } = req.params;
  //Query para la Eliminación de los datos, con el boton de Borrar
  await pool.query("DELETE FROM ruta WHERE ID = ?", [id]);
  req.flash("success", "Ruta Eliminado");
  res.redirect("/links/actividadFechas");
};

//Rutas solicitadas
export const rutasSolicitads = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const solicitdes = await pool.query("SELECT * FROM solicitudes");
    res.render("links/adminSolicitudes", { solicitdes });
  } else {
    res.render("profile");
  }
};

//Eliminar solicitud por parte del admisnitrados
export const deleteRutasSolicitads = async (req, res) => {
  const { id } = req.params;
  //Query para la Eliminación de los datos, con el boton de Borrar
  await pool.query("DELETE FROM solicitudes WHERE ID = ?", [id]);
  req.flash("success", "Solictud Eliminada");
  res.redirect("/links/rutasSolicitads");
};

//Rutas inactivas
export const rutaInactivas = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const inactividad = await pool.query("SELECT * FROM ruta WHERE ocupacion = 'Inactiva'");
    res.render("links/adminRutasInactivas", { inactividad });
  } else {
    res.render("profile");
  }
};
//Eliminar inactiva de largo plazo
export const dRutaInactiva = async (req, res) => {
  const { id } = req.params;
  //Query para la Eliminación de los datos, con el boton de Borrar
  await pool.query("DELETE FROM ruta WHERE ID = ?", [id]);
  req.flash("success", "Ruta Eliminado");
  res.redirect("/links/rutaInactivas");
};











// EMPIEZA LOS PASOS DE CONDUCTORES
export const renderDatesProfileDriver = async (req, res) => {
  const datesDriver = await pool.query("SELECT * FROM conductores WHERE idUser = ?", [req.user.id,]);
  res.render("links/datesProfileDriver", { datesDriver });
};
export const renderCreateProfileDriver = (req, res) => {
  res.render("links/createProfileDriver");
};
// Creación de condutor
export const addDriver = async (req, res) => {
  const resposability = "SI";
  const disponibilidad = "En validación"
  const { nombre, apellido, edad, identificacion, celular, departamento, municipio, placa, modelo } = req.body;
  const dispo = "En validación";
  const newPassager = {
    idUser: req.user.id,
    nombre,
    apellido,
    edad,
    identificacion,
    celular,
    departamento,
    municipio,
    responsabilidad: resposability,
    placa,
    modelo,
    disponible: disponibilidad
  };
  await pool.query('INSERT INTO conductores set ?', [newPassager]);
  req.flash('success', 'Felicidades, has creado tu perfil como conductor en el transcurso de 24 horas te validaremos');
  res.redirect("datesProfileDriver");
};
// Edición de conductor
export const renderEditProfileDriver = async (req, res) => {
  const { id } = req.params;
  const datesDriver = await pool.query("SELECT * FROM conductores WHERE id = ?", [id]);
  res.render("links/editDatesDriver", { dates: datesDriver[0] });
};
// Edición base de datos de conductor
export const editProfileDriver = async (req, res) => {
  const { id } = req.params;
  const { edad, celular, departamento, municipio } = req.body;
  const updateProfileP = {
    edad,
    celular,
    departamento,
    municipio,
  };
  //Query para la Edición de la recolecta que se encontro
  await pool.query("UPDATE conductores set ? WHERE id = ?", [updateProfileP, id]);
  req.flash("success", "Datos Actualizados");
  res.redirect("/links/datesProfileDriver");
};

// TERMINA LOS PASOS DE CONDUCTOR

// EMPIEZA LOS PASOS DE PASAJERO
export const renderDatesProfilePassager = async (req, res) => {
  const datesPassager = await pool.query("SELECT * FROM pasajeros WHERE idUser = ?", [req.user.id]);
  res.render("links/datesProfilePassager", { datesPassager });
};
export const renderCreateProfilePassager = (req, res) => {
  res.render("links/createProfilePassager");
};
// Creación de Pasajero
export const addPassager = async (req, res) => {
  const resposability = "SI";
  const { nombre, apellido, edad, identificacion, celular, departamento, municipio, responsabilidad } = req.body;
  const dispo = "En validación";
  const newPassager = {
    idUser: req.user.id,
    nombre,
    apellido,
    edad,
    identificacion,
    celular,
    departamento,
    municipio,
    responsabilidad: resposability,
  };
  await pool.query('INSERT INTO pasajeros set ?', [newPassager]);
  req.flash('success', 'Felicidades, has creado tu perfil como pasajero puedes buscar y usar rutas');
  res.redirect("datesProfilePassager");
};
// Edición de Pasajero
export const renderEditProfilePassager = async (req, res) => {
  const { id } = req.params;
  const datesPassager = await pool.query("SELECT * FROM pasajeros WHERE id = ?", [id]);
  res.render("links/editDatesPassager", { dates: datesPassager[0] });
};
export const editProfilePassager = async (req, res) => {
  const { id } = req.params;
  const { edad, celular, departamento, municipio } = req.body;
  const updateProfileP = {
    edad,
    celular,
    departamento,
    municipio,
  };
  //Query para la Edición de la recolecta que se encontro
  await pool.query("UPDATE pasajeros set ? WHERE id = ?", [updateProfileP, id]);
  req.flash("success", "Datos Actualizados");
  res.redirect("/links/datesProfilePassager");
};
// TERMINA LOS PASOS DE PASAJERO 


//SUBIR LOS DOCUMENTOS 
export const renderUpload = (req, res) => {
  res.render("links/uploadDocuments");
};
//TEMINA SUBIR LOS DOCUMENTOS 

//ESCOGER CUAL CAMINO PARA PERFILES
export const renderProfiles = async (req, res) => {
  const pasaj = await pool.query("SELECT id FROM pasajeros WHERE idUser = ?", [req.user.id]);
  const condu = await pool.query("SELECT id FROM conductores WHERE idUser = ?", [req.user.id]);
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [req.user.id]);
  if (pasaj.length > 0) {
    res.redirect("/links/datesProfilePassager");
  } else if (condu.length > 0) {
    res.redirect("/links/datesProfileDriver");
    //Falta la aplicación del aministrador
  } else if (admin.length > 0) {
    res.redirect("/links/admin");
  } else {
    req.flash("message", "Llena primero tu perfil como conductor o pasajero");
    res.redirect("/profile");
  }
}
//TERMINA ESCOGER CUAL CAMINO



//EMPIEZA LISTA DE RUTAS CREADA
// validación de conductor para crea rutas
export const rendervalitionRoutes = async (req, res) => {
  const conductor = await pool.query("SELECT id FROM conductores WHERE idUser = ? AND disponible = 'Si' ", [req.user.id]);
  if (conductor.length == 0) {
    req.flash('message', 'Aún no estás disponible');
    res.redirect("datesProfileDriver");
  } else {
    req.flash('success', 'Crea tu ruta');
    res.render("links/createRoute");
  }
}
//Carga la vista de creación de ruta
export const renderCreateRoute = (req, res) => {
  res.render("links/createRoute");
};
// Creación de ruta nueva
export const createRoute = async (req, res) => {
  const userP = req.user.id;
  const user = await pool.query("SELECT id FROM conductores WHERE idUser = ?", [userP]);
  const model = await pool.query("SELECT modelo FROM conductores WHERE idUser = ?", [userP]);
  var transito = Object.values(model[0])[0];
  var userD = Object.values(user[0])[0];
  const { dias, hora, asientos, lugarInicial, localidad, lugarFinal, fechaInicial, comentario, parada1, precioParada1, parada2, precioParada2, parada3,
    precioParada3, parada4, precioParada4 } = req.body;
  const idConductor = userD;
  const modelo = transito;
  const ocupacion = "Disponible";
  const newRuta = {
    dias,
    hora,
    asientos,
    lugarInicial,
    localidad,
    modelo,
    lugarFinal,
    fechaInicial,
    comentario,
    parada1,
    precioParada1,
    parada2,
    precioParada2,
    parada3,
    precioParada3,
    parada4,
    precioParada4,
    ocupacion,
    idConductor,
  };
  await pool.query('INSERT INTO ruta set ?', [newRuta]);
  req.flash('success', 'Felicidades, Espera que te vayan llegando tus pasajeros');
  res.redirect("/links/routesCreated");
};
//Cargamos las rutas hechas
export const renderRoutesCreated = async (req, res) => {
  const userP = req.user.id;
  const user = await pool.query("SELECT id FROM conductores WHERE idUser = ? AND disponible = 'Si'", [userP]);
  if (user.length === 0) {
    req.flash('message', 'No estas disponible como conductor');
    res.redirect("/profile");
  } else {
    const userD = Object.values(user[0])[0];
    const routes = await pool.query("SELECT * FROM ruta WHERE idConductor = ? ", [userD]);
    res.render("links/routesCreated", { routes });
  }
};
//Cargamos vista para editar ruta
export const editCreateRoute = async (req, res) => {
  const { id } = req.params;
  const ruta = await pool.query("SELECT * FROM ruta WHERE id = ?", [id]);
  res.render("links/editRoute", { datosRuta: ruta[0] });
};

export const editRouteCreated = async (req, res) => {
  const userP = req.user.id;
  const model = await pool.query("SELECT modelo FROM conductores WHERE idUser = ?", [userP]);
  var modelo = Object.values(model[0])[0];
  const { id } = req.params;
  const { dias, hora, asientos, lugarInicial, localidad, lugarFinal, comentario, parada1, precioParada1, parada2, precioParada2, parada3,
    precioParada3, parada4, precioParada4 } = req.body;
  const newRuta = {
    dias,
    hora,
    asientos,
    lugarInicial,
    localidad,
    modelo,
    lugarFinal,
    comentario,
    parada1,
    precioParada1,
    parada2,
    precioParada2,
    parada3,
    precioParada3,
    parada4,
    precioParada4,
  };
  await pool.query("UPDATE viajes set comentario = ? WHERE idRuta = ?", [comentario, id]);
  await pool.query("UPDATE ruta set ? WHERE id = ?", [newRuta, id]);
  const rutaAct = await pool.query("SELECT idRuta FROM viajes WHERE idRuta = ?", [id]);
  const r = rutaAct.length;
  if (r > 0) {
    const asientosA = await pool.query("SELECT asientos FROM ruta WHERE id = ?", [id]);
    const AsrCl = Object.values(asientosA[0])[0];
    if (AsrCl > r) {
      await pool.query("UPDATE ruta set ocupacion = 'Disponible' WHERE id = ?", [id]);
    } else {
      await pool.query("UPDATE ruta set ocupacion = 'Ocupada' WHERE id = ?", [id]);
      req.flash("message", "baja la cantidad de pasajeros que ya no necesitas");
    }
  }
  req.flash("success", "Ruta Actualizada");
  res.redirect("/links/routesCreated");
};

//Eliminar ruta
export const deleteRou = async (req, res) => {
  const { id } = req.params;
  const precio = await pool.query("SELECT precioPagar FROM ruta WHERE id = ?", [id]);
  const disponibilidad = await pool.query("SELECT ocupacion FROM ruta WHERE id = ?", [id]);
  var ocupa = Object.values(disponibilidad[0])[0];
  var total = Object.values(precio[0])[0];
  if (total > 0) {
    req.flash("message", "Primero debes pagar lo que tienes en tu total");
    res.redirect("/links/routesCreated");
  } else if (ocupa == 'Detenida' || ocupa == 'Adeudada') {
    req.flash("message", "Primero debes pagar por tu denuncia");
    res.redirect("/links/routesCreated");
  } else {
    await pool.query("DELETE FROM ruta WHERE ID = ?", [id]);
    req.flash("success", "Ruta Eliminada");
    res.redirect("/links/routesCreated");
  }
};
//TERMINA RUTAS

//Busqueda de rutas
export const renderSearchRoutes = async (req, res) => {
  const { search } = req.body;
  const rutas = await pool.query("SELECT * FROM ruta WHERE localidad = ? AND ocupacion = 'Disponible'", [search]);
  res.render("links/lista", { rutas });
};
//Selección de viajes
export const renderAddViaje = async (req, res) => {
  const { id } = req.params;
  const userP = req.user.id;
  const rutas = await pool.query("SELECT idRuta FROM viajes WHERE idRuta = ?", [id]);
  const rut = rutas.length;
  const asien = await pool.query("SELECT asientos FROM ruta WHERE id = ?", [id]);
  const asientos = Object.values(asien[0])[0];
  const user = await pool.query("SELECT id FROM pasajeros WHERE idUser = ?", [userP]);
  const rutaseleccionada = await pool.query("SELECT * FROM ruta WHERE id = ?", [id]);
  if (user.length === 0) {
    req.flash('message', 'No puedes registrar rutas hasta llenar tu perfil como pasajero');
    res.redirect("/links/createProfilePassager");
  } else if (asientos == rut) {
    req.flash("message", "Ya esta ocupada esta ruta");
    res.redirect("/links/routesSelected");
  } else {
    res.render("links/upTravel", { ruta: rutaseleccionada[0] });
  }
};
//ESCOGER CUAL CAMINO PARA RUTAS
export const renderRoutes = async (req, res) => {
  const pasaj = await pool.query("SELECT id FROM pasajeros WHERE idUser = ?", [req.user.id]);
  const condu = await pool.query("SELECT id FROM conductores WHERE idUser = ?", [req.user.id]);
  const admin = await pool.query("SELECT id FROM admin WHERE idUser = ?", [req.user.id]);
  if (pasaj.length > 0) {
    res.redirect("/links/routesSelected");
  } else if (condu.length > 0) {
    res.redirect("/links/routesCreated");
    //Falta la aplicación del aministrador
  } else if (admin.length > 0) {
    res.redirect("/links/adminDatos");
  } else {
    req.flash("message", "Llena primero tu perfil como conductor o pasajero");
    res.redirect("/profile");
  }
}
//Cambiar a la vista de rutas seleccionadas
export const renderRoutesSelected = async (req, res) => {
  const userP = req.user.id;
  const user = await pool.query("SELECT id FROM pasajeros WHERE idUser = ?", [userP]);
  const condu = await pool.query("SELECT id FROM conductores WHERE idUser = ?", [userP]);
  if (user.length === 0) {
    req.flash('message', 'No has usado rutas, búscala');
    res.redirect("/links/lista");
  } else if (condu.length > 0) {
    res.render("links/rutas");
  }
  else {
    const userD = Object.values(user[0])[0];
    const rutas = await pool.query("SELECT * FROM viajes WHERE idPasajero = ?", [userD]);
    res.render("links/routesSeleted", { rutas });
  }
};
//Observar los pasajeros
export const renderPassager = async (req, res) => {
  const { id } = req.params;
  const pasajeros = await pool.query("SELECT * FROM viajes WHERE idRuta = ?", [id]);
  if (pasajeros.length > 0) {
    res.render("links/passagers", { pasajeros });
  } else {
    req.flash('message', 'No tienes pasajeros');
    res.redirect("/links/solicitudes/" + id);
  }
}
//Eliminar pasajero de un viaje
export const DeletePassager = async (req, res) => {
  const { id } = req.params;
  const rutaS = await pool.query("SELECT idRuta FROM viajes WHERE id = ?", [id]);
  const rCls = Object.values(rutaS[0])[0];
  await pool.query("DELETE FROM viajes WHERE ID = ?", [id]);
  const rutaAct = await pool.query("SELECT idRuta FROM viajes WHERE idRuta = ?", [rCls]);
  const r = rutaAct.length;
  const asientos = await pool.query("SELECT asientos FROM ruta WHERE id = ?", [rCls]);
  const AsrCls = Object.values(asientos[0])[0];
  if (AsrCls > r) {
    await pool.query("UPDATE ruta set ocupacion = 'Disponible' WHERE id = ?", [rCls]);
  } else {
    console.log("Aca sigue ocupada")
  }
  req.flash("message", "Una ganancia menos");
  res.redirect("/links/routesCreated");
};
//Eliminar ruta
export const deleteViaje = async (req, res) => {
  const { id } = req.params;
  const rutaS = await pool.query("SELECT idRuta FROM viajes WHERE id = ?", [id]);
  const rCls = Object.values(rutaS[0])[0];
  await pool.query("DELETE FROM viajes WHERE ID = ?", [id]);
  const rutaAct = await pool.query("SELECT idRuta FROM viajes WHERE idRuta = ?", [rCls]);
  const r = rutaAct.length;
  const asientos = await pool.query("SELECT asientos FROM ruta WHERE id = ?", [rCls]);
  const AsrCls = Object.values(asientos[0])[0];
  if (AsrCls > r) {
    await pool.query("UPDATE ruta set ocupacion = 'Disponible' WHERE id = ?", [rCls]);
  } else {
    console.log("Aca sigue ocupada")
  }
  req.flash("success", "Te has bajado del viaje");
  res.redirect("/links/routesSelected");
};
//Denuncuar ruta
export const denunciViaje = async (req, res) => {
  const { id } = req.params;
  const ruta = await pool.query("SELECT idRuta FROM viajes WHERE id = ?", [id]);
  const ruta2 = Object.values(ruta[0])[0];
  const rutaCompleta = await pool.query("SELECT * FROM ruta WHERE id = ?", [ruta2]);
  res.render("links/categoriaDenunciaRuta", { rutaCompleta });
};
//Vista para Denunciar ruta
export const denunciaDefinitiva = async (req, res) => {
  const { id } = req.params;
  const { denuncias } = req.body;
  const conductor = await pool.query("SELECT idConductor FROM ruta WHERE id = ?", [id]);
  const driver = Object.values(conductor[0])[0];
  const Benuncias = await pool.query("SELECT denuncias FROM conductores WHERE id = ?", [driver]);
  if (Benuncias.length <= 0) {
    await pool.query("UPDATE conductores set denuncias = ? WHERE id = ?", [denuncias, driver]);
  } else {
    const denun = Object.values(Benuncias[0])[0];
    const denunciashechas = parseInt(denuncias)
    const denunciasRegistradas = parseInt(denun)
    const sum = denunciasRegistradas + denunciashechas;
    await pool.query("UPDATE conductores set denuncias = ? WHERE id = ?", [sum, driver]);
  }
  const denuncia = "Detenida";
  await pool.query("UPDATE ruta set ocupacion = ? WHERE id = ?", [denuncia, id]);
  await pool.query("DELETE FROM viajes WHERE viajes.idruta = ?", [id]);
  const contD = await pool.query("SELECT denuncias FROM conductores WHERE id = ?", [driver]);
  var conD = Object.values(contD[0])[0];
  if (conD >= 10 && conD < 50) {
    const disp = "Multado"
    await pool.query("UPDATE conductores set disponible = ? WHERE id = ?", [disp, driver]);
    //await pool.query("UPDATE ruta set ocupacion = ? WHERE idConductor = ?", [denuncia, driver]);
    //await pool.query("UPDATE viajes set acciones = ? WHERE idRuta = ?", [denuncia, id]);
    await pool.query("DELETE FROM ruta WHERE idConductor = ?", [driver]);
  } else if (conD >= 50) {
    const disp = "procesado"
    await pool.query("UPDATE conductores set disponible = ? WHERE id = ?", [disp, driver]);
    await pool.query("DELETE FROM ruta WHERE idConductor = ?", [driver]);
  } else {
    console.log("Bien")
  }
  req.flash("success", "Has denunciado una ruta");
  res.redirect("/links/routesSelected");
};
//Validar si esta todo bien en crear rutas
export const ValidationRenderRoutesSelected = async (req, res) => {
  const userP = req.user.id;
  const conduc = await pool.query("SELECT id FROM conductores WHERE idUser = ?", [userP]);
  var con = Object.values(conduc[0])[0];
  const rutasHechas = await pool.query("SELECT * FROM ruta WHERE idConductor = ?", [con]);
  if (rutasHechas.length === 0) {
    res.redirect("/links/validation");
  } else {
    const dis = await pool.query("SELECT ocupacion FROM ruta WHERE idConductor = ?", [con]);
    const found1 = dis.find(element => element.ocupacion === 'Detenida');
    const found2 = dis.find(element => element.ocupacion === 'Adeudada');
    const found3 = dis.find(element => element.ocupacion === 'Inactiva');
    if (found1 || found2 || found3) {
      req.flash('message', 'Tienes una ruta fuera de servicio, no puedes crear más');
      res.redirect("/links/routesCreated");
    } else {
      res.redirect("/links/validation");
    }
  }
};
//En camino haci el lugar de encuentro
export const enCamino = async (req, res) => {
  const { id } = req.params;
  const disponibilidad = await pool.query("SELECT ocupacion FROM ruta WHERE id = ?", [id]);
  const dispo = Object.values(disponibilidad[0])[0];
  const total = await pool.query("SELECT precioPagar FROM ruta WHERE id = ?", [id]);
  const deuda = Object.values(total[0])[0];
  if (dispo === "Disponible" || dispo === "Ocupada") {
    const accion = "En camino hacia el lugar de encuentro"
    await pool.query("UPDATE viajes set acciones = ? WHERE idRuta = ?", [accion, id]);
    req.flash('success', 'Estas en camino al lugar de encuentro, Suerte');
  } else if (dispo === "Adeudada" || dispo === "Inactiva") {
    req.flash('message', 'Estas en deuda paga tu liquidación ', deuda, 'para habilitarla');
  } else {
    req.flash('message', 'Tu ruta esta Denunciada, tendrás que esperar 3 días para seguir con tu servicio.');
  }
  res.redirect("/links/routesCreated");
};

//En espera de pasajeros
export const enEspera = async (req, res) => {
  const { id } = req.params;
  const disponibilidad = await pool.query("SELECT ocupacion FROM ruta WHERE id = ?", [id]);
  const dispo = Object.values(disponibilidad[0])[0];
  const total = await pool.query("SELECT precioPagar FROM ruta WHERE id = ?", [id]);
  const deuda = Object.values(total[0])[0];
  if (dispo === "Disponible" || dispo === "Ocupada") {
    const accion = "En espera de pasajeros";
    await pool.query("UPDATE viajes set acciones = ? WHERE idRuta = ?", [accion, id]);
    req.flash('success', 'Estas en espera de pasajeros, suerte');
  } else if (dispo === "Adeudada" || dispo === "Inactiva") {
    req.flash('message', 'Estas en deuda paga tu liquidación ', deuda, 'para habilitarla');
  } else {
    req.flash('message', 'Tu ruta esta Denunciada, tendrás que esperar 3 días para seguir con tu servicio.');
  }
  res.redirect("/links/routesCreated");
};
//En marcha
export const enMarcha = async (req, res) => {
  const { id } = req.params;
  const disponibilidad = await pool.query("SELECT ocupacion FROM ruta WHERE id = ?", [id]);
  const dispo = Object.values(disponibilidad[0])[0];
  const total = await pool.query("SELECT precioPagar FROM ruta WHERE id = ?", [id]);
  const deuda = Object.values(total[0])[0];
  if (dispo === "Disponible" || dispo === "Ocupada") {
    const precios = await pool.query("SELECT SUM(Precio) FROM viajes WHERE idRuta = ?", [id]);
    const pre = Object.values(precios[0])[0];
    const porce = 10;
    const pocen1 = porce * pre;
    const porce2 = pocen1 / 100;
    const Precioruta = await pool.query("SELECT precioPagar FROM ruta WHERE id = ?", [id]);
    const pagarComodify = Object.values(Precioruta[0])[0];
    const precioComodify = parseInt(pagarComodify)
    const lista = parseInt(porce2)
    const sum = precioComodify + lista
    const accion = "En Marcha";
    await pool.query("UPDATE ruta set precioPagar = ? WHERE id = ?", [sum, id]);
    await pool.query("UPDATE viajes set acciones = ? WHERE idRuta = ?", [accion, id]);
    req.flash('success', 'En marcha hacia los destinos se te sumaron ', [porce2], "pesos a tu cuenta");
  } else if (dispo === "Adeudada" || dispo === "Inactiva") {
    req.flash('message', 'Estas en deuda paga tu liquidación ', deuda, 'para habilitarla');
  } else {
    req.flash('message', 'Tu ruta esta Denunciada, tendrás que esperar 3 días para seguir con tu servicio.');
  }
  res.redirect("/links/routesCreated");
};
//Finalización de ruta
export const finalRuta = async (req, res) => {
  const { id } = req.params;
  const disponibilidad = await pool.query("SELECT ocupacion FROM ruta WHERE id = ?", [id]);
  const dispo = Object.values(disponibilidad[0])[0];
  const total = await pool.query("SELECT precioPagar FROM ruta WHERE id = ?", [id]);
  const deuda = Object.values(total[0])[0];
  if (dispo === "Disponible" || dispo === "Ocupada") {
    const accion = "Actividad de la ruta";
    await pool.query("UPDATE viajes set acciones = ? WHERE idRuta = ?", [accion, id]);
    req.flash('message', 'Finalizaste la ruta, hasta pronto');
  } else if (dispo === "Adeudada" || dispo === "Inactiva") {
    req.flash('message', 'Estas en deuda paga tu liquidación ', deuda, 'para habilitarla');
  } else {
    req.flash('message', 'Tu ruta esta Denunciada, tendrás que esperar 3 días para seguir con tu servicio.');
  }
  res.redirect("/links/routesCreated");
};
//Indisponibilidad
export const indisponibilidad = async (req, res) => {
  const { id } = req.params;
  const disponibilidad = await pool.query("SELECT ocupacion FROM ruta WHERE id = ?", [id]);
  const dispo = Object.values(disponibilidad[0])[0];
  const total = await pool.query("SELECT precioPagar FROM ruta WHERE id = ?", [id]);
  const deuda = Object.values(total[0])[0];
  if (dispo === "Disponible" || dispo === "Ocupada") {
    const accion = "No estoy disponible hoy"
    await pool.query("UPDATE viajes set acciones = ? WHERE idRuta = ?", [accion, id]);
    req.flash('message', 'Será otro día. ya le informamos a tus pasajeros');
  } else if (dispo === "Adeudada" || dispo === "Inactiva") {
    req.flash('message', 'Estas en deuda paga tu liquidación ', deuda, 'para habilitarla');
  } else {
    req.flash('message', 'Tu ruta esta Denunciada, tendrás que esperar 3 días para seguir con tu servicio.');
  }
  res.redirect("/links/routesCreated");
};
// EMPIEZA LAS SOLICITUDES -------------------------------------------------------------------------------------
export const solicitudes = async (req, res) => {
  const { id } = req.params;
  const solicitudes = await pool.query("SELECT * FROM solicitudes WHERE idRuta = ?", [id]);
  if (solicitudes.length > 0) {
    res.render("links/solicitudes", { solicitudes });
  } else {
    req.flash('message', 'No tienes solicitudes de pasajeros por ahora');
    res.redirect("/links/routesCreated");
  }
}
//Añadir a solicitudes
export const addSolicitud = async (req, res) => {
  const userP = req.user.id;
  const { id } = req.params;
  const user = await pool.query("SELECT id FROM pasajeros WHERE idUser = ?", [userP]);
  var pasa = Object.values(user[0])[0];
  const userName = await pool.query("SELECT nombre FROM pasajeros WHERE idUser = ?", [userP]);
  var pasaName = Object.values(userName[0])[0];
  const userStair = await pool.query("SELECT denuncias FROM pasajeros WHERE idUser = ?", [userP]);
  var de = Object.values(userStair[0])[0];
  const soli = await pool.query("SELECT id FROM solicitudes WHERE idPasajero = ?", [pasa]);
  const rutaAc = await pool.query("SELECT id FROM viajes WHERE idPasajero = ?", [pasa]);
  if (soli.length <= 1 && rutaAc.length < 1) {
    const { parada, precio } = req.body;
    const newLink = {
      parada,
      precio,
      idRuta: id,
      nombre: pasaName,
      idPasajero: pasa,
      puntuacion: de,
    };
    await pool.query('INSERT INTO solicitudes set ?', [newLink]);
    req.flash('success', 'Espera que te acepten en su viaje, vuelve a entrar antes de la fecha de tu ruta.');
    res.redirect("/links/routesSelected");
  }
  else {
    req.flash("message", "Ya has enviado dos solicitudes o estas en activ@ en 2 rutas");
    res.redirect("/links/routesSelected");
  }
};
//Añadir viajes
export const addViaje = async (req, res) => {
  const { id } = req.params;
  const { idS, parada, precio, idPasajero, nombre } = req.body;
  const acciones = "Actividad de ruta";
  const comentar = await pool.query("SELECT comentario FROM ruta WHERE id = ?", [id]);
  const asientos = await pool.query("SELECT asientos FROM ruta WHERE id = ?", [id]);
  const rutasV = await pool.query("SELECT idRuta FROM viajes WHERE idRuta = ?", [id]);
  const rut2 = rutasV.length;
  const asientosC = Object.values(asientos[0])[0];
  if (asientosC == rut2) {
    await pool.query("UPDATE ruta set ocupacion = 'Ocupada' WHERE id = ?", [id]);
    req.flash("message", "Ya ocupaste tu ruta, niega a los que te sobran para que puedan seleccionar otra");
    res.redirect("/links/solicitudes/" + id);
  } else {
    var comentario = Object.values(comentar[0])[0];
    const newLink = {
      idRuta: id,
      idPasajero,
      nombre,
      parada,
      precio,
      comentario,
      acciones
    };
    await pool.query('INSERT INTO viajes set ?', [newLink]);
    await pool.query("DELETE FROM solicitudes WHERE ID = ?", [idS]);
    const rutasViajes = await pool.query("SELECT idRuta FROM viajes WHERE idRuta = ?", [id]);
    const ruts = rutasViajes.length;
    if (asientosC == ruts) {
      await pool.query("UPDATE ruta set ocupacion = 'Ocupada' WHERE id = ?", [id]);
    } else {
      console.log("Hola NO son iguales")
    }

    req.flash('success', 'Felicidades, tienes nuevo pasajero');
    res.redirect("/links/solicitudes/" + id);
  }
};
//negar viajes
export const addNoTViaje = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM solicitudes WHERE ID = ?", [id]);
  req.flash("message", "No aceptaste un pasajero");
  res.redirect("/links/routesCreated");
};
//Observar las solicitudes desde el pasajero
export const solicitudesPasajero = async (req, res) => {
  const { id } = req.params;
  const solicitudesPasa = await pool.query("SELECT * FROM solicitudes WHERE idPasajero = ?", [id]);
  if (solicitudesPasa.length > 0) {
    res.render("links/solicitudesPasa", { solicitudesPasa });
  } else {
    req.flash('message', 'No tienes solicitudes en rutas');
    res.redirect("/links/datesProfilePassager");
  }
}
//Eliminar solicitud
export const eliminarSol = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM solicitudes WHERE id = ?", [id]);
  req.flash("message", "Eliminaste una solicitud");
  res.redirect("/links/datesProfilePassager");
};


//Vista para denuncia al pasajero
export const denunciPasa = async (req, res) => {
  const { id } = req.params;
  const pasajero = await pool.query("SELECT * FROM pasajeros WHERE id = ?", [id]);
  res.render("links/categoriaDenunciaPasa", { pasajero });
};

//Vista para Denunciar ruta
export const denunciaDefinitivaPasa = async (req, res) => {
  const { id } = req.params;
  const { denuncias } = req.body;
  const DenunciasPasa = await pool.query("SELECT denuncias FROM pasajeros WHERE id = ?", [id]);
  if (DenunciasPasa.length <= 0) {
    await pool.query("UPDATE pasajeros set denuncias = ? WHERE id = ?", [denuncias, id]);
  } else {
    const denun = Object.values(DenunciasPasa[0])[0];
    const denunciashechas = parseInt(denuncias)
    const denunciasRegistradas = parseInt(denun)
    const sum = denunciasRegistradas + denunciashechas;
    await pool.query("UPDATE pasajeros set denuncias = ? WHERE id = ?", [sum, id]);
  }
  req.flash("message", "Reclamo hecho, puedes eliminar a tu pasajero");
  res.redirect("/links/routesCreated");
};