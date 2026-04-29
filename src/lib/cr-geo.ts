export interface GeoCanton {
  canton: string
  districts: string[]
}

export interface GeoProvince {
  province: string
  cantons: GeoCanton[]
}

export const CR_GEO: GeoProvince[] = [
  {
    province: 'San José',
    cantons: [
      { canton: 'San José', districts: ['Carmen', 'Merced', 'Hospital', 'Catedral', 'Zapote', 'San Francisco de Dos Ríos', 'Uruca', 'Mata Redonda', 'Pavas', 'Hatillo', 'San Sebastián'] },
      { canton: 'Escazú', districts: ['Escazú', 'San Antonio', 'San Rafael'] },
      { canton: 'Desamparados', districts: ['Desamparados', 'San Miguel', 'San Juan de Dios', 'San Rafael Arriba', 'San Antonio', 'Frailes', 'Patarrá', 'San Cristóbal', 'Rosario', 'Damas', 'San Rafael Abajo', 'Gravilias', 'Los Guido'] },
      { canton: 'Puriscal', districts: ['Santiago', 'Mercedes Sur', 'Barbacoas', 'Grifo Alto', 'San Rafael', 'Candelarita', 'Desamparaditos', 'San Antonio', 'Chires'] },
      { canton: 'Tarrazú', districts: ['San Marcos', 'San Lorenzo', 'San Carlos'] },
      { canton: 'Aserrí', districts: ['Aserrí', 'Tarbaca', 'Vuelta de Jorco', 'San Gabriel', 'Legua', 'Monterrey', 'Salitrillos'] },
      { canton: 'Mora', districts: ['Colón', 'Guayabo', 'Tabarcia', 'Piedras Negras', 'Picagres', 'Jaris', 'Quitirrisí'] },
      { canton: 'Goicoechea', districts: ['Guadalupe', 'San Francisco', 'Calle Blancos', 'Mata de Plátano', 'Ipís', 'Rancho Redondo', 'Purral'] },
      { canton: 'Santa Ana', districts: ['Santa Ana', 'Salitral', 'Pozos', 'Uruca', 'Piedades', 'Brasil'] },
      { canton: 'Alajuelita', districts: ['Alajuelita', 'San Josecito', 'San Antonio', 'Concepción', 'San Felipe'] },
      { canton: 'Vásquez de Coronado', districts: ['San Isidro', 'San Rafael', 'Dulce Nombre de Jesús', 'Patalillo', 'Cascajal'] },
      { canton: 'Acosta', districts: ['San Ignacio', 'Guaitil', 'Palmichal', 'Cangrejal', 'Sabanillas'] },
      { canton: 'Tibás', districts: ['San Juan', 'Cinco Esquinas', 'Anselmo Llorente', 'León XIII', 'Colima'] },
      { canton: 'Moravia', districts: ['San Vicente', 'San Jerónimo', 'La Trinidad'] },
      { canton: 'Montes de Oca', districts: ['San Pedro', 'Sabanilla', 'Mercedes', 'San Rafael'] },
      { canton: 'Turrubares', districts: ['San Pablo', 'San Pedro', 'San Juan de Mata', 'San Luis', 'Carara'] },
      { canton: 'Dota', districts: ['Santa María', 'Jardín', 'Copey'] },
      { canton: 'Curridabat', districts: ['Curridabat', 'Granadilla', 'Sánchez', 'Tirrases'] },
      { canton: 'Pérez Zeledón', districts: ['San Isidro de El General', 'El General', 'Daniel Flores', 'Rivas', 'San Pedro', 'Platanares', 'Pejibaye', 'Cajón', 'Barú', 'Río Nuevo', 'Páramo', 'La Amistad'] },
      { canton: 'León Cortés Castro', districts: ['San Pablo', 'San Andrés', 'Llano Bonito', 'San Isidro', 'Santa Cruz', 'San Antonio'] },
    ],
  },
  {
    province: 'Alajuela',
    cantons: [
      { canton: 'Alajuela', districts: ['Alajuela', 'San José', 'Carrizal', 'San Antonio', 'Guácimo', 'San Isidro', 'Sabanilla', 'San Rafael', 'Río Segundo', 'Desamparados', 'Turrúcares', 'Tambor', 'Garita', 'Sarapiquí'] },
      { canton: 'San Ramón', districts: ['San Ramón', 'Santiago', 'San Juan', 'Piedades Norte', 'Piedades Sur', 'San Rafael', 'San Isidro', 'Ángeles', 'Alfaro', 'Volio', 'Concepción', 'Zapotal', 'Peñas Blancas', 'San Lorenzo'] },
      { canton: 'Grecia', districts: ['Grecia', 'San Isidro', 'San José', 'San Roque', 'Tacares', 'Río Cuarto', 'Puente de Piedra', 'Bolívar'] },
      { canton: 'San Mateo', districts: ['San Mateo', 'Desmonte', 'Jesús María', 'Labrador'] },
      { canton: 'Atenas', districts: ['Atenas', 'Jesús', 'Mercedes', 'San Isidro', 'Concepción', 'San José', 'Santa Eulalia', 'Escobal'] },
      { canton: 'Naranjo', districts: ['Naranjo', 'San Miguel', 'San José', 'Cirrí Sur', 'San Jerónimo', 'San Juan', 'El Rosario', 'Palmitos'] },
      { canton: 'Palmares', districts: ['Palmares', 'Zaragoza', 'Buenos Aires', 'Santiago', 'Candelaria', 'Esquipulas', 'La Granja'] },
      { canton: 'Poás', districts: ['San Juan', 'San Pedro', 'San Juan Bosco', 'Carrillos', 'Sabana Redonda'] },
      { canton: 'Orotina', districts: ['Orotina', 'El Mastate', 'Hacienda Vieja', 'Coyolar', 'La Ceiba'] },
      { canton: 'San Carlos', districts: ['Quesada', 'Florencia', 'Buenavista', 'Aguas Zarcas', 'Venecia', 'Pital', 'La Fortuna', 'La Tigra', 'La Palmera', 'Venado', 'Cutris', 'Monterrey', 'Pocosol'] },
      { canton: 'Zarcero', districts: ['Zarcero', 'Laguna', 'Tapesco', 'Guadalupe', 'Palmira', 'Zapote', 'Brisas'] },
      { canton: 'Sarchí', districts: ['Sarchí Norte', 'Sarchí Sur', 'Toro Amarillo', 'San Pedro', 'Rodríguez'] },
      { canton: 'Upala', districts: ['Upala', 'Aguas Claras', 'San José o Pizote', 'Bijagua', 'Delicias', 'Dos Ríos', 'Yolillal', 'Canalete'] },
      { canton: 'Los Chiles', districts: ['Los Chiles', 'Caño Negro', 'El Amparo', 'San Jorge'] },
      { canton: 'Guatuso', districts: ['San Rafael', 'Buenavista', 'Cote', 'Katira'] },
      { canton: 'Río Cuarto', districts: ['Río Cuarto', 'Santa Rita', 'Santa Isabel'] },
    ],
  },
  {
    province: 'Cartago',
    cantons: [
      { canton: 'Cartago', districts: ['Oriental', 'Occidental', 'Carmen', 'San Nicolás', 'Aguacaliente', 'Guadalupe', 'Corralillo', 'Tierra Blanca', 'Dulce Nombre', 'Llano Grande', 'Quebradilla'] },
      { canton: 'Paraíso', districts: ['Paraíso', 'Santiago', 'Orosi', 'Cachí', 'Llanos de Santa Lucía'] },
      { canton: 'La Unión', districts: ['Tres Ríos', 'San Diego', 'San Juan', 'San Rafael', 'Concepción', 'Dulce Nombre', 'San Ramón', 'Río Azul'] },
      { canton: 'Jiménez', districts: ['Juan Viñas', 'Tucurrique', 'Pejibaye'] },
      { canton: 'Turrialba', districts: ['Turrialba', 'La Suiza', 'Peralta', 'Santa Cruz', 'Santa Teresita', 'Pavones', 'Tuis', 'Tayutic', 'Santa Rosa', 'Tres Equis', 'La Isabel', 'Chirripó'] },
      { canton: 'Alvarado', districts: ['Pacayas', 'Cervantes', 'Capellades'] },
      { canton: 'Oreamuno', districts: ['San Rafael', 'Cot', 'Potrero Cerrado', 'Cipreses', 'Santa Rosa'] },
      { canton: 'El Guarco', districts: ['El Tejar', 'San Isidro', 'Tobosi', 'Patio de Agua'] },
    ],
  },
  {
    province: 'Heredia',
    cantons: [
      { canton: 'Heredia', districts: ['Heredia', 'Mercedes', 'San Francisco', 'Ulloa', 'Varablanca'] },
      { canton: 'Barva', districts: ['Barva', 'San Pedro', 'San Pablo', 'San Roque', 'Santa Lucía', 'San José de la Montaña'] },
      { canton: 'Santo Domingo', districts: ['Santo Domingo', 'San Vicente', 'San Miguel', 'Paracito', 'Santo Tomás', 'Santa Rosa', 'Tures', 'Pará'] },
      { canton: 'Santa Bárbara', districts: ['Santa Bárbara', 'San Pedro', 'San Juan', 'Jesús', 'Santo Domingo', 'Purabá'] },
      { canton: 'San Rafael', districts: ['San Rafael', 'San Josecito', 'Santiago', 'Ángeles', 'Concepción'] },
      { canton: 'San Isidro', districts: ['San Isidro', 'San José', 'Concepción', 'San Francisco'] },
      { canton: 'Belén', districts: ['San Antonio', 'La Ribera', 'La Asunción'] },
      { canton: 'Flores', districts: ['San Joaquín', 'Barrantes', 'Llorente'] },
      { canton: 'San Pablo', districts: ['San Pablo', 'Rincón de Sabanilla'] },
      { canton: 'Sarapiquí', districts: ['Puerto Viejo', 'La Virgen', 'Las Horquetas', 'Llanuras del Gaspar', 'Cureña'] },
    ],
  },
  {
    province: 'Guanacaste',
    cantons: [
      { canton: 'Liberia', districts: ['Liberia', 'Cañas Dulces', 'Mayorga', 'Nacascolo', 'Curubandé'] },
      { canton: 'Nicoya', districts: ['Nicoya', 'Mansión', 'San Antonio', 'Quebrada Honda', 'Sámara', 'Nosara', 'Belén de Nosarita'] },
      { canton: 'Santa Cruz', districts: ['Santa Cruz', 'Bolsón', 'Veintisiete de Abril', 'Tempate', 'Cartagena', 'Cuajiniquil', 'Diriá', 'Cabo Velas', 'Tamarindo'] },
      { canton: 'Bagaces', districts: ['Bagaces', 'La Fortuna', 'Mogote', 'Río Naranjo'] },
      { canton: 'Carrillo', districts: ['Filadelfia', 'Palmira', 'Sardinal', 'Belén'] },
      { canton: 'Cañas', districts: ['Cañas', 'Palmira', 'San Miguel', 'Bebedero', 'Porozal'] },
      { canton: 'Abangares', districts: ['Las Juntas', 'Sierra', 'San Juan', 'Colorado'] },
      { canton: 'Tilarán', districts: ['Tilarán', 'Quebrada Grande', 'Tronadora', 'Santa Rosa', 'Líbano', 'Tierras Morenas', 'Arenal', 'Cabeceras'] },
      { canton: 'Nandayure', districts: ['Carmona', 'Santa Rita', 'Zapotal', 'San Pablo', 'Porvenir', 'Bejuco'] },
      { canton: 'La Cruz', districts: ['La Cruz', 'Santa Cecilia', 'La Garita', 'Santa Elena'] },
      { canton: 'Hojancha', districts: ['Hojancha', 'Monte Romo', 'Puerto Carrillo', 'Huacas', 'Matambú'] },
    ],
  },
  {
    province: 'Puntarenas',
    cantons: [
      { canton: 'Puntarenas', districts: ['Puntarenas', 'Pitahaya', 'Chomes', 'Lepanto', 'Paquera', 'Manzanillo', 'Guacimal', 'Barranca', 'Monte Verde', 'Isla del Coco', 'Cóbano', 'Chacarita', 'Chira', 'Acapulco', 'El Roble', 'Arancibia'] },
      { canton: 'Esparza', districts: ['Espíritu Santo', 'San Juan Grande', 'Macacona', 'San Rafael', 'San Jerónimo', 'Caldera'] },
      { canton: 'Buenos Aires', districts: ['Buenos Aires', 'Volcán', 'Potrero Grande', 'Boruca', 'Pilas', 'Colinas', 'Chánguena', 'Biolley', 'Brunka'] },
      { canton: 'Montes de Oro', districts: ['Miramar', 'La Unión', 'San Isidro'] },
      { canton: 'Osa', districts: ['Puerto Cortés', 'Palmar', 'Sierpe', 'Bahía Ballena', 'Piedras Blancas', 'Bahía Drake'] },
      { canton: 'Quepos', districts: ['Quepos', 'Savegre', 'Naranjito'] },
      { canton: 'Golfito', districts: ['Golfito', 'Puerto Jiménez', 'Guaycará', 'Pavón'] },
      { canton: 'Coto Brus', districts: ['San Vito', 'Sabalito', 'Aguabuena', 'Limoncito', 'Pittier', 'Gutierrez Braun'] },
      { canton: 'Parrita', districts: ['Parrita'] },
      { canton: 'Corredores', districts: ['Corredor', 'La Cuesta', 'Canoas', 'Laurel'] },
      { canton: 'Garabito', districts: ['Jacó', 'Tárcoles', 'Tárcol'] },
      { canton: 'Monteverde', districts: ['Monteverde', 'Cerro Plano', 'Santa Elena', 'Cabeceras', 'Cañitas', 'La Cruz'] },
    ],
  },
  {
    province: 'Limón',
    cantons: [
      { canton: 'Limón', districts: ['Limón', 'Valle La Estrella', 'Río Blanco', 'Matama'] },
      { canton: 'Pococí', districts: ['Guápiles', 'Jiménez', 'La Rita', 'Roxana', 'Cariari', 'Colorado', 'La Colonia'] },
      { canton: 'Siquirres', districts: ['Siquirres', 'Pacuarito', 'Florida', 'Germania', 'El Cairo', 'Alegría', 'Reventazón'] },
      { canton: 'Talamanca', districts: ['Bratsi', 'Sixaola', 'Cahuita', 'Telire'] },
      { canton: 'Matina', districts: ['Matina', 'Batán', 'Carrandi'] },
      { canton: 'Guácimo', districts: ['Guácimo', 'Mercedes', 'Pocora', 'Río Jiménez', 'Duacarí'] },
    ],
  },
]
