'use strict';
// Transcripción de indexLegacy/index.html. Las excepciones de Eco se conservan.
window.Eco = window.Eco || {};
Eco.config = {
  "AB": {
    "Fue": [
      8,
      -1
    ],
    "Des": [
      16,
      3
    ],
    "Con": [
      10,
      0
    ],
    "Int": [
      14,
      2
    ],
    "Sab": [
      15,
      2
    ],
    "Car": [
      12,
      1
    ]
  },
  "SPELLS": [
    [
      "Chill Touch",
      "Truco",
      "120 pies",
      "2d8 necrótico",
      "Ataque de conjuro; impide recuperar PG hasta el inicio del próximo turno del lanzador; contra no muertos añade efecto especial en 2014. No requiere contacto."
    ],
    [
      "Sacred Flame",
      "Truco",
      "60 pies",
      "2d8 radiante",
      "Salvación de Destreza; ignora cobertura para la salvación. No es daño de fuego."
    ],
    [
      "Fire Bolt",
      "Truco",
      "120 pies",
      "2d10 fuego",
      "Ataque de conjuro a distancia; puede prender objetos inflamables no llevados."
    ],
    [
      "Spare the Dying",
      "Truco",
      "Toque",
      "Estabilizar",
      "Estabiliza a una criatura viva a 0 PG. No recupera PG ni tiene alcance a distancia en 2014."
    ],
    [
      "Vicious Mockery",
      "Truco",
      "60 pies",
      "2d4 psíquico",
      "Salvación de Sabiduría; si falla, desventaja en el siguiente ataque antes de terminar su siguiente turno. Debe poder oír, no entender."
    ],
    [
      "Cure Wounds",
      "Nivel 1",
      "Toque",
      "1d8 + modificador de lanzamiento",
      "Acción y un espacio de nivel 1; no afecta a constructos ni muertos vivientes bajo 2014. Si procede de Bardo y usa Carisma, el modificador es +1."
    ],
    [
      "Tasha's Hideous Laughter",
      "Nivel 1",
      "30 pies",
      "Control / concentración",
      "Salvación de Sabiduría; criatura con Inteligencia 4 o menos no es afectada; concentración hasta 1 minuto. Repite salvación al final de turno y al recibir daño (con ventaja en esta última)."
    ]
  ],
  "CONDITIONS": [
    "Hechizada",
    "Cegada",
    "Ensordecida",
    "Asustada",
    "Agarrada",
    "Incapacitada",
    "Invisible",
    "Paralizada",
    "Petrificada",
    "Envenenada",
    "Derribada",
    "Restringida",
    "Aturdida",
    "Inconsciente",
    "Exhausta"
  ],
  "ACTIONS": [
    [
      "unarmed",
      "Golpe desarmado"
    ],
    [
      "scimitar",
      "Cimitarra ígnea"
    ],
    [
      "bow",
      "Arco ligero"
    ],
    [
      "hammer1",
      "Martillo de guerra (1 mano)"
    ],
    [
      "hammer2",
      "Martillo de guerra (2 manos)"
    ],
    [
      "chill",
      "Chill Touch"
    ],
    [
      "sacred",
      "Sacred Flame"
    ],
    [
      "firebolt",
      "Fire Bolt"
    ],
    [
      "mockery",
      "Vicious Mockery"
    ],
    [
      "spare",
      "Spare the Dying"
    ],
    [
      "cure",
      "Cure Wounds"
    ],
    [
      "tasha",
      "Tasha's Hideous Laughter"
    ],
    [
      "dodge",
      "Esquivar"
    ],
    [
      "dash",
      "Correr"
    ],
    [
      "disengage",
      "Destrabarse"
    ],
    [
      "hide",
      "Esconderse"
    ],
    [
      "help",
      "Ayudar"
    ],
    [
      "search",
      "Buscar / Investigar"
    ],
    [
      "ready",
      "Preparar acción"
    ],
    [
      "use",
      "Usar objeto / interactuar"
    ],
    [
      "attune",
      "Armonía con los Elementos"
    ]
  ],
  "BONUSES": [
    [
      "none",
      "Ninguna"
    ],
    [
      "martial",
      "Artes Marciales · 1 golpe"
    ],
    [
      "flurry",
      "Ráfaga · 2 golpes (1 Ki)"
    ],
    [
      "patient",
      "Defensa Paciente (1 Ki)"
    ],
    [
      "stepdash",
      "Paso del Viento · Correr (1 Ki)"
    ],
    [
      "stepdisengage",
      "Paso del Viento · Destrabarse (1 Ki)"
    ],
    [
      "inspire",
      "Inspiración Bárdica (1 uso)"
    ]
  ],
  "character": {
    "id": "eco-apeiron",
    "name": "Eco",
    "campaign": "Apeiron",
    "edition": "5e-2014",
    "level": 5,
    "monkLevel": 3,
    "bardLevel": 2,
    "ac": 15,
    "initiative": 4,
    "speed": 40,
    "proficiency": 3,
    "kiDC": 13,
    "bardDC": 12,
    "bardAttack": 4
  },
  "weapons": {
    "unarmed": {
      "name": "Mano limpia",
      "attack": 6,
      "formula": "1d4+3",
      "type": "contundente",
      "reach": 5,
      "monk": true
    },
    "scimitar": {
      "name": "Cimitarra ígnea",
      "attack": 6,
      "formula": "1d8+4 cortante + 1d4 fuego",
      "type": "cortante y fuego",
      "reach": 5,
      "monk": true,
      "note": "Excepción de la ficha: arma de monje; fundamento pendiente."
    },
    "bow": {
      "name": "Arco ligero",
      "attack": 6,
      "formula": "1d8+4",
      "type": "perforante",
      "reach": 80,
      "longReach": 320,
      "monk": false
    },
    "hammer1": {
      "name": "Martillo (1 mano)",
      "attack": 6,
      "formula": "1d8+4",
      "type": "contundente",
      "reach": 5,
      "monk": false
    },
    "hammer2": {
      "name": "Martillo (2 manos)",
      "attack": 6,
      "formula": "1d10+4",
      "type": "contundente",
      "reach": 5,
      "monk": false
    }
  },
  "magic": {
    "chill": {
      "name": "Chill Touch",
      "range": 120,
      "dice": "2d8 necrótico",
      "kind": "attack",
      "components": "V, S",
      "duration": "1 asalto",
      "origin": "pending"
    },
    "sacred": {
      "name": "Sacred Flame",
      "range": 60,
      "dice": "2d8 radiante",
      "kind": "save",
      "save": "Destreza",
      "components": "V, S",
      "duration": "Instantánea",
      "origin": "pending"
    },
    "firebolt": {
      "name": "Fire Bolt",
      "range": 120,
      "dice": "2d10 fuego",
      "kind": "attack",
      "components": "V, S",
      "duration": "Instantánea",
      "origin": "pending"
    },
    "mockery": {
      "name": "Vicious Mockery",
      "range": 60,
      "dice": "2d4 psíquico",
      "kind": "save",
      "save": "Sabiduría",
      "components": "V",
      "duration": "Instantánea",
      "origin": "bard"
    },
    "spare": {
      "name": "Spare the Dying",
      "range": 5,
      "dice": "Estabilizar; no cura",
      "kind": "support",
      "components": "V, S",
      "duration": "Instantánea",
      "origin": "pending"
    },
    "cure": {
      "name": "Cure Wounds",
      "range": 5,
      "dice": "1d8 + modificador de lanzamiento",
      "kind": "heal",
      "slot": 1,
      "components": "V, S",
      "duration": "Instantánea",
      "origin": "conditional"
    },
    "tasha": {
      "name": "Tasha's Hideous Laughter",
      "range": 30,
      "dice": "Control; sin daño",
      "kind": "save",
      "save": "Sabiduría",
      "slot": 1,
      "concentration": true,
      "components": "V, S, M (tartas diminutas y una pluma, o foco válido)",
      "duration": "Hasta 1 minuto",
      "origin": "bard"
    }
  },
  "resources": [
    [
      "hp",
      "PG actuales",
      "maxHp"
    ],
    [
      "tempHp",
      "PG temporales",
      999
    ],
    [
      "ki",
      "Ki",
      3
    ],
    [
      "slots",
      "Espacios nivel 1",
      3
    ],
    [
      "inspiration",
      "Inspiración bárdica",
      1
    ],
    [
      "hitDice",
      "Dados de golpe (d8)",
      5
    ],
    [
      "arrows",
      "Flechas confirmadas",
      9999
    ],
    [
      "deathSuccess",
      "Salvaciones de muerte: éxitos",
      3
    ],
    [
      "deathFail",
      "Salvaciones de muerte: fallos",
      3
    ]
  ],
  "presets": {
    "bow": [
      "bow",
      "none",
      false,
      0,
      120
    ],
    "sword": [
      "scimitar",
      "martial",
      false,
      0,
      5
    ],
    "flurry": [
      "scimitar",
      "flurry",
      false,
      0,
      5
    ],
    "fangs": [
      "unarmed",
      "martial",
      true,
      0,
      5
    ],
    "max": [
      "unarmed",
      "flurry",
      true,
      1,
      5
    ],
    "retreat": [
      "scimitar",
      "stepdisengage",
      false,
      0,
      5
    ],
    "heal": [
      "cure",
      "none",
      false,
      0,
      5
    ],
    "control": [
      "tasha",
      "inspire",
      false,
      0,
      30
    ]
  }
};
