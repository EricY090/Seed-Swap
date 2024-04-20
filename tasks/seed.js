import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import {
  peppersData,
  usersData,
  usersPeppersData,
  commentsData,
} from "../data/index.js";
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
  bishopCrown,
  zebrange,
  lemonStarrburst,
  pinkTiger,
  lemonDrop,
  banana,
  cherryBomb,
  serrano,
  brazilianStarfish,
  bahamianGoat,
  habanada,
  trinidadScorpion,
  trinidadScorpionChocolate,
  marconiGolden,
  bigBertha,
  snowWhite,
  cheiroRoxa,
  pimentaDeNeyde;
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
    2,
    "yellow",
    [3.5, 5],
    100,
    "PE"
  );
  tobasco = await peppersData.createPepperDev(
    "tobasco",
    [],
    "frutescens",
    2,
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
    ["crown", "christmas bell"],
    "baccatum",
    3,
    "red",
    [2.5, 3.5],
    90,
    "BB"
  );
  zebrange = await peppersData.createPepperDev(
    "zebrange",
    [],
    "annuum",
    2,
    "orange",
    [3.5, 5],
    120,
    "BE"
  );
  lemonStarrburst = await peppersData.createPepperDev(
    //this one is actually my favorite
    "lemon starrburst",
    ["ks lsb", "lsb", "lemon starburst"],
    "chinense",
    4,
    "yellow",
    [3, 4.5],
    90,
    "US"
  );
  pinkTiger = await peppersData.createPepper(
    "pink tiger",
    [],
    "chinense",
    4,
    "pink",
    [5, 7],
    90,
    "IT"
  );
  lemonDrop = await peppersData.createPepperDev(
    "lemon drop",
    ["aji limon"],
    "baccatum",
    3,
    "yellow",
    [4, 6],
    80,
    "PE"
  );
  banana = await peppersData.createPepperDev(
    "banana pepper",
    ["yellow wax"],
    "annuum",
    1,
    "yellow",
    [10, 20],
    80,
    "HU"
  );
  cherryBomb = await peppersData.createPepperDev(
    "cherry bomb",
    [],
    "annuum",
    1,
    "red",
    [3, 5],
    70,
    "MX"
  );
  serrano = await peppersData.createPepperDev(
    "serrano",
    [],
    "annuum",
    3,
    "green",
    [5, 7.5],
    70,
    "MX"
  );
  brazilianStarfish = await peppersData.createPepperDev(
    "brazilian starfish",
    [],
    "baccatum",
    2,
    "orange",
    [2.5, 4.5],
    80,
    "BR"
  );
  bahamianGoat = await peppersData.createPepper(
    "bahamian goat",
    ["goat pepper"],
    "chinense",
    4,
    "orange",
    [3.5, 5],
    90,
    "BS"
  );
  habanada = await peppersData.createPepperDev(
    "habanada",
    [],
    "chinense",
    0,
    "orange",
    [6, 8],
    70,
    "US"
  );
  trinidadScorpion = await peppersData.createPepperDev(
    "trinidad scorpion",
    ["scorpion pepper"],
    "chinense",
    6,
    "red",
    [4, 6.5],
    120,
    "TT"
  );
  trinidadScorpionChocolate = await peppersData.createPepper(
    "trinidad scorpion chocolate",
    ["chocolate scorpion"],
    "chinense",
    6,
    "brown",
    [4, 6.5],
    120,
    "TT"
  );
  marconiGolden = await peppersData.createPepperDev(
    "marconi golden",
    [],
    "annuum",
    0,
    "golden",
    [12, 20],
    70,
    "IT"
  );
  bigBertha = await peppersData.createPepperDev(
    "big bertha",
    [],
    "annuum",
    0,
    "red",
    [1, 15],
    70,
    "MX"
  );
  snowWhite = await peppersData.createPepperDev(
    "snow white",
    [],
    "chinense",
    3,
    "white",
    [2.5, 4],
    80,
    "US"
  );
  cheiroRoxa = await peppersData.createPepper(
    "cheiro roxa",
    [],
    "chinense",
    3,
    "purple",
    [1.5, 3],
    80,
    "BR"
  );
  pimentaDeNeyde = await peppersData.createPepperDev(
    "pimenta de neyde",
    [],
    "chinense",
    4,
    "black",
    [5, 7.5],
    80,
    "BR"
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
  IshiroHonda,
  DavidCronenberg,
  SpikeLee,
  AndrewLau;

const seedUsers = async () => {
  AkiraKurosawa = await usersData.createUser(
    true,
    "AkiraKurosawa",
    false,
    undefined,
    undefined,
    "JP",
    "AKkurosawa",
    "5659021954",
    "AkiraKurosawa@Toho.com",
    "SevenSamurai1954"
  );
  // console.log(AkiraKurosawa);

  JohnWoo1 = await usersData.createUser(
    true,
    "JohnWoo1",
    true,
    "Hollywood",
    "CA",
    "US",
    undefined,
    "7324201990",
    "JohnWoo@GoldenPrincess.com",
    "BitH1990"
  );
  // console.log(JohnWoo1);

  JohnnieTo = await usersData.createUser(
    false,
    "JohnnieTo",
    true,
    undefined,
    undefined,
    "HK",
    "JohnnieTo",
    undefined,
    "JohnnieTo@MilkyWay.com",
    "ThrowDown2004"
  );
  // console.log(JohnnieTo);

  ChristopherNolan = await usersData.createUser(
    false,
    "ChristopherNolan",
    false,
    "Los Angeles",
    "CA",
    "US",
    undefined,
    undefined,
    "ChristopherNolan@Warner.com",
    "BatmanBegins2005"
  );

  MichaelMann = await usersData.createUser(
    false,
    "MichaelMann",
    false,
    "Los Angeles",
    "CA",
    "US",
    undefined,
    "7589093324",
    "MichaelMann@Warner.com",
    "Heat1995"
  );

  PedroAlmodovar = await usersData.createUser(
    false,
    "PedroAlmodovar",
    false,
    undefined,
    undefined,
    "ES",
    "PedroCool",
    undefined,
    undefined,
    "WotVoaNB1999"
  );

  JackieChan = await usersData.createUser(
    false,
    "JackieChan",
    true,
    undefined,
    undefined,
    "HK",
    "JackieChan",
    "8947129033",
    "JackieChan@GoldenHarvest.com",
    "PoliceStory1985"
  );

  SammoHung = await usersData.createUser(
    false,
    "SammoHung",
    false,
    undefined,
    undefined,
    "HK",
    "SammoHung",
    undefined,
    "Sammo@GoldenHarvest.com",
    "DragonsForever1988"
  );

  MartinScorcese = await usersData.createUser(
    true,
    "MartinScorcese",
    false,
    "New York",
    "NY",
    "US",
    "BigMarty",
    "6095549069",
    undefined,
    "ColorOfMoney1986"
  );

  IshiroHonda = await usersData.createUser(
    false,
    "IshiroHonda",
    true,
    undefined,
    undefined,
    "JP",
    "IshiroHonda",
    undefined,
    "IshiroHonda@toho.com",
    "Gojira1954"
  );

  DavidCronenberg = await usersData.createUser(
    false,
    "DavidCronenberg",
    false,
    undefined,
    undefined,
    "CA",
    "DavidCroney",
    undefined,
    undefined,
    "Videodrome1983"
  );

  SpikeLee = await usersData.createUser(
    false,
    "SpikeLee",
    false,
    "Brooklyn",
    "NY",
    "US",
    "SpikerMan",
    undefined,
    undefined,
    "MalcolmX1992"
  );

  AndrewLau = await usersData.createUser(
    false,
    "AndrewLau",
    false,
    undefined,
    undefined,
    "HK",
    undefined,
    undefined,
    "AndrewLau@MediaAsia.com",
    "InfernalAffairs2002"
  );
};

try {
  await seedUsers();
  console.log("done seeding users");
} catch (error) {
  console.error(error);
}

const addPeppersToUsers = async () => {
  await usersPeppersData.addPepperToUserInv(AkiraKurosawa, "scotch bonnet red");
  await usersPeppersData.addPepperToUserInv(AkiraKurosawa, "Peter Pepper");
  await usersPeppersData.addPepperToUserInv(AkiraKurosawa, "rocoto yellow");
  await usersPeppersData.addPepperToUserInv(AkiraKurosawa, "trinidad scorpion");
  await usersPeppersData.addPepperToUserInv(AkiraKurosawa, "snow white");
  await usersPeppersData.addPepperToUserWL(AkiraKurosawa, "Carolina Reaper");
  await usersPeppersData.addPepperToUserWL(AkiraKurosawa, "chiltepin");
  await usersPeppersData.addPepperToUserWL(AkiraKurosawa, "lemon starrburst");
  await usersPeppersData.addPepperToUserWL(AkiraKurosawa, "habanada");

  await usersPeppersData.addPepperToUserInv(JohnWoo1, "sugar rush peach");
  await usersPeppersData.addPepperToUserInv(JohnWoo1, "Chiltepin");
  await usersPeppersData.addPepperToUserInv(JohnWoo1, "rocoto yellow");
  await usersPeppersData.addPepperToUserWL(JohnWoo1, "ghost pepper");
  await usersPeppersData.addPepperToUserWL(JohnWoo1, "peter pepper");
  await usersPeppersData.addPepperToUserWL(JohnWoo1, "thors thunderbolt");

  await usersPeppersData.addPepperToUserInv(JohnnieTo, "scotch bonnet red");
  await usersPeppersData.addPepperToUserInv(JohnnieTo, "bolivian rainbow");
  await usersPeppersData.addPepperToUserInv(JohnnieTo, "tobasco");
  await usersPeppersData.addPepperToUserInv(JohnnieTo, "brazilian starfish");
  await usersPeppersData.addPepperToUserWL(JohnnieTo, "bishop crown");
  await usersPeppersData.addPepperToUserWL(JohnnieTo, "cayenne long slim");

  await usersPeppersData.addPepperToUserInv(
    ChristopherNolan,
    "scotch bonnet red"
  );
  await usersPeppersData.addPepperToUserInv(
    ChristopherNolan,
    "carolina reaper"
  );
  await usersPeppersData.addPepperToUserInv(
    ChristopherNolan,
    "lemon starrburst"
  );
  await usersPeppersData.addPepperToUserWL(ChristopherNolan, "tobasco");

  await usersPeppersData.addPepperToUserInv(MichaelMann, "rocoto yellow");
  await usersPeppersData.addPepperToUserInv(
    MichaelMann,
    "scotch bonnet yellow"
  );
  await usersPeppersData.addPepperToUserInv(MichaelMann, "lemon starrburst");
  await usersPeppersData.addPepperToUserInv(MichaelMann, "sugar rush peach");
  await usersPeppersData.addPepperToUserWL(MichaelMann, "chiltepin");
  await usersPeppersData.addPepperToUserWL(MichaelMann, "pimenta de neyde");
  await usersPeppersData.addPepperToUserWL(MichaelMann, "peter pepper");
  await usersPeppersData.addPepperToUserWL(MichaelMann, "thors thunderbolt");
  await usersPeppersData.addPepperToUserWL(MichaelMann, "lemon drop");

  await usersPeppersData.addPepperToUserInv(PedroAlmodovar, "bolivian rainbow");
  await usersPeppersData.addPepperToUserWL(PedroAlmodovar, "sugar rush peach");

  await usersPeppersData.addPepperToUserInv(JackieChan, "chiltepin");
  await usersPeppersData.addPepperToUserInv(
    JackieChan,
    "scotch bonnet chocolate"
  );
  await usersPeppersData.addPepperToUserInv(JackieChan, "marconi golden");
  await usersPeppersData.addPepperToUserInv(JackieChan, "rocoto yellow");
  await usersPeppersData.addPepperToUserInv(JackieChan, "thors thunderbolt");
  await usersPeppersData.addPepperToUserInv(JackieChan, "zebrange");
  await usersPeppersData.addPepperToUserInv(JackieChan, "lemon starrburst");
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

  await usersPeppersData.addPepperToUserInv(
    MartinScorcese,
    "thors thunderbolt"
  );
  await usersPeppersData.addPepperToUserWL(MartinScorcese, "rocoto yellow");
  await usersPeppersData.addPepperToUserWL(MartinScorcese, "carolina reaper");

  await usersPeppersData.addPepperToUserInv(IshiroHonda, "cayenne long slim");
  await usersPeppersData.addPepperToUserInv(
    IshiroHonda,
    "scotch bonnet yellow"
  );
  await usersPeppersData.addPepperToUserWL(IshiroHonda, "sugar rush peach");
  await usersPeppersData.addPepperToUserWL(IshiroHonda, "pimenta de neyde");
  await usersPeppersData.addPepperToUserWL(IshiroHonda, "brazilian starfish");

  await usersPeppersData.addPepperToUserInv(DavidCronenberg, "zebrange");
  await usersPeppersData.addPepperToUserInv(
    DavidCronenberg,
    "thors thunderbolt"
  );
  await usersPeppersData.addPepperToUserInv(
    DavidCronenberg,
    "cayenne long slim"
  );
  await usersPeppersData.addPepperToUserWL(DavidCronenberg, "carolina reaper");
  await usersPeppersData.addPepperToUserWL(DavidCronenberg, "pimenta de neyde");
  await usersPeppersData.addPepperToUserWL(
    DavidCronenberg,
    "trinidad scorpion"
  );

  await usersPeppersData.addPepperToUserInv(SpikeLee, "habanada");
  await usersPeppersData.addPepperToUserInv(SpikeLee, "lemon drop");
  await usersPeppersData.addPepperToUserInv(SpikeLee, "cherry bomb");
  await usersPeppersData.addPepperToUserWL(SpikeLee, "banana pepper");
  await usersPeppersData.addPepperToUserWL(SpikeLee, "serrano");
  await usersPeppersData.addPepperToUserWL(SpikeLee, "peter pepper");

  await usersPeppersData.addPepperToUserInv(AndrewLau, "big bertha");
  await usersPeppersData.addPepperToUserInv(AndrewLau, "pimenta de neyde");
  await usersPeppersData.addPepperToUserInv(
    AndrewLau,
    "scotch bonnet chocolate"
  );
  await usersPeppersData.addPepperToUserWL(AndrewLau, "sugar rush peach");
  await usersPeppersData.addPepperToUserWL(AndrewLau, "scotch bonnet red");
  await usersPeppersData.addPepperToUserWL(AndrewLau, "marconi golden");
};

try {
  await addPeppersToUsers();
  console.log("done adding peppers to users");
} catch (error) {
  console.error(error);
}

const addCommentsToUsers = async () => {
  try {
    await commentsData.addComment(
      AkiraKurosawa,
      JohnWoo1,
      "I love your movies, especially Bullet in the Head. that being said, please update your contact information"
    );
    await commentsData.addComment(
      AkiraKurosawa,
      PedroAlmodovar,
      "The Skin I Live In was one of the most messed up vile movies I have ever seen. almost as messed up and vile as the Chocolate Bhutlah"
    );
    await commentsData.addComment(
      JohnWoo1,
      JohnnieTo,
      "Throw Down was a great movie. the experience of eating one of your scotch bonnets made me wanna Throw Up"
    );
    await commentsData.addComment(
      JohnWoo1,
      ChristopherNolan,
      "trying the carolina reaper was like sitting in front of an nuclear explosion. your reapers would make Oppy proud"
    );
    await commentsData.addComment(
      PedroAlmodovar,
      MartinScorcese,
      "loved the color of money. the color of your thors thunderbolts is even better"
    );
    await commentsData.addComment(
      JohnnieTo,
      IshiroHonda,
      "Godzilla was a great movie. your scotch bonnets are as monstrous as him"
    );
    await commentsData.addComment(
      DavidCronenberg,
      AkiraKurosawa,
      "i've been looking high and low for peter pepper seeds. looks like you've got what i want"
    );
    await commentsData.addComment(
      AkiraKurosawa,
      AndrewLau,
      "I love the infernal affairs trilogy. your scotch bonnets gave me a trilogy of infernal ulcers"
    );
    await commentsData.addComment(
      ChristopherNolan,
      MichaelMann,
      "Heat is one of my favorites. actually an inspiration for The Dark Knight. the heat of your scotch bonnets is even better"
    );
    await commentsData.addComment(
      SpikeLee,
      JackieChan,
      "your peppers pack punches just like you"
    );
    await commentsData.addComment(
      JohnnieTo,
      AkiraKurosawa,
      "Sanshiro Sugata was an influence on Throw Down. your trinidad scorpions would make me throw down a glass of milk"
    );
    await commentsData.addComment(
      ChristopherNolan,
      SammoHung,
      "big fan of dragons forever. your ghost peppers would probably make me breathe fire like a dragon"
    );
    await commentsData.addComment(
      PedroAlmodovar,
      DavidCronenberg,
      "your thunderbolts would probably invoke body horror in the bathroom"
    );
    await commentsData.addComment(
      IshiroHonda,
      SpikeLee,
      "do the right thing and update your contact information"
    );
    await commentsData.addComment(
      AndrewLau,
      AkiraKurosawa,
      "your peppers are as legendary as your movies. Ran? more like Ran out the house and into a lake after trying the reaper"
    );
  } catch (error) {
    console.error(error);
  }
};

await addCommentsToUsers();
console.log("done adding comments to users");

await closeConnection();
