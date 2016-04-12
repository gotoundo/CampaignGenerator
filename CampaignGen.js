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
var names = ["Aelianus", "Aelius", "Aemilianus", "Aemilius", "Aetius", "Agrippa", "Ahenobarbus", "Albanus", "Albinus", "Albus", "Antoninus", "Antonius", "Appius", "Aquila", "Aquilinus", "Atilius", "Augustinus", "Augustus", "Aulus", "Aurelianus", "Aurelius", "Avilius", "Avitus", "Balbinus", "Balbus", "Blandinus", "Blandus", "Blasius", "Brutus", "Caecilius", "Caelinus", "Caelius", "Caesar", "Caius", "Camillus", "Cassian", "Cassianus", "Cassius", "Celsus", "Cicero", "Claudius", "Cloelius", "Cnaeus", "Cornelius", "Crispinus", "Crispus", "Cyprianus", "Decimus", "Diocletianus", "Domitianus", "Domitius", "Drusus", "Duilius", "Egnatius", "Ennius", "Fabianus", "Fabius", "Fabricius", "Faustinus", "Faustus", "Felix", "Festus", "Flavianus", "Flavius", "Florianus", "Florus", "Fulvius", "Gaius", "Gallus", "Germanus", "Glaucia", "Gnaeus", "Gordianus", "Gratianus", "Hadrianus", "Herminius", "Hilarius", "Horatius", "Hortensius", "Ianuarius", "Iovianus", "Iovita", "Iulianus", "Iulius", "Iunius", "Iuvenalis", "Januarius", "Jovian", "Julius", "Junius", "Laelius", "Laurentinus", "Laurentius", "Livianus", "Livius", "Longinus", "Lucanus", "Lucianus", "Lucilius", "Lucius", "Lucretius", "Manlius", "Marcellinus", "Marcellus", "Marcius", "Marcus", "Marianus", "Marinus", "Marius", "Martialis", "Martinus", "Maxentius", "Maximianus", "Maximilianus", "Maximinus", "Maximus", "Naevius", "Nerva", "Nonus", "Octavianus", "Octavius", "Otho", "Ovidius", "Paulinus", "Paulus", "Petronius", "Plinius", "Pompeius", "Pompilius", "Pomponius", "Pontius", "Porcius", "Priscus", "Publius", "Quintilianus", "Quintillus", "Quintinus", "Quintus", "Regulus", "Rufinus", "Rufus", "Sabinus", "Saturninus", "Scaevola", "Secundinus", "Secundus", "Seneca", "Septimius", "Septimus", "Sergius", "Servius", "Severianus", "Severinus", "Severus", "Sextilius", "Sextus", "Silvanus", "Spurius", "Tacitus", "Tarquinius", "Tatianus", "Tatius", "Terentius", "Tertius", "Thracius", "Tiberius", "Tiburtius", "Titianus", "Titus", "Traianus", "Tullius", "Valens", "Valentinianus", "Valentinus", "Valerianus", "Valerius", "Varinius", "Varius", "Vergilius", "Verginius", "Vespasianus", "Vibianus", "Vibius", "Vinicius", "Vitus", "Aelia", "Antonina", "Augustina", "Caecilia", "Caelina", "Decima", "Domitia", "Fabricia", "Faustina", "Flaviana", "Floriana", "Fulvia", "Gratiana", "Hilaria", "Iulia", "Julia", "Junia", "Liviana", "Longina", "Lucia", "Lucilia", "Paula", "Pomponia", "Porcia", "Priscilla", "Rufina", "Sabina", "Tacita", "Tatiana", "Tullia", "Valentina", "Valeria", "Virginia", "Aeliana", "Aemilia", "Agrippina", "Aurelia", "Balbina", "Blandina", "Cassia", "Cloelia", "Cornelia", "Drusa", "Fabia", "Fabiola", "Germana", "Herminia", "Hortensia", "Iuliana", "Iunia", "Juliana", "Laurentia", "Luciana", "Lucretia", "Marcella", "Marina", "Maximiliana", "Octavia", "Paulina", "Petronia", "Valeriana", "Varinia", "Vita", "Aemiliana", "Albina", "Antonia", "Aquilina", "Augusta", "Aureliana", "Caelia", "Camilla", "Claudia", "Domitilla", "Drusilla", "Fabiana", "Fausta", "Flavia", "Hadriana", "Horatia", "Laelia", "Laurentina", "Lucilla", "Marcellina", "Marcia", "Mariana", "Martina", "Maxima", "Prisca", "Quintina", "Saturnina", "Septima", "Severina", "Titiana", "Verginia", "Vibiana"]

var siteNames = []

var siteThemes = ["Forest", "Hill", "Jungle", "Marshland", "Swampland", "Misty", "Mysterious", "Haunted", "Holy", "Volcanic", "Wooded", "Hidden", "Imperial", "Royal", "Island", "Coastal", "Arctic", "Underwater", "Tropical", "Elven", "Dwarven", "Ancient"]
var siteNouns = ["Necropolis", "Arch", "Castle", "Citadel", "College", "Colossus", "Fortress", "Gardens", "Library", "Lighthouse", "Monument", "Observatory", "Palace", "Shrine", "Statue", "Temple", "Tower", "Wall", "Ruins", "Dungeon", "Hideout"]


function GenerateSiteNames() {
    siteNames = [];
    for (var theme = 0; theme < siteThemes.length; theme++) {
        for (var noun = 0; noun < siteNouns.length; noun++) {
            siteNames.push("the " + siteThemes[theme] + " " + siteNouns[noun]);
        }
    }
}


var lastMadeQuest = [];
var majorQuestItems = []
class Campaign {
    constructor(chapters) {
        this.rootQuest = null;
        this.firstQuest = null;
        this.chapterCount = chapters;
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

                if (parentQuest.mainQuest)
                    majorQuestItems.push(newItem);

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
        this.currentSession = 1;
        this.aboutToPrintSession = true;
        this.aboutToPrintChapter = true;

    }

    AnnounceNextChapter() {
        //this.aboutToPrintChapter = true;

    }

    AnnounceNextSession() {
        //this.aboutToPrintSession = true;

    }


    PlayCampaign(campaign) {
        this.campaign = campaign;
        this.turn = 1;
        this.GainQuest(this.campaign.firstQuest)
        this.PlayQuest();



    }

    PlayQuest() {

        //   writeln("Session " + this.turn);
        this.turn++;

        var playedQuest = false;
        var chosenQuest = null;
        for (var i = 0; i < this.questLog.length; i++) {

            if (!this.questLog[i].complete && containsAllElements(this.inventory, this.questLog[i].requiredItems)) { //chose this quest

                chosenQuest = this.questLog[i];
                chosenQuest.complete = true;
                playedQuest = true;

                if (this.aboutToPrintChapter) {
                    writeln("");
                    write("<h3>Chapter " + this.currentChapter + "</h3>");
                    this.currentChapter++;

                    var rootOfChosenQuest = chosenQuest;
                    var lootOfRoot = chosenQuest.awardedItems[0];
                    while (!rootOfChosenQuest.mainQuest) {
                        lootOfRoot = rootOfChosenQuest.awardedItems[0];
                        rootOfChosenQuest = rootOfChosenQuest.parentQuest;
                    }
                    if (rootOfChosenQuest)
                        writeln("<i>In which the party attempts to " + rootOfChosenQuest.headline + ".</i>");
                }


                if (this.aboutToPrintSession) {
                    write("<h4>Quest " + this.currentSession + "</h4>");
                    this.currentSession++;

                    if (chosenQuest.mainQuest) {
                        writeln("<i>In which the party makes a desperate gamble!</i>");
                    }
                    else {
                        var rootOfChosenQuest = chosenQuest;
                        var lootOfRoot = chosenQuest.awardedItems[0];
                        while (!rootOfChosenQuest.mainQuest) {
                            lootOfRoot = rootOfChosenQuest.awardedItems[0];
                            rootOfChosenQuest = rootOfChosenQuest.parentQuest;
                        }
                        if (lootOfRoot)
                            writeln("<i>In which the party aims to acquire " + lootOfRoot.name + "</i>");
                    }

                }



                var totalReport = "";
                var stringStart = "The party ";

                if (chosenQuest.requiredItems.length > 0) {
                    totalReport+="With ";
                    for (var i = 0; i < chosenQuest.requiredItems.length; i++) {
                        totalReport+=(chosenQuest.requiredItems[i].name);
                        if (chosenQuest.requiredItems.length == 2) {
                            if (i == 0)
                                totalReport+=" and ";
                            else
                                totalReport+=", ";
                        }
                        else
                            totalReport+=", ";
                        if (chosenQuest.requiredItems.length > 2 && i == chosenQuest.requiredItems.length - 2)
                            totalReport+="and ";
                    }

                    stringStart = stringStart.toLowerCase();
                }

                totalReport+=(stringStart + chosenQuest.name + " ");


                var lastQuestOfSession = false;

                if (chosenQuest.awardedItems.length > 0) {
                    totalReport+="and gains ";
                    for (var itemNum = 0; itemNum < chosenQuest.awardedItems.length; itemNum++) {
                        totalReport+=(chosenQuest.awardedItems[itemNum].name + " ");
                        this.inventory.push(chosenQuest.awardedItems[itemNum]);
                        if (majorQuestItems.includes(chosenQuest.awardedItems[itemNum]))
                            lastQuestOfSession = true;
                    }
                }
                
                writebullet(totalReport);
                


                this.aboutToPrintChapter = chosenQuest.mainQuest && this.currentChapter <= this.campaign.chapterCount;
                this.aboutToPrintSession = lastQuestOfSession;

                if (chosenQuest.parentQuest != null)
                    this.GainQuest(chosenQuest.parentQuest);
                break;
            }
        }

        if (chosenQuest == this.campaign.rootQuest)
            writeln("<h2>Campaign Over!</h2>");
        else if (playedQuest)
            this.PlayQuest();
        else {
            writeln("<h2>No more quests! Campaign Failed!</h2>");
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
        this.headline = name;
        this.requiredItemDefs = requiredItemDefs;
        this.awardedItemDefs = awardedItemDefs;
        AllQuestDefs.push(this);
    }

    CreateQuest() {
        var newQuest = new Quest(this);

        //var randomName = ;
        //names.splice(names.indexOf(randomName), 1); //permanently removes name from array;
        newQuest.targetCharacter = new Character(randomObject(names)); //FIX

        // siteNames.splice(siteNames.indexOf(randomSiteName), 1); //permanently removes name from array;
        newQuest.targetSite = new Site(randomObject(siteNames)); //FIX

        if (newQuest.targetCharacter != null) {
            newQuest.name = newQuest.name.replace("[C]", newQuest.targetCharacter.name)
            newQuest.headline = newQuest.headline.replace("[C]", newQuest.targetCharacter.name)
        }

        if (newQuest.targetSite != null)
            newQuest.name = newQuest.name.replace("[S]", newQuest.targetSite.name)

        return newQuest;
    }
}

class Quest {
    constructor(definition) {
        this.name = definition.name;
        this.definition = definition;
        this.headline = definition.headline;
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

        if (sourceQuest.targetCharacter != null) {
            this.name = this.name.replace("[C]", sourceQuest.targetCharacter.name)

        }
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
var IDef_ProofOfMurder = new ItemDefinition("proof of the kill");
var IDef_CapturedFugitive = new ItemDefinition("captured fugitive");
var IDef_ProofOfDevotion = new ItemDefinition("proof of devotion");// not used yet
var IDef_Fame = new ItemDefinition("fame");
var IDef_BountyNotice = new ItemDefinition("a bounty notice");
var IDef_Drugs = new ItemDefinition("some potent drugs");
var IDef_Intimidation = new ItemDefinition("intimidation");

//var IDef_Blackmail = new ItemDefinition("blackmail");
var IDef_SecretDocuments = new ItemDefinition("secret documents");
var IDef_TreasureMap = new ItemDefinition("treasure map");
var IDef_IncriminatingEvidence = new ItemDefinition("incriminating evidence against [C]");

//var IDef_CommonKnowledge = new ItemDefinition("common knowledge"); //like rumors
//var IDef_UncommonKnowledge = new ItemDefinition("uncommon knowledge"); //like from an informant



var IDef_LocationOfCharacter = new ItemDefinition("awareness of [C]'s location");
var IDef_WeaknessOfCharacter = new ItemDefinition("the key to [C]'s weakness");
var IDef_IdentityOfCharacter = new ItemDefinition("the secret of [C]'s true identity");

var IDef_MagicPotion = new ItemDefinition("a magic potion"); //can be used to cure plague
var IDef_RareIngredients = new ItemDefinition("some rare ingredients"); //can be used to make potion, drugs
var IDef_MagicGem = new ItemDefinition("a magic gem");
var IDef_EnchantedSword = new ItemDefinition("an enchanted sword");
var IDef_AncientRelic = new ItemDefinition("an ancient relic");
var IDef_MagicMirror = new ItemDefinition("a magic mirror");

var IDef_GuardsOvercome = new ItemDefinition("the defeat of the guards");

var IDef_Costumes = new ItemDefinition("costumes");

var IDef_Freedom = new ItemDefinition("freedom from imprisonment");


var IG_Info = [IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter, IDef_Lore]; //IDef_Lore

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

var QDef_FreedomLabyrinth = new QuestDefinition("escapes the labyrinth after being thrown inside", [], [IDef_Freedom]);
var QDef_FreedomLocation = new QuestDefinition("escapes from [S]", [], [IDef_Freedom]);
var QDef_FreedomGuards = new QuestDefinition("escapes from [S]", [IDef_GuardsOvercome], [IDef_Freedom]);
var QDef_FreedomJailer = new QuestDefinition("fools the jailer after being captured", [], [IDef_Freedom]);
var QDef_FreedomTorturer = new QuestDefinition("overpowers the torturer after being betrayed and captured", [], [IDef_Freedom]);
var QDef_FreedomColliseum = new QuestDefinition("battles through the colliseum after being captured", [], [IDef_Freedom]);
var QDef_FreedomDungeon = new QuestDefinition("navigates the dungeon after being captured", [], [IDef_Freedom]);
var QDef_FreedomIllusion = new QuestDefinition("escapes an idyllic illusion", [], [IDef_Freedom]);


//Boss Fights
var QDef_BossFightPlanning = new QuestDefinition("defeats Usurper [C] using knowledge and planning", [IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter], AllItemDefs);
QDef_BossFightPlanning.headline = "defeat the Usurper [C] with knowledge and planning, having seen the peasantry suffer under their rule";
var QDef_BossFightRelics = new QuestDefinition("defeats Cult Leader [C] using legendary items", [IDef_MagicGem, IDef_EnchantedSword, IDef_AncientRelic], AllItemDefs);
QDef_BossFightRelics.headline = "thwart [C], leader of a doomsday cult, using the three relics of prophecy"
var QDef_BossFightAlliance = new QuestDefinition("defeats the scourge [C] with an alliance", [IDef_PowerfulAlly, IDef_PowerfulAlly, IDef_PowerfulAlly], AllItemDefs);
QDef_BossFightAlliance.headline = "overcome the realm-threatening scourge [C] by assembling an alliance"
var QDef_BossFightUnmask = new QuestDefinition("defeats Vizier [C] by unmasking them", [IDef_PowerfulAlly, IDef_IncriminatingEvidence, IDef_GuardsOvercome], AllItemDefs);
QDef_BossFightUnmask.headline = "reveal the corrupt advisor [C] by proving their guilt"
var QDef_BossFightAssassinate = new QuestDefinition("assassinates the tyrant [C], restoring justice to the realm", [IDef_LocationOfCharacter, IDef_AccessToSite, IDef_GuardsOvercome], AllItemDefs);
QDef_BossFightAssassinate.headline = "assassinate the tyrant [C], whose cruelty and perversity knows no bounds"
var QDef_BossFightEscape = new QuestDefinition("defeats the mastermind [C]", [IDef_IdentityOfCharacter, IDef_Freedom, IDef_AccessToSite, IDef_GuardsOvercome], AllItemDefs);
QDef_BossFightEscape.headline = "thwart mastermind [C] by escaping imprisonment and ultimately confronting them in their sanctuary"
var QDef_BossFightPlague = new QuestDefinition("cures the terrible plague", [IDef_MagicPotion, IDef_Lore], AllItemDefs);
QDef_BossFightPlague.headline = "cure a virulent plague that is sweeping across the land"

var QG_BossFights = [QDef_BossFightPlanning, QDef_BossFightRelics, QDef_BossFightAlliance, QDef_BossFightUnmask, QDef_BossFightAssassinate, QDef_BossFightEscape, QDef_BossFightPlague];

var QDef_GenericBeastFight = new QuestDefinition("kills a mythical beast", [], IG_MagicLoot.concat(IDef_Fame));
var QDef_DragonFight = new QuestDefinition("defeats the dragon", [IDef_AccessToSite], IG_MagicLoot.concat(IDef_Fame));
var QDef_FollowTreasureMap = new QuestDefinition("uncovers a hoard", [IDef_TreasureMap, IDef_AccessToSite], IG_MagicLoot);

var QDef_InterrogateCharacter = new QuestDefinition("interrogates [C]", [IDef_LocationOfCharacter], IG_Info);
var QDef_TrackCharacter = new QuestDefinition("tracks [C]", [IDef_IdentityOfCharacter], [IDef_LocationOfCharacter]);

var QDef_GainPowerfulAlly = new QuestDefinition("makes a great sacrifice at the altar of the gods", [], [IDef_PowerfulAlly]);
var QDef_Z = new QuestDefinition("delves into the dwarven mines", [], [IDef_MagicGem]);
var QDef_X = new QuestDefinition("steals from the fabled horde", [], [IDef_AncientRelic]);
var QDef_Y = new QuestDefinition("steals from the armory of the master smith", [], [IDef_EnchantedSword]);

//Accessing Sites
var QDef_BribeGuard = new QuestDefinition("bribes a guard at [S]", [], [IDef_AccessToSite]);
var QDef_InfiltrateSite = new QuestDefinition("infiltrates [S]", [], [IDef_AccessToSite]);
var QDef_LongTravel = new QuestDefinition("travels a great distance, past [S]", [], [IDef_AccessToSite]);
var QDef_TravelSailing = new QuestDefinition("sails past [S]", [], [IDef_AccessToSite]);
var QDef_TravelAirship = new QuestDefinition("takes an airship over [S]", [], [IDef_AccessToSite]);
var QDef_TravelTeleportation = new QuestDefinition("uses a teleportation circle in [S]", [], [IDef_AccessToSite]);


var QDef_StealFromSite = new QuestDefinition("steals from [S]", [IDef_AccessToSite], IG_MagicLoot.concat(IG_Documents));
var QDef_StealFromCharacter = new QuestDefinition("steals from [C]", [IDef_LocationOfCharacter], IG_MagicLoot.concat(IG_Documents));


var QDef_ActivateArtifct = new QuestDefinition("activates the artifact", [IDef_AncientRelic, IDef_Lore], IG_RareAndValuable);

var QDef_LocateCharacterByQuestioning = new QuestDefinition("locates their target by questioning [C]", [], [IDef_LocationOfCharacter]);
var QDef_ResearchCharacter = new QuestDefinition("researches their target", [], IG_Info);
var QDef_AskAroundAboutCharacter = new QuestDefinition("asks around", [], [IDef_LocationOfCharacter, IDef_IdentityOfCharacter]);


var QDef_BountyNotice = new QuestDefinition("hears about a bounty", [], [IDef_BountyNotice]);
var QDef_BountyKill = new QuestDefinition("cashes in the bounty", [IDef_BountyNotice, IDef_ProofOfMurder], IG_MagicLoot);
var QDef_BountyKill = new QuestDefinition("cashes in the bounty", [IDef_BountyNotice, IDef_CapturedFugitive], IG_MagicLoot);

var QDef_KillRampagingMonster = new QuestDefinition("kills a rampaging monster", [], [IDef_Fame, IDef_NobleFavor, IDef_CommonFavor]);



var QDef_AudienceWithRoyalty = new QuestDefinition("is granted an audience at court", [IDef_Fame], IG_RareAndValuable)

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

var QDef_CashInNobleFavor = new QuestDefinition("cashes in the noble's favor", [IDef_NobleFavor], IG_NobleRewards)
var QDef_NobleDiscredit = new QuestDefinition("discredits them on behalf of their rival", [IDef_IncriminatingEvidence], [IDef_NobleFavor])
var QDef_FavorForNobleContact = new QuestDefinition("does a job for a noble", [], [IDef_NobleFavor])
var QDef_DeliverLoveLetter = new QuestDefinition("delivers a message from star-crossed lover", [IDef_AccessToSite], [IDef_NobleFavor])
var QDef_DrugDelivery = new QuestDefinition("delivers drugs to decadent noble", [IDef_Drugs], [IDef_NobleFavor, IDef_IncriminatingEvidence])
var QDef_CureAilingNoble = new QuestDefinition("cures an ailing noble", [IDef_MagicPotion], [IDef_NobleFavor])

var QDef_CashInWizardFavor = new QuestDefinition("cashes in the wizard's favor", [IDef_WizardFavor], IG_WizardRewards)
var QDef_WizardTask = new QuestDefinition("does a task for a wizard", [], [IDef_WizardFavor])
var QDef_WizardTaskCouncil = new QuestDefinition("performs a quest for the council of mages", [], [IDef_WizardFavor])
var QDef_WizardTaskExperiment = new QuestDefinition("captures a runaway experiment", [], [IDef_WizardFavor])
var QDef_WizardTaskConfinement = new QuestDefinition("frees a mage from confinement", [], [IDef_WizardFavor])
var QDef_WizardTaskMeteor = new QuestDefinition("recovers fragments of a fallen star for a mage", [], [IDef_WizardFavor])

var QDef_StealGuardCostumes = new QuestDefinition("steals guard uniforms", [IDef_GuardsOvercome], [IDef_Costumes]);
var QDef_SneakByInCostume = new QuestDefinition("sneaks inside [S] with a disguise", [IDef_Costumes], [IDef_AccessToSite])
var QDef_AttendMasqueradeUninvited = new QuestDefinition("attends the masquerade", [IDef_Costumes], [IDef_IdentityOfCharacter, IDef_LocationOfCharacter])
var QDef_AttendMasqueradeInvited = new QuestDefinition("attends the masquerade", [IDef_NobleFavor], [IDef_IdentityOfCharacter, IDef_LocationOfCharacter])

//Skulduggery
var QDef_ForgeEvidence = new QuestDefinition("creates a forgery", [], [IDef_IncriminatingEvidence]);
var QDef_ConvertEvidenceToBlackmail = new QuestDefinition("uses the evidence as blackmail", [IDef_IncriminatingEvidence], IG_Info.concat(IDef_UnderworldFavor, IDef_NobleFavor))
var QDef_Extort = new QuestDefinition("extort for favor from [C]", [IDef_Intimidation], [IDef_NobleFavor])
var QDef_ReadSecretDocuments = new QuestDefinition("desipher secret documents", [IDef_SecretDocuments], IG_Info)

//Magical Endevours
var QDef_ResearchLore = new QuestDefinition("researches forgotten texts", [], [IDef_Lore]);
var QDef_Brew = new QuestDefinition("brews the recipe", [IDef_RareIngredients, IDef_Lore], [IDef_MagicPotion, IDef_Drugs])








/*
Notes

Introductory summary - a main quest contains a string describing what the villain/challenge is up to and why the part would want to defeat them

At the start of each new session, search through parents recursively until you find a a task with a main quest parent, and find the item being given, and announce it as the goal of this Session


Boss - secret villain. requires:
evidence of wrongdoing
powerful ally
defeat henchmen

A bandit king ravages the countryside
A necromancer unleashes a plague upon the populate
A corrupt baron taxes the peasantry to starvation
A dragon claims a province of its own
An usurper seizes the thrown and begins a reign of terror
A corrupted druid causes an uprising 
A sinister advisor misleads the king into ruin
A cult is abducting and murdering people in order to resurrect a dead God 

chase sequence
opera
enchanting music
curse of sleep upon kingdom
psychadelic

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
    generateOutput = "";
    GenerateSiteNames();

    //writeln("Generating Campaign!");
    currentCampaign = new Campaign(5);

    //writeln("Playing Campaign!");
    currentCampaignPlayer = new CampaignPlayer();
    currentCampaignPlayer.PlayCampaign(currentCampaign);

    //writeln("Campaign Complete!");
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