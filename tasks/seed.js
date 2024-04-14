import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import {
  createPepper,
  createPepperDev,
  getPepperById,
} from "../data/peppers.js";

const db = await dbConnection();
await db.dropDatabase();

let scotchBonnetRed,
  scotchBonnetYellow,
  scotchBonnetChocolate,
  ghostPepper,
  carolinaReaper,
  bolivianRainbow,
  cayenneLongSlim,
  chiltepin,
  sugarRushPeach,
  peterPepper,
  rocotoYellow,
  tobasco,
  thorsThunderbolt,
  bishopCrown;
const seedPeppers = async () => {
  // Code to seed peppers data
  scotchBonnetRed = await createPepperDev(
    "scotch bonnet red",
    [],
    "chinense",
    4,
    "Red",
    [2.5, 4],
    80,
    "JM"
  );
  scotchBonnetYellow = await createPepperDev(
    "scotch bonnet yellow",
    [],
    "chinense",
    4,
    "Yellow",
    [4, 6],
    90,
    "JM"
  );
  scotchBonnetChocolate = await createPepperDev(
    "scotch bonnet chocolate",
    ["scotch bonnet brown"],
    "chinense",
    5,
    "Brown",
    [3.5, 5.5],
    90,
    "JM"
  );
  ghostPepper = await createPepperDev(
    "ghost pepper",
    ["bhut jolokia"],
    "chinense",
    6,
    "Red",
    [5, 7.5],
    120,
    "IN"
  );
  carolinaReaper = await createPepperDev(
    "carolina reaper",
    [],
    "chinense",
    6,
    "Red",
    [4, 5.5],
    120,
    "US"
  );
  bolivianRainbow = await createPepperDev(
    "bolivian rainbow",
    [],
    "annuum",
    3,
    "purple",
    [1, 2],
    70,
    "BO"
  );
  cayenneLongSlim = await createPepperDev(
    "cayenne long slim",
    [],
    "annuum",
    3,
    "red",
    [10, 15],
    70,
    "GF"
  );
  chiltepin = await createPepperDev(
    "chiltepin",
    ["tepin"],
    "annuum",
    3,
    "red",
    [0.5, 1],
    80,
    "US"
  );
  sugarRushPeach = await createPepperDev(
    "sugar rush peach",
    ["sugar rush"],
    "baccatum",
    3,
    "orange",
    [7.5, 10],
    120,
    "GB"
  );
  peterPepper = await createPepperDev(
    "peter pepper",
    ["peter"],
    "annuum",
    3,
    "red",
    [7.5, 10],
    70,
    "US"
  );
  rocotoYellow = await createPepperDev(
    "rocoto yellow",
    ["canario", "rocoto canario"],
    "pubescens",
    4,
    "yellow",
    [3.5, 5],
    120,
    "PE"
  );
  tobasco = await createPepperDev(
    "tobasco",
    [],
    "frutescens",
    4,
    "green",
    [2.5, 4],
    90,
    "US"
  );
  thorsThunderbolt = await createPepperDev(
    "thors thunderbolt",
    [],
    "chinense",
    5,
    "purple",
    [7.5, 10],
    70,
    "US"
  );
  bishopCrown = await createPepperDev(
    "bishop crown",
    ["crown"],
    "baccatum",
    3,
    "red",
    [2.5, 3.5],
    90,
    "BB"
  );
};

try {
  await seedPeppers();
} catch (error) {
  console.error(error);
}

// the professor seems to be a film lover from what ive seen in lecture. usernames and passwords will be a director and a good movie from them. lets hope he appreciates the reccomendations
let AkiraKurosawa,
  JohnWoo1,
  JohnnieTo,
  ChristopherNolan,
  MichaelMann,
  PedroAlmodovar,
  JackieChan,
  SammoHung,
  DarioArgento,
  IshiroHonda;

console.log("done seeding peppers");
await closeConnection();
