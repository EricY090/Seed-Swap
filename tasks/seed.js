import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { peppersData, usersData, usersPeppersData } from "../data/index.js";
import { ObjectId } from "mongodb";

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
  scotchBonnetRed = await peppersData.createPepperDev(
    "scotch bonnet red",
    [],
    "chinense",
    4,
    "Red",
    [2.5, 4],
    80,
    "JM"
  );
  scotchBonnetYellow = await peppersData.createPepperDev(
    "scotch bonnet yellow",
    [],
    "chinense",
    4,
    "Yellow",
    [4, 6],
    90,
    "JM"
  );
  scotchBonnetChocolate = await peppersData.createPepperDev(
    "scotch bonnet chocolate",
    ["scotch bonnet brown"],
    "chinense",
    5,
    "Brown",
    [3.5, 5.5],
    90,
    "JM"
  );
  ghostPepper = await peppersData.createPepperDev(
    "ghost pepper",
    ["bhut jolokia"],
    "chinense",
    6,
    "Red",
    [5, 7.5],
    120,
    "IN"
  );
  carolinaReaper = await peppersData.createPepperDev(
    "carolina reaper",
    [],
    "chinense",
    6,
    "Red",
    [4, 5.5],
    120,
    "US"
  );
  bolivianRainbow = await peppersData.createPepperDev(
    "bolivian rainbow",
    [],
    "annuum",
    3,
    "purple",
    [1, 2],
    70,
    "BO"
  );
  cayenneLongSlim = await peppersData.createPepperDev(
    "cayenne long slim",
    [],
    "annuum",
    3,
    "red",
    [10, 15],
    70,
    "GF"
  );
  chiltepin = await peppersData.createPepperDev(
    "chiltepin",
    ["tepin"],
    "annuum",
    3,
    "red",
    [0.5, 1],
    80,
    "US"
  );
  sugarRushPeach = await peppersData.createPepperDev(
    "sugar rush peach",
    ["sugar rush"],
    "baccatum",
    3,
    "orange",
    [7.5, 10],
    120,
    "GB"
  );
  peterPepper = await peppersData.createPepperDev(
    "peter pepper",
    ["peter"],
    "annuum",
    3,
    "red",
    [7.5, 10],
    70,
    "US"
  );
  rocotoYellow = await peppersData.createPepperDev(
    "rocoto yellow",
    ["canario", "rocoto canario"],
    "pubescens",
    4,
    "yellow",
    [3.5, 5],
    120,
    "PE"
  );
  tobasco = await peppersData.createPepperDev(
    "tobasco",
    [],
    "frutescens",
    4,
    "green",
    [2.5, 4],
    90,
    "US"
  );
  thorsThunderbolt = await peppersData.createPepperDev(
    "thors thunderbolt",
    [],
    "chinense",
    5,
    "purple",
    [7.5, 10],
    70,
    "US"
  );
  bishopCrown = await peppersData.createPepperDev(
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
  console.log("done seeding peppers");
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
  MartinScorcese,
  IshiroHonda;

const seedUsers = async () => {
    AkiraKurosawa = await usersData.createUser(true, "AkiraKurosawa", false, undefined, undefined, "JP", "AKkurosawa", "5659021954", "AkiraKurosawa@Toho.com", "SevenSamurai1954");
    // console.log(AkiraKurosawa);
    
    JohnWoo1 = await usersData.createUser(true, "JohnWoo1", true, "Hollywood", "CA", "US", undefined, "7324201990", "JohnWoo@GoldenPrincess.com", "BitH1990");
    // console.log(JohnWoo1);

    JohnnieTo = await usersData.createUser(false, "JohnnieTo", true, undefined, undefined, "HK", "JohnnieTo", undefined, "JohnnieTo@MilkyWay.com", "ThrowDown2004");
    // console.log(JohnnieTo);

    ChristopherNolan = await usersData.createUser(false, "ChristopherNolan", false, "Los Angeles", "CA", "US", undefined, undefined, "ChristopherNolan@Warner.com", "BatmanBegins2005");
    
    MichaelMann = await usersData.createUser(false, "MichaelMann", false, "Los Angeles", "CA", "US", undefined, "7589093324", "MichaelMann@Warner.com", "Heat1995");
    
    PedroAlmodovar = await usersData.createUser(false, "PedroAlmodovar", false, undefined, undefined, "ES", "PedroCool", undefined, undefined, "WotVoaNB1999");
    
    JackieChan = await usersData.createUser(false, "JackieChan", true, undefined, undefined, "HK", "JackieChan", "8947129033", "JackieChan@GoldenHarvest.com", "PoliceStory1985");
    
    SammoHung = await usersData.createUser(false, "SammoHung", false, undefined, undefined, "HK", "SammoHung", undefined, "Sammo@GoldenHarvest.com", "DragonsForever1988");
    
    MartinScorcese = await usersData.createUser(true, "MartinScorcese", false, "New York", "NY", "US", "BigMarty", "6095549069", undefined, "ColorOfMoney1986");
    
    IshiroHonda = await usersData.createUser(false, "IshiroHonda", true, undefined, undefined, "JP", "IshiroHonda", undefined, "IshiroHonda@toho.com", "Gojira1954");
};

try{
    await seedUsers();
    console.log("done seeding users");
} catch (error){
    console.error(error);
}

// const errUsers = async () => {
//     //username in use
//     try{
//         let usernameInUse = await usersData.createUser(false, "AkiraKurosawa", false, undefined, undefined, "JP", "AKkurosawa", "5659021954",undefined, "SevenSamurai1954");
//     } catch (error){
//         console.error(error);
//         console.log("successfully caught username in use error\n");
//     }
//     try {
//         let emailInUse = await usersData.createUser(false, "KiyoshiKurosawa", false, undefined, undefined, "JP", undefined, undefined, "AkiraKurosawa@Toho.com", "Cure1997");
//     } catch (error) {
//         console.error(error);
//         console.log("successfully caught email in use error\n");
//     }
//     try{
//         let emailDiffCase = await usersData.createUser(true, "QuentinTarantino", false, "Los Angeles", "CA", "US", "QTPie1990", undefined, "sammo@GOLDENHARVEST.com", "ReservoirDogs1992");
//     } catch (error){
//         console.error(error);
//         console.log("successfully caught email in diff case error\n");
//     }
// }

// try {
//     await errUsers();
// } catch (error) {
//     console.log("should not be in this block")
// }


const addPeppersToUsers = async () => {
  await usersPeppersData.addPepperToUserInv(AkiraKurosawa, "scotch bonnet red");
  await usersPeppersData.addPepperToUserInv(AkiraKurosawa, "Peter Pepper");
  await usersPeppersData.addPepperToUserInv(AkiraKurosawa, "rocoto yellow");
  await usersPeppersData.addPepperToUserWL(AkiraKurosawa, "Carolina Reaper");
  await usersPeppersData.addPepperToUserWL(AkiraKurosawa, "chiltepin");


  await usersPeppersData.addPepperToUserInv(JohnWoo1, "sugar rush peach");
  await usersPeppersData.addPepperToUserInv(JohnWoo1, "Chiltepin");
  await usersPeppersData.addPepperToUserInv(JohnWoo1, "rocoto yellow");
  await usersPeppersData.addPepperToUserWL(JohnWoo1, "ghost pepper");
  await usersPeppersData.addPepperToUserWL(JohnWoo1, "peter pepper");
  await usersPeppersData.addPepperToUserWL(JohnWoo1, "thors thunderbolt");

  await usersPeppersData.addPepperToUserInv(JohnnieTo, "scotch bonnet red");
  await usersPeppersData.addPepperToUserInv(JohnnieTo, "bolivian rainbow");
  await usersPeppersData.addPepperToUserInv(JohnnieTo, "tobasco");
  await usersPeppersData.addPepperToUserWL(JohnnieTo, "bishop crown");
  await usersPeppersData.addPepperToUserWL(JohnnieTo, "cayenne long slim");

  await usersPeppersData.addPepperToUserInv(ChristopherNolan, "scotch bonnet red");
  await usersPeppersData.addPepperToUserInv(ChristopherNolan, "carolina reaper");
  await usersPeppersData.addPepperToUserWL(ChristopherNolan, "tobasco");

  await usersPeppersData.addPepperToUserInv(MichaelMann, "rocoto yellow");
  await usersPeppersData.addPepperToUserInv(MichaelMann, "scotch bonnet yellow");
  await usersPeppersData.addPepperToUserInv(MichaelMann, "sugar rush peach");
  await usersPeppersData.addPepperToUserWL(MichaelMann, "chiltepin");
  await usersPeppersData.addPepperToUserWL(MichaelMann, "peter pepper");
  await usersPeppersData.addPepperToUserWL(MichaelMann, "thors thunderbolt");

  await usersPeppersData.addPepperToUserInv(PedroAlmodovar, "bolivian rainbow");
  await usersPeppersData.addPepperToUserWL(PedroAlmodovar, "sugar rush peach");

  await usersPeppersData.addPepperToUserInv(JackieChan, "chiltepin");
  await usersPeppersData.addPepperToUserInv(JackieChan, "scotch bonnet chocolate");
  await usersPeppersData.addPepperToUserInv(JackieChan, "rocoto yellow");
  await usersPeppersData.addPepperToUserInv(JackieChan, "thors thunderbolt");
  await usersPeppersData.addPepperToUserWL(JackieChan, "carolina reaper");
  await usersPeppersData.addPepperToUserWL(JackieChan, "ghost pepper");
  await usersPeppersData.addPepperToUserWL(JackieChan, "peter pepper");
  await usersPeppersData.addPepperToUserWL(JackieChan, "sugar rush peach");
  await usersPeppersData.addPepperToUserWL(JackieChan, "scotch bonnet red");

  await usersPeppersData.addPepperToUserInv(SammoHung, "ghost pepper");
  await usersPeppersData.addPepperToUserInv(SammoHung, "tobasco");
  await usersPeppersData.addPepperToUserInv(SammoHung, "bishop crown");
  await usersPeppersData.addPepperToUserWL(SammoHung, "bolivian rainbow");
  await usersPeppersData.addPepperToUserWL(SammoHung, "chiltepin");

  await usersPeppersData.addPepperToUserInv(MartinScorcese, "thors thunderbolt");
  await usersPeppersData.addPepperToUserWL(MartinScorcese, "rocoto yellow");
  await usersPeppersData.addPepperToUserWL(MartinScorcese, "carolina reaper");

  await usersPeppersData.addPepperToUserInv(IshiroHonda, "cayenne long slim");
  await usersPeppersData.addPepperToUserInv(IshiroHonda, "scotch bonnet yellow");
  await usersPeppersData.addPepperToUserWL(IshiroHonda, "sugar rush peach");
}

try {
  await addPeppersToUsers();
  console.log("done adding peppers to users");
} catch (error) {
  console.error(error);
}


await closeConnection();
