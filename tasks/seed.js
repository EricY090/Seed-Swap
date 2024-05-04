import { all } from "axios";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import {
  peppersData,
  usersData,
  usersPeppersData,
  commentsData,
  tradesData,
  reviewsData,
  growData
} from "../data/index.js";
import { ObjectId } from "mongodb";
import fs from 'fs';
import path from 'path';

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
  AndrewLau,
  JamesCameron,
  DenisVilleneuve,
  MasakiKobayashi,
  AlanJPaluka,
  BongJoonHo,
  ericyang,
  yangeric;

const seedUsers = async () => {
  AkiraKurosawa = await usersData.createUser(
    true,
    "AkiraKurosawa",
    false,
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
    "HK",
    undefined,
    undefined,
    "AndrewLau@MediaAsia.com",
    "InfernalAffairs2002"
  );
  JamesCameron = await usersData.createUser(
    false,
    "JimmyCamera",
    true,
    "CA",
    "JamesCam",
    "8093456781",
    "JimmyC@TwentiethC.com",
    "WayOfWater2021"
  );
  DenisVilleneuve = await usersData.createUser(
    true,
    "DenisVilleneuve",
    true,
    "CA",
    "DenisVilleneuve",
    "9340128857",
    undefined,
    "Sicario2015"
  );
  MasakiKobayashi = await usersData.createUser(
    false,
    "MasakiKobayashi",
    false,
    "JP",
    undefined,
    "9094568273",
    "MasakiKobayashi@Shochiku.com",
    "Harakiri1962"
  );
  AlanJPaluka = await usersData.createUser(
    false,
    "AlanJPaluka",
    true,
    "US",
    "AlanJPaluka",
    undefined,
    "AlanJPak@Wildwood.com",
    "AllThePresidents1976"
  );
  BongJoonHo = await usersData.createUser(
    false,
    "BongJoonHo",
    false,
    "KR",
    "BongHive",
    undefined,
    undefined,
    "MemoriesOfMurder2003"
  );
  ericyang = await usersData.createUser(
    false,
    "ericyang",
    false,
    "US",
    undefined,
    undefined,
    'eyang6@stevens.edu',
    "Qwertyui1"
  );
  yangeric = await usersData.createUser(
    false,
    "yangeric",
    false,
    "US",
    'yangyangDC',
    undefined,
    undefined,
    "Qwertyui2"
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
  await usersPeppersData.addPepperToUserWL(JohnWoo1, "lemon starrburst");
  await usersPeppersData.addPepperToUserWL(JohnWoo1, "lemon drop");
  await usersPeppersData.addPepperToUserWL(JohnWoo1, "scotch bonnet yellow");

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

  await usersPeppersData.addPepperToUserInv(JamesCameron, "ghost pepper");
  await usersPeppersData.addPepperToUserInv(JamesCameron, "habanada");
  await usersPeppersData.addPepperToUserInv(JamesCameron, "lemon drop");
  await usersPeppersData.addPepperToUserWL(JamesCameron, "peter pepper");
  await usersPeppersData.addPepperToUserWL(JamesCameron, "lemon starrburst");

  await usersPeppersData.addPepperToUserInv(
    DenisVilleneuve,
    "lemon starrburst"
  );
  await usersPeppersData.addPepperToUserInv(
    DenisVilleneuve,
    "cayenne long slim"
  );
  await usersPeppersData.addPepperToUserWL(DenisVilleneuve, "zebrange");
  await usersPeppersData.addPepperToUserWL(DenisVilleneuve, "bishop crown");

  await usersPeppersData.addPepperToUserInv(
    MasakiKobayashi,
    "brazilian starfish"
  );
  await usersPeppersData.addPepperToUserInv(MasakiKobayashi, "big bertha");
  await usersPeppersData.addPepperToUserWL(MasakiKobayashi, "chiltepin");

  await usersPeppersData.addPepperToUserInv(AlanJPaluka, "sugar rush peach");
  await usersPeppersData.addPepperToUserInv(AlanJPaluka, "scotch bonnet red");
  await usersPeppersData.addPepperToUserWL(AlanJPaluka, "lemon starrburst");

  await usersPeppersData.addPepperToUserInv(BongJoonHo, "ghost pepper");
  await usersPeppersData.addPepperToUserInv(BongJoonHo, "cherry bomb");
  await usersPeppersData.addPepperToUserWL(BongJoonHo, "cayenne long slim");
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


try {
  await addCommentsToUsers();
} catch (error) {
  console.error(error);
}

console.log("done adding comments to users");


let KurosawaToChan, KurosawaToCameron, KurosawaToWoo, KurosawaToHonda;
let WooToScorcese, WooToBong, WooToKurosawa, WooToChan;
let ToToMann, ToToLee, ToToKobayashi
let NolanToAlmodovar, NolanToLau, NolanToHonda, NolanToWoo;
let MannToHung, MannToCronenberg, MannToPakula;
let AlmodovarToKurosawa, AlmodovarToTo, AlmodovarToVilleneuve;
let ChanToScorcese, ChanToCameron, ChanToHo, ChanToLee
let HungToWoo, HungToAlmodovar, HungToCronenberg;
let ScorceseToTo, ScorceseToMann, ScorceseToHung;
let HondaToWoo, HondaToNolan, HondaToVilleneuve;
let CronenbergToNolan, CronenbergToLau, CronenbergToKobayashi;
let LeeToKurosawa, LeeToHonda, LeeToPakula;
//this will put the whole object in the variable, not just id

// throw if initiate trade has an empty array
const addTrades = async () => {
  KurosawaToChan = await tradesData.initiateTrade(AkiraKurosawa, ["scotch bonnet red", "Peter pepper"], JackieChan, ["scotch bonnet chocolate", "rocoto yellow", "zebrange"]);
  KurosawaToCameron = await tradesData.initiateTrade(AkiraKurosawa, ["trinidad scorpion"], JamesCameron, ["habanada"]);
  KurosawaToWoo = await tradesData.initiateTrade(AkiraKurosawa, ["snow white"], JohnWoo1, ["chiltepin"]);
  KurosawaToHonda = await tradesData.initiateTrade(AkiraKurosawa, ["rocoto yellow", "snow white"], IshiroHonda, ["scotch bonnet yellow"]);
  WooToScorcese = await tradesData.initiateTrade(JohnWoo1, ["sugar rush peach"], MartinScorcese, ["thors thunderbolt"]);
  WooToBong = await tradesData.initiateTrade(JohnWoo1, ["rocoto yellow"], BongJoonHo, ["cherry bomb"]);
  WooToKurosawa = await tradesData.initiateTrade(JohnWoo1, ["rocoto yellow" ], AkiraKurosawa, ["snow white"]);
  WooToChan = await tradesData.initiateTrade(JohnWoo1, ["chiltepin", "sugar rush peach"], JackieChan, ["scotch bonnet chocolate", "zebrange", "marconi golden"]);
  ToToMann = await tradesData.initiateTrade(JohnnieTo, ["bolivian rainbow", "tobasco"], MichaelMann, ["lemon starrburst"]);
  ToToLee = await tradesData.initiateTrade(JohnnieTo, ["scotch bonnet red", "brazilian starfish"], SpikeLee, ["habanada", "lemon drop"]);
  ToToKobayashi = await tradesData.initiateTrade(JohnnieTo, ["tobasco"], MasakiKobayashi, ["brazilian starfish", "big bertha"]);
  NolanToAlmodovar = await tradesData.initiateTrade(ChristopherNolan, ["lemon starrburst", "carolina reaper"], PedroAlmodovar, ["bolivian rainbow"]);
  NolanToLau = await tradesData.initiateTrade(ChristopherNolan, ["carolina reaper"], AndrewLau, ["pimenta de neyde", "scotch bonnet chocolate"]);
  NolanToWoo = await tradesData.initiateTrade(ChristopherNolan, ["lemon starrburst"], JohnWoo1, ["chiltepin"]);
  NolanToHonda = await tradesData.initiateTrade(ChristopherNolan, ["carolina reaper"], IshiroHonda, ["cayenne long slim", "scotch bonnet yellow"]);
  MannToHung = await tradesData.initiateTrade(MichaelMann, ["scotch bonnet yellow", "sugar rush peach"], SammoHung, ["ghost pepper"]);
  MannToCronenberg = await tradesData.initiateTrade(MichaelMann, ["lemon starrburst"], DavidCronenberg, ["zebrange","cayenne long slim"]);
  MannToPakula = await tradesData.initiateTrade(MichaelMann, ["rocoto yellow"], AlanJPaluka, ["scotch bonnet red"]);
  AlmodovarToKurosawa = await tradesData.initiateTrade(PedroAlmodovar, ["bolivian rainbow"], AkiraKurosawa, ["scotch bonnet red", "trinidad scorpion"]);
  AlmodovarToTo = await tradesData.initiateTrade(PedroAlmodovar, ["bolivian rainbow"], JohnnieTo, ["tobasco", "brazilian starfish"]);
  AlmodovarToVilleneuve = await tradesData.initiateTrade(PedroAlmodovar, ["bolivian rainbow"], DenisVilleneuve, ["lemon starrburst"]);
  ChanToScorcese = await tradesData.initiateTrade(JackieChan, ["scotch bonnet chocolate", "rocoto yellow", "zebrange"], MartinScorcese, ["thors thunderbolt"]);
  ChanToCameron = await tradesData.initiateTrade(JackieChan, ["chiltepin", "marconi golden"], JamesCameron, ["habanada", "lemon drop"]);
  ChanToHo = await tradesData.initiateTrade(JackieChan, ["thors thunderbolt", "lemon starrburst"], BongJoonHo, ["cherry bomb"]);
  ChanToLee = await tradesData.initiateTrade(JackieChan, ["marconi golden", "chiltepin", "scotch bonnet chocolate"], SpikeLee, ["habanada", "lemon drop"]);
  HungToWoo = await tradesData.initiateTrade(SammoHung, ["ghost pepper", "bishop crown"], JohnWoo1, ["sugar rush peach"]);
  HungToAlmodovar = await tradesData.initiateTrade(SammoHung, ["bishop crown", "tobasco"], PedroAlmodovar, ["bolivian rainbow"]);
  HungToCronenberg = await tradesData.initiateTrade(SammoHung, ["ghost pepper"], DavidCronenberg, ["zebrange", "cayenne long slim"]);
  ScorceseToTo = await tradesData.initiateTrade(MartinScorcese, ["thors thunderbolt"], JohnnieTo, ["brazilian starfish", "tobasco"]);
  ScorceseToMann = await tradesData.initiateTrade(MartinScorcese, ["thors thunderbolt"], MichaelMann, ["sugar rush peach", "rocoto yellow"]);
  ScorceseToHung = await tradesData.initiateTrade(MartinScorcese, ["thors thunderbolt"], SammoHung, ["bishop crown"]);
  HondaToWoo = await tradesData.initiateTrade(IshiroHonda, ["scotch bonnet yellow"], JohnWoo1, ["chiltepin", "sugar rush peach"]);
  HondaToNolan = await tradesData.initiateTrade(IshiroHonda, ["cayenne long slim"], ChristopherNolan, ["carolina reaper", "lemon starrburst"]);
  HondaToVilleneuve = await tradesData.initiateTrade(IshiroHonda, ["scotch bonnet yellow"], DenisVilleneuve, ["lemon starrburst"]);
  CronenbergToNolan = await tradesData.initiateTrade(DavidCronenberg, ["zebrange", "cayenne long slim"], ChristopherNolan, ["carolina reaper", "lemon starrburst"]);
  CronenbergToLau = await tradesData.initiateTrade(DavidCronenberg, ["thors thunderbolt"], AndrewLau, ["scotch bonnet chocolate", "pimenta de neyde"]);
  CronenbergToKobayashi = await tradesData.initiateTrade(DavidCronenberg, ["cayenne long slim"], MasakiKobayashi, ["big bertha"]);
  LeeToKurosawa = await tradesData.initiateTrade(SpikeLee, ["habanada", "lemon drop"], AkiraKurosawa, ["peter pepper", "trinidad scorpion"]);
  LeeToHonda = await tradesData.initiateTrade(SpikeLee, ["cherry bomb"], IshiroHonda, ["scotch bonnet yellow"]);
  LeeToPakula = await tradesData.initiateTrade(SpikeLee, ["cherry bomb", "habanada"], AlanJPaluka, ["sugar rush peach"]);
  
};

try {
  await addTrades();
} catch (error) {
  console.error(error);
}


const acceptTrades = async () => {
  await tradesData.receiverAccepts((WooToChan._id).toString());
  await tradesData.receiverAccepts((HungToWoo._id).toString());
  await tradesData.receiverAccepts((AlmodovarToKurosawa._id).toString());
  await tradesData.receiverAccepts((KurosawaToCameron._id).toString());
  await tradesData.receiverAccepts((ToToMann._id).toString());
  await tradesData.receiverAccepts((ScorceseToTo._id).toString());
  await tradesData.receiverAccepts((HondaToWoo._id).toString());
  await tradesData.receiverAccepts((CronenbergToLau._id).toString());
  await tradesData.receiverAccepts((ChanToScorcese._id).toString());
  await tradesData.receiverAccepts((WooToKurosawa._id).toString());
}

try {
  await acceptTrades();
  console.log("finished accepting trades")
} catch (error) {
  console.error(error);
}

const addReviews = async () => {
  // console.log("Has Jackie Chan left a review for John Woo?" + await reviewsData.userHasLeftReview("JackieChan", "JohnWoo1"));
  await reviewsData.createReview("JackieChan", "JohnWoo1", 3, 5, 4);
  // console.log("Has Jackie Chan left a review for John Woo?" + await reviewsData.userHasLeftReview("JackieChan", "JohnWoo1"));
  // await reviewsData.createReview("JohnWoo1", "JackieChan", 4, 4, 5);
  await reviewsData.createReview("SammoHung", "JohnWoo1", 5, 4, 4);
  await reviewsData.createReview("JohnWoo1", "SammoHung", 5, 5, 5);
  await reviewsData.createReview("AkiraKurosawa", "PedroAlmodovar", 2, 3, 3);
  await reviewsData.createReview("PedroAlmodovar", "AkiraKurosawa", 4, 5, 4);
  await reviewsData.createReview("AkiraKurosawa", "JimmyCamera", 3, 4, 4);
  await reviewsData.createReview("JimmyCamera", "AkiraKurosawa", 4, 5, 5);
  await reviewsData.createReview("JohnnieTo", "MichaelMann", 3, 3, 4);
  await reviewsData.createReview("MichaelMann", "JohnnieTo", 4, 4, 5);
  await reviewsData.createReview("MartinScorcese", "JohnnieTo", 4, 4, 4);
  await reviewsData.createReview("JohnnieTo", "MartinScorcese", 5, 5, 5);
  await reviewsData.createReview("IshiroHonda", "JohnWoo1", 4, 3, 4);
  await reviewsData.createReview("JohnWoo1", "IshiroHonda", 4, 4, 5);
  await reviewsData.createReview("DavidCronenberg", "AndrewLau", 3, 4, 4);
  await reviewsData.createReview("AndrewLau", "DavidCronenberg", 4, 3, 3);
  await reviewsData.createReview("JackieChan", "MartinScorcese", 4, 4, 4);
  await reviewsData.createReview("MartinScorcese", "JackieChan", 5, 5, 5);
  await reviewsData.createReview("JohnWoo1", "AkiraKurosawa", 4, 4, 4);

}

try {
  await addReviews();
  console.log("finished adding reviews")
} catch (error) {
  console.error(error);
}

// Add grows post to users
let img1 = './public/img/img1.jpg';
let img2 = './public/img/img2.jpg';
let img3 = './public/img/img3.jpg';
let img4 = './public/img/img4.jfif';
let img5 = './public/img/img5.jfif';
let img6 = './public/img/img6.jfif';
let img7 = './public/img/img7.jpg';
let img8 = './public/img/img8.jpg';

const convert = (dir) => {
  try {
      const image = fs.readFileSync(dir, 'base64');
      const extensionName = path.extname(dir);
      const base64ImageStr = `data:image/${extensionName.split('.').pop()};base64,${image}`;
      return base64ImageStr;
  } catch (error) {
      console.log(error.message);
      return null;
  }
}

try{
  img1 = convert(img1);
  img2 = convert(img2);
  img3 = convert(img3);
  img4 = convert(img4);
  img5 = convert(img5);
  img6 = convert(img6);
  img7 = convert(img7);
  img8 = convert(img8);
  await growData.createPost(ericyang, img1, "This is my goood pepper");
  await growData.createPost(ericyang, img2, "Looks good isn't it");
  await growData.createPost(BongJoonHo, img3, "Look at these cute pepper");
  await growData.createPost(BongJoonHo, img7, "There are my babies");
  await growData.createPost(BongJoonHo, img8, "Anyone who wants these peppers, pls contact me");
  await growData.createPost(AlanJPaluka, img6, "Hey!!! Look at how cute they are");
  await growData.createPost(yangeric, img4, "First harvest in this season...");
  await growData.createPost(yangeric, img5, "Yo! Check this out!");
  console.log("Done adding grows for users")
}catch(e){
  console.log(e);
}

await closeConnection();
