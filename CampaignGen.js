"use strict"



//add a method to remove multiple elements from an array
if (!Array.prototype.remove) {
    Array.prototype.remove = function(vals, all) {
        var i, removedItems = [];
        if (!Array.isArray(vals)) vals = [vals];
        for (var j = 0; j < vals.length; j++) {
            if (all) {
                for (i = this.length; i--;) {
                    if (this[i] === vals[j]) removedItems.push(this.splice(i, 1));
                }
            }
            else {
                i = this.indexOf(vals[j]);
                if (i > -1) removedItems.push(this.splice(i, 1));
            }
        }
        return removedItems;
    };
}

function randomObject(objects) {
    return objects[Math.floor(Math.random() * objects.length)];
}

function containsAllElements(arrayToCheck, keys) {
    var containsAll = true;

    for (var i = 0; i < keys.length; i++) {
        if (!arrayToCheck.includes(keys[i]))
            containsAll = false;
    }


    return containsAll;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




var AllQuestDefs = [];
var AllItemDefs = [];
var CastOfCharacters = [];
var names = ["Aelianus", "Aelius", "Aemilianus", "Aemilius", "Aetius", "Agrippa", "Ahenobarbus", "Albanus", "Albinus", "Albus", "Antoninus", "Antonius", "Appius", "Aquila", "Aquilinus", "Atilius", "Augustinus", "Augustus", "Aulus", "Aurelianus", "Aurelius", "Avilius", "Avitus", "Balbinus", "Balbus", "Blandinus", "Blandus", "Blasius", "Brutus", "Caecilius", "Caelinus", "Caelius", "Caesar", "Caius", "Camillus", "Cassian", "Cassianus", "Cassius", "Celsus", "Cicero", "Claudius", "Cloelius", "Cnaeus", "Cornelius", "Crispinus", "Crispus", "Cyprianus", "Decimus", "Diocletianus", "Domitianus", "Domitius", "Drusus", "Duilius", "Egnatius", "Ennius", "Fabianus", "Fabius", "Fabricius", "Faustinus", "Faustus", "Felix", "Festus", "Flavianus", "Flavius", "Florianus", "Florus", "Fulvius", "Gaius", "Gallus", "Germanus", "Glaucia", "Gnaeus", "Gordianus", "Gratianus", "Hadrianus", "Herminius", "Hilarius", "Horatius", "Hortensius", "Ianuarius", "Iovianus", "Iovita", "Iulianus", "Iulius", "Iunius", "Iuvenalis", "Januarius", "Jovian", "Julius", "Junius", "Laelius", "Laurentinus", "Laurentius", "Livianus", "Livius", "Longinus", "Lucanus", "Lucianus", "Lucilius", "Lucius", "Lucretius", "Manlius", "Marcellinus", "Marcellus", "Marcius", "Marcus", "Marianus", "Marinus", "Marius", "Martialis", "Martinus", "Maxentius", "Maximianus", "Maximilianus", "Maximinus", "Maximus", "Naevius", "Nerva", "Nonus", "Octavianus", "Octavius", "Otho", "Ovidius", "Paulinus", "Paulus", "Petronius", "Plinius", "Pompeius", "Pompilius", "Pomponius", "Pontius", "Porcius", "Priscus", "Publius", "Quintilianus", "Quintillus", "Quintinus", "Quintus", "Regulus", "Rufinus", "Rufus", "Sabinus", "Saturninus", "Scaevola", "Secundinus", "Secundus", "Seneca", "Septimius", "Septimus", "Sergius", "Servius", "Severianus", "Severinus", "Severus", "Sextilius", "Sextus", "Silvanus", "Spurius", "Tacitus", "Tarquinius", "Tatianus", "Tatius", "Terentius", "Tertius", "Thracius", "Tiberius", "Tiburtius", "Titianus", "Titus", "Traianus", "Tullius", "Valens", "Valentinianus", "Valentinus", "Valerianus", "Valerius", "Varinius", "Varius", "Vergilius", "Verginius", "Vespasianus", "Vibianus", "Vibius", "Vinicius", "Vitus"]

var siteNames = []

var siteThemes = ["Forest", "Hill", "Jungle", "Marshland", "Swampland", "Misty", "Mysterious", "Haunted", "Holy", "Volcanic", "Wooded", "Hidden", "Imperial", "Royal", "Island", "Coastal", "Arctic", "Underwater", "Tropical", "Elven", "Dwarven", "Ancient"]
var siteNouns = ["Necropolis", "Arch", "Castle", "Citadel", "College", "Colossus", "Fortress", "Gardens", "Library", "Lighthouse", "Monument", "Observatory", "Palace", "Shrine", "Statue", "Temple", "Tower", "Wall", "Ruins", "Dungeon", "Hideout"]


function GenerateSiteNames() {
    siteNames = [];
    for (var theme = 0; theme < siteThemes.length; theme++) {
        for (var noun = 0; noun < siteNouns.length; noun++) {
            siteNames.push(siteThemes[theme] + " " + siteNouns[noun]);
        }
    }
}


var lastMadeQuest = [];
class Campaign {
    constructor(chapters) {
        this.rootQuest = null;
        this.firstQuest = null;
        this.GeneratePlot(chapters);
    }

    GeneratePlot(chapters) {
        this.rootQuest = randomObject(QG_BossFights).CreateQuest();//randomObject(QG_BossFights).CreateQuest();
        this.rootQuest.mainQuest = true;
        // this.rootQuest.target = new Character(randomObject(names));
        this.GenerateTasks(this.rootQuest, chapters);
    }

    GenerateTasks(parentQuest, chapter) { //takes a quest instance and makes tasks for all its required items. If this is a main quest, it generates additional tasks and another link in the main quest.
        if (chapter > 0 || parentQuest.mainQuest) {

            if (!parentQuest)
                write("owch");


            var mainQuestItemNum = Math.floor(Math.random() * parentQuest.definition.requiredItemDefs.length) // if this is a main quest, pick a random required item to spawn another main quest

            for (var taskItemDefNum = 0; taskItemDefNum < parentQuest.definition.requiredItemDefs.length; taskItemDefNum++) //for each item required by the task, create a quest to get that item
            {
                var currentTaskItemDef = parentQuest.definition.requiredItemDefs[taskItemDefNum];
                var taskIsMainQuest = chapter > 1 && parentQuest.mainQuest && taskItemDefNum == mainQuestItemNum;
                var createdTask = this.GenerateTaskFromItemDefinition(parentQuest, currentTaskItemDef, taskIsMainQuest); //create task for the parent
                lastMadeQuest.push(createdTask);

                if (taskIsMainQuest) {
                    this.firstQuest = createdTask;
                    chapter--;
                }
                this.GenerateTasks(createdTask, chapter); //create sub tasks for the task (recursion) 
            }
        }


    }

    GenerateTaskFromItemDefinition(parentQuest, itemDefinition, mainQuest) {

        AllQuestDefs = shuffle(AllQuestDefs);

        var suitableQuestDefs = AllQuestDefs.slice();

        if (mainQuest)
            suitableQuestDefs = [randomObject(QG_BossFights)];
        else
            suitableQuestDefs.remove(QG_BossFights);

        for (var i = 0; i < suitableQuestDefs.length; i++) { //check all quests definitions for quests that give the required item 

            var tempq = suitableQuestDefs[i];
            if (tempq.awardedItemDefs.includes == null)
                write("big fucking issue");

            if (suitableQuestDefs[i].awardedItemDefs.includes(itemDefinition)) {
                var taskQuest = suitableQuestDefs[i].CreateQuest(); //create the task quest
                var newItem = itemDefinition.CreateItem(parentQuest); //create the item. make it required by parent, and given by child.


                parentQuest.requiredItems.push(newItem);
                taskQuest.awardedItems.push(newItem);

/*
                if (parentQuest.targetCharacter != null)
                    taskQuest.name = taskQuest.name.replace("[C]", parentQuest.targetCharacter.name)

                if (parentQuest.targetSite != null)
                    taskQuest.name = taskQuest.name.replace("[S]", newQuest.targetSite.name)
*/

                this.LinkParentAndTask(parentQuest, taskQuest);

                taskQuest.mainQuest = mainQuest;

                return taskQuest;
            }
        }
    }


    LinkParentAndTask(parentQuest, taskQuest) {
        parentQuest.taskQuests.push(taskQuest);
        taskQuest.parentQuest = parentQuest;
    }

}

class CampaignPlayer {
    constructor() {
        this.campaign = null;
        this.invisibileQuests = [];
        this.questLog = [];
        this.completedQuests = [];
        this.inventory = [];
        this.turn = 0;
        this.currentChapter = 1;
    }

    WriteCurrentChapter() {
        writeln("-- Chapter " + this.currentChapter + " --");
        this.currentChapter++;
    }

    PlayCampaign(campaign) {
        this.campaign = campaign;
        this.turn = 1;
        this.WriteCurrentChapter();
        this.GainQuest(this.campaign.firstQuest)
        this.PlayQuest();



    }

    PlayQuest() {

        //   writeln("Session " + this.turn);
        this.turn++;

        var playedQuest = false;
        var chosenQuest = null;
        for (var i = 0; i < this.questLog.length; i++) {
            var possibleQuest = this.questLog[i];
            if (!possibleQuest.complete && containsAllElements(this.inventory, possibleQuest.requiredItems)) {

                chosenQuest = possibleQuest;
                possibleQuest.complete = true;
                playedQuest = true;


                var stringStart = "The party ";

                if (possibleQuest.requiredItems.length > 0) {
                    write("With ");
                    for (var i = 0; i < possibleQuest.requiredItems.length; i++) {
                        write(possibleQuest.requiredItems[i].name);
                        write(", ");
                        if (possibleQuest.requiredItems.length > 2 && i == possibleQuest.requiredItems.length - 2)
                            write("and ");
                    }

                    stringStart = stringStart.toLowerCase();
                }

                write(stringStart + possibleQuest.name + " ");

                if (possibleQuest.awardedItems.length > 0) {
                    write("and gains ");
                    for (var itemNum = 0; itemNum < possibleQuest.awardedItems.length; itemNum++) {
                        write(possibleQuest.awardedItems[itemNum].name + " ");
                        this.inventory.push(possibleQuest.awardedItems[itemNum]);
                    }
                }
                writeln("");

                if (possibleQuest.mainQuest) {
                    this.WriteCurrentChapter();
                }

                if (possibleQuest.parentQuest != null) {
                    this.GainQuest(possibleQuest.parentQuest);
                }
                break;
            }
        }

        if (chosenQuest == this.campaign.rootQuest)
            writeln("Final Boss Defeated! Campaign Won!");
        else if (playedQuest)
            this.PlayQuest();
        else {
            writeln("No more quests! Campaign Failed!");
        }
    }

    GainQuest(quest) {

        if (this.questLog.includes(quest))
            return;

        this.questLog.push(quest);

        var report = "New " + (quest.mainQuest ? "main " : "") + "quest gained: " + quest.name;

        if (quest.requiredItems.length > 0) {
            report += ". Requires: ";
            for (var i = 0; i < quest.requiredItems.length; i++)
                report += quest.requiredItems[i].name + ", ";
        }
        else
            report += ". Requires no items";

        if (quest.awardedItems.length > 0) {
            report += ". Grants ";
            for (var i = 0; i < quest.awardedItems.length; i++)
                report += quest.awardedItems[i].name + ", ";
        }
        else
            report += ". Grants no items";

        //writeln(report);

        for (var i = 0; i < quest.taskQuests.length; i++) {
            var newTask = quest.taskQuests[i];
            if (!this.questLog.includes(newTask)) {
                this.GainQuest(newTask);
            }
        }

    }


}




class QuestDefinition {
    constructor(name, requiredItemDefs, awardedItemDefs) {
        this.name = name;
        this.requiredItemDefs = requiredItemDefs;
        this.awardedItemDefs = awardedItemDefs;
        AllQuestDefs.push(this);
    }

    CreateQuest() {
        var newQuest = new Quest(this);

        var randomName = randomObject(names);
        //names.splice(names.indexOf(randomName), 1); //permanently removes name from array;
        newQuest.targetCharacter = new Character(randomName); //FIX

        var randomSiteName = randomObject(siteNames);
        // siteNames.splice(siteNames.indexOf(randomSiteName), 1); //permanently removes name from array;
        newQuest.targetSite = new Site(randomSiteName); //FIX

        if (newQuest.targetCharacter != null)
            newQuest.name = newQuest.name.replace("[C]", newQuest.targetCharacter.name)

        if (newQuest.targetSite != null)
            newQuest.name = newQuest.name.replace("[S]", newQuest.targetSite.name)

        return newQuest;
    }
}

class Quest {
    constructor(definition) {
        this.name = definition.name;
        this.definition = definition;
        this.complete = false;

        this.mainQuest = false;
        this.targetCharacter = null;
        this.targetSite = null;

        this.parentQuest = null;
        this.taskQuests = [];

        this.requiredItems = []
        this.awardedItems = []
    }
}


class ItemDefinition {
    constructor(name) {
        this.name = name;
        AllItemDefs.push(this);
    }

    CreateItem(sourceQuest) { //this should accept the relevant quest it is required for, to fill out name and descriptions
        var newItem = new Item(this, this.name, sourceQuest);
        if (!newItem)
            print("item failed");
        return newItem;
    }
}

class Item {
    constructor(definition, name, sourceQuest) {
        this.definition = definition;
        this.name = name;
        this.sourceQuest = sourceQuest;

        if (sourceQuest.targetCharacter != null)
            this.name = this.name.replace("[C]", sourceQuest.targetCharacter.name)
        if (sourceQuest.targetSite != null)
            this.name = this.name.replace("[S]", sourceQuest.targetSite.name)
    }
}

class Character {
    constructor(name) {
        this.name = name;
        CastOfCharacters.push(this);
    }
}

class Site {
    constructor(name) {
        this.name = name;
    }
}

//Item Definitions


//to implement
var IDef_UnderworldFavor = new ItemDefinition("a favor from the underworld");
var IDef_NobleFavor = new ItemDefinition("a favor from a noble");
var IDef_CommonFavor = new ItemDefinition("the goodwill of the common folk");
var IDef_DivineFavor = new ItemDefinition("the favor of a god");
var IDef_UnholyFavor = new ItemDefinition("the favor of the damned");
var IDef_WizardFavor = new ItemDefinition("the favor of a wizard");

var IDef_TrueName = new ItemDefinition("true name of [C]"); //can be used to bind demons and elementals (maybe even to make airship), ressurect
var IDef_Prophecy = new ItemDefinition("prophecy"); //can be interpreted

var IDef_PowerfulAlly = new ItemDefinition("a powerful ally");
var IDef_Lore = new ItemDefinition("exotic lore");
var IDef_AccessToSite = new ItemDefinition("access to [S]");
var IDef_ProofOfMurder = new ItemDefinition("proof of murder");
var IDef_CapturedFugitive = new ItemDefinition("captured fugitive");
var IDef_ProofOfDevotion = new ItemDefinition("proof of devotion");// not used yet
var IDef_Fame = new ItemDefinition("fame");
var IDef_BountyNotice = new ItemDefinition("bounty notice");
var IDef_Drugs = new ItemDefinition("potent drugs");
var IDef_Intimidation = new ItemDefinition("intimidation");

//var IDef_Blackmail = new ItemDefinition("blackmail");
var IDef_SecretDocuments = new ItemDefinition("secret documents");
var IDef_TreasureMap = new ItemDefinition("treasure map");
var IDef_IncriminatingEvidence = new ItemDefinition("incriminating evidence against [C]");

//var IDef_CommonKnowledge = new ItemDefinition("common knowledge"); //like rumors
//var IDef_UncommonKnowledge = new ItemDefinition("uncommon knowledge"); //like from an informant



var IDef_LocationOfCharacter = new ItemDefinition("location of [C]");
var IDef_WeaknessOfCharacter = new ItemDefinition("weakness of [C]");
var IDef_IdentityOfCharacter = new ItemDefinition("identity of [C]");

var IDef_MagicPotion = new ItemDefinition("magic potion"); //can be used to cure plague
var IDef_RareIngredients = new ItemDefinition("rare ingredients"); //can be used to make potion, drugs
var IDef_MagicGem = new ItemDefinition("Magic Gem");
var IDef_EnchantedSword = new ItemDefinition("Enchanted Sword");
var IDef_AncientRelic = new ItemDefinition("Ancient Relic");
var IDef_MagicMirror = new ItemDefinition("Magic Mirror");

var IDef_GuardsOvercome = new ItemDefinition("guards overcome");

var IDef_Costumes = new ItemDefinition("costumes");


var IG_Info = [IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter]; //IDef_Lore

/*var IG_ThreePiecesOfInfo = [IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter];
var IG_ThreeArtifacts = [IDef_MagicGem, IDef_EnchantedSword, IDef_AncientRelic];*/


var IG_CommonKnowledge = [IDef_BountyNotice]; //like rumors

var IG_MagicLoot = [IDef_MagicPotion, IDef_MagicMirror, IDef_MagicGem, IDef_EnchantedSword, IDef_AncientRelic];

var IG_UnderworldGoods = [IDef_TreasureMap, IDef_SecretDocuments, IDef_Drugs, IDef_IncriminatingEvidence, IDef_AccessToSite, IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter]
var IG_NobleRewards = [IDef_PowerfulAlly, IDef_TreasureMap, IDef_SecretDocuments, IDef_IncriminatingEvidence, IDef_AccessToSite, IDef_LocationOfCharacter, IDef_IdentityOfCharacter]
var IG_WizardRewards = [IDef_RareIngredients, IDef_TrueName, IDef_Prophecy, IDef_PowerfulAlly, IDef_AccessToSite, IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter]
var IG_Documents = [IDef_TreasureMap, IDef_SecretDocuments, IDef_IncriminatingEvidence]


var IG_RareAndValuable = IG_Info.concat(IG_MagicLoot).concat([IDef_AccessToSite, IDef_PowerfulAlly]);



//Quest Definitions
//var QDef_DeusExMachina = new QuestDefinition("deus ex machina", AllItemDefs, AllItemDefs);


var QDef_GenericKill = new QuestDefinition("kills [C]", [], [IDef_ProofOfMurder, IDef_GuardsOvercome]);
var QDef_BrazenKill = new QuestDefinition("brazenly attacks [C]", [], [IDef_ProofOfMurder, IDef_GuardsOvercome]);
var QDef_AmbushKill = new QuestDefinition("ambushes [C]", [], [IDef_ProofOfMurder, IDef_GuardsOvercome]);
var QDef_CaptureFugitive = new QuestDefinition("apprehends a wanted scofflaw", [IDef_LocationOfCharacter], [IDef_CapturedFugitive]);
var QDef_SneakPastGuards = new QuestDefinition("sneaks past the guards", [], [IDef_GuardsOvercome]);
var QDef_GenericAssassinate = new QuestDefinition("assassinates [C]", [IDef_LocationOfCharacter, IDef_AccessToSite], [IDef_ProofOfMurder, IDef_Intimidation]);

var QDef_GenericKill = new QuestDefinition("battles the medusa", [IDef_MagicMirror], [IDef_ProofOfMurder]);

//Boss Fights
//var QDef_DefeatLocalVillain = new QuestDefinition("defeat local villain [C]", IG_Info, AllItemDefs);
var QDef_BossFightPlanning = new QuestDefinition("defeats Villain [C] using knowledge and planning", [IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter], AllItemDefs);
var QDef_BossFightRelics = new QuestDefinition("defeats Villain [C] using legendary items", [IDef_MagicGem, IDef_EnchantedSword, IDef_AncientRelic], AllItemDefs);
var QDef_BossFightAlliance = new QuestDefinition("defeats Villain [C] with an alliance", [IDef_PowerfulAlly, IDef_PowerfulAlly, IDef_PowerfulAlly], AllItemDefs);
var QDef_BossFightUnmask = new QuestDefinition("defeats Villain [C] by unmasking them", [IDef_PowerfulAlly, IDef_IncriminatingEvidence, IDef_GuardsOvercome], AllItemDefs);
var QDef_BossFightAssassinate = new QuestDefinition("defeats Villain [C] by assassinating them", [IDef_LocationOfCharacter, IDef_AccessToSite, IDef_GuardsOvercome], AllItemDefs);

var QG_BossFights = [QDef_BossFightPlanning, QDef_BossFightRelics, QDef_BossFightAlliance, QDef_BossFightUnmask, QDef_BossFightAssassinate];

var QDef_GenericBeastFight = new QuestDefinition("kills a mythical beast", [], IG_MagicLoot.concat(IDef_Fame));
var QDef_DragonFight = new QuestDefinition("defeats the dragon", [IDef_AccessToSite], IG_MagicLoot.concat(IDef_Fame));
var QDef_FollowTreasureMap = new QuestDefinition("pursues a treasure", [IDef_AccessToSite, IDef_TreasureMap], IG_MagicLoot);

var QDef_InterrogateCharacter = new QuestDefinition("interrogates [C]", [IDef_LocationOfCharacter], IG_Info);
var QDef_TrackCharacter = new QuestDefinition("tracks [C]", [IDef_IdentityOfCharacter], [IDef_LocationOfCharacter]);

var QDef_GainPowerfulAlly = new QuestDefinition("prays to the gods", [], [IDef_PowerfulAlly]);
var QDef_Z = new QuestDefinition("delves into the dwarven mines", [], [IDef_MagicGem]);
var QDef_X = new QuestDefinition("steals from the fabled horde", [], [IDef_AncientRelic]);
var QDef_Y = new QuestDefinition("steals from the armory of the master smith", [], [IDef_EnchantedSword]);

//Accessing Sites
var QDef_BribeGuard = new QuestDefinition("bribes a guard at [S]", [], [IDef_AccessToSite]);
var QDef_InfiltrateSite = new QuestDefinition("infiltrates [S]", [], [IDef_AccessToSite]);
var QDef_LongTravel = new QuestDefinition("travels great distance to [S]", [], [IDef_AccessToSite]);
var QDef_TravelSailing = new QuestDefinition("sails to [S]", [], [IDef_AccessToSite]);
var QDef_TravelAirship = new QuestDefinition("takes an airship to [S]", [], [IDef_AccessToSite]);
var QDef_TravelTeleportation = new QuestDefinition("uses a teleportation circle to [S]", [], [IDef_AccessToSite]);


var QDef_StealFromSite = new QuestDefinition("steals from [S]", [IDef_AccessToSite], IG_MagicLoot.concat(IG_Documents));
var QDef_StealFromCharacter = new QuestDefinition("steals from [C]", [IDef_LocationOfCharacter], IG_MagicLoot.concat(IG_Documents));


var QDef_ActivateArtifct = new QuestDefinition("activates the artifact", [IDef_AncientRelic, IDef_Lore], IG_RareAndValuable);

var QDef_LocateCharacter = new QuestDefinition("locates [C]", [], [IDef_LocationOfCharacter]);
var QDef_ResearchCharacter = new QuestDefinition("researches [C]", [], IG_Info);
var QDef_AskAroundAboutCharacter = new QuestDefinition("asks around about [C]", [], [IDef_LocationOfCharacter, IDef_IdentityOfCharacter]);


var QDef_BountyNotice = new QuestDefinition("hears about bounty", [], [IDef_BountyNotice]);
var QDef_BountyKill = new QuestDefinition("cashes in bounty", [IDef_BountyNotice, IDef_ProofOfMurder], IG_MagicLoot);
var QDef_BountyKill = new QuestDefinition("cashes in bounty", [IDef_BountyNotice, IDef_CapturedFugitive], IG_MagicLoot);

var QDef_KillRampagingMonster = new QuestDefinition("kills rampaging monster", [], [IDef_Fame, IDef_NobleFavor, IDef_CommonFavor]);



var QDef_AudienceWithRoyalty = new QuestDefinition("gains audience with royalty", [IDef_Fame], IG_RareAndValuable)

//Learning things for free
var QDef_HearTownCrier = new QuestDefinition("overhears town crier", [], IG_CommonKnowledge)
var QDef_HearFromInformant = new QuestDefinition("consults with an informant", [], IG_CommonKnowledge) //IDef_UncommonKnowledge
var QDef_Happenstance = new QuestDefinition("stumbles into a random happenstance", [], IG_CommonKnowledge)
var QDef_LocalPostings = new QuestDefinition("reads local postings", [], IG_CommonKnowledge) //IDef_UncommonKnowledge
var QDef_HearRumor = new QuestDefinition("hears rumors", [], IG_CommonKnowledge)

//Favors
var QDef_RallyTheCommonFolk = new QuestDefinition("rallies the common folk", [IDef_CommonFavor], [IDef_PowerfulAlly]);

var QDef_CashInUnderworldFavor = new QuestDefinition("cashes in underworld favor", [IDef_UnderworldFavor], IG_UnderworldGoods)
var QDef_FavorForUnderworldContact = new QuestDefinition("does a job for an underworld contact", [], [IDef_UnderworldFavor])

var QDef_ApproachedBySecretSociety = new QuestDefinition("is approached by a secret society", [IDef_Fame], IG_UnderworldGoods)

var QDef_CashInNobleFavor = new QuestDefinition("cashes in noble favor", [IDef_NobleFavor], IG_NobleRewards)
var QDef_NobleDiscredit = new QuestDefinition("discredits a noble's rival", [IDef_IncriminatingEvidence], [IDef_NobleFavor])
var QDef_FavorForNobleContact = new QuestDefinition("does a job for a noble", [], [IDef_NobleFavor])
var QDef_DeliverLoveLetter = new QuestDefinition("delivers a message from star-crossed lover", [IDef_AccessToSite], [IDef_NobleFavor])
var QDef_DrugDelivery = new QuestDefinition("delivers drugs to decadent noble", [IDef_Drugs], [IDef_NobleFavor, IDef_IncriminatingEvidence])
var QDef_CureAilingNoble = new QuestDefinition("cures an ailing noble", [IDef_MagicPotion], [IDef_NobleFavor])

var QDef_CashInWizardFavor = new QuestDefinition("cashes in wizard's favor", [IDef_WizardFavor], IG_WizardRewards)
var QDef_WizardTask = new QuestDefinition("does a task for a wizard", [], [IDef_WizardFavor])
var QDef_WizardTaskCouncil = new QuestDefinition("performs a quest for the council of mages", [], [IDef_WizardFavor])
var QDef_WizardTaskExperiment = new QuestDefinition("captures a runaway experiment", [], [IDef_WizardFavor])
var QDef_WizardTaskConfinement = new QuestDefinition("frees a mage from confinement", [], [IDef_WizardFavor])
var QDef_WizardTaskMeteor = new QuestDefinition("recovers fragments of a fallen star for a mage", [], [IDef_WizardFavor])

var QDef_StealGuardCostumes = new QuestDefinition("steals guard uniforms", [IDef_GuardsOvercome], [IDef_Costumes]);
var QDef_SneakByInCostume = new QuestDefinition("sneaks inside with a disguise", [IDef_Costumes], [IDef_AccessToSite])
var QDef_AttendMasqueradeUninvited = new QuestDefinition("attends the masquerade", [IDef_Costumes], [IDef_IdentityOfCharacter, IDef_LocationOfCharacter])
var QDef_AttendMasqueradeInvited = new QuestDefinition("attends the masquerade", [IDef_NobleFavor], [IDef_IdentityOfCharacter, IDef_LocationOfCharacter])

//Skulduggery
var QDef_ForgeEvidence = new QuestDefinition("forges evidence", [], [IDef_IncriminatingEvidence]);
var QDef_ConvertEvidenceToBlackmail = new QuestDefinition("uses the evidence as blackmail", [IDef_IncriminatingEvidence], IG_Info.concat(IDef_UnderworldFavor, IDef_NobleFavor))
var QDef_Extort = new QuestDefinition("extort for favor from [C]", [IDef_Intimidation], [IDef_NobleFavor])
var QDef_ReadSecretDocuments = new QuestDefinition("desipher secret documents", [IDef_SecretDocuments], IG_Info)

//Magical Endevours
var QDef_ResearchLore = new QuestDefinition("research forgotten lore", [], [IDef_Lore]);
var QDef_Brew = new QuestDefinition("brew recipe", [IDef_RareIngredients, IDef_Lore], [IDef_MagicPotion, IDef_Drugs])








/*
Boss - secret villain. requires:
evidence of wrongdoing
powerful ally
defeat henchmen

Masquerade
Arrange marriages
Time travel
Parallel universe
Cure amnesia
Enter dreams
Solve mystery
Unravel conspiracy
Sabotage
Lead war
Change sides
Encounter society that causes reevaluation of moral system
Ressurect figure
Overcome loss of powers
Escape ambush
Body swap
Escape false utopia
Cult
Stop ritual
Choose lesser of evils
Bind elementals or demons
Invoke gods
Give players Corrupting power
Raise morale, sysiphean task
Fight in the collisuem
Escape slavery, capture
Multi piece chain quest
Deal with devil
- free devil
- get revenge
Combine all powerful being to intervene
Tame celestial beast
Entreat the witch

Bosses
Defeat the necromancer
Cure the Plague
Ancient evil ressurect in
Dragon King

Medusa req magic mirror
Cure vampirism
Vampire court/cabal

vampire-major-quest-item

Silence rabel rouser
Wild Golem 
Learn true name
Learn secret identity

Defeat illusion - perfect world
Discover inside illusion
Notice inconsistentcy

Joker anarchist
Break enchantment on king

Switching between universes
Crisis of confidence, purpose

Show error of ways
Face off against copies/mirror of party

Gather ingredients for potion
Water from eternal well for potion
Use potion to cure malady

Noble-Favor
Underworld-Favor
Unholy-Favor
Divine-Favor

Prophecy
Prophetic vision (cleric, grants rare knowledge - where something is)
Interpret prophecy

Lift curse of silence
Lead the people, grants powerful ally

Certain backgrounds have access to certain quests
Use family connection
Underground contacts
Research at wizard library

Choose villain scheme and PC backgrou
*/


var currentCampaign;
var currentCampaignPlayer;
var generateOutput = "";

function GenerateCampaign() {
    GenerateSiteNames();

    writeln("Generating Campaign!");
    currentCampaign = new Campaign(8);

    writeln("Playing Campaign!");
    currentCampaignPlayer = new CampaignPlayer();
    currentCampaignPlayer.PlayCampaign(currentCampaign);

    writeln("Campaign Complete!");
    document.getElementById('SummaryOutput').innerHTML = generateOutput;
}


//Output Methods
function write(text) {
    generateOutput += text;
}
function writeln(text) {
    generateOutput += text + "<br>";
}

function writebullet(text) {
    generateOutput += "<li>" + text + "</li>";
}