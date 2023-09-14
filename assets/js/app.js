let input = document.getElementById("input");
let searchBtn = document.getElementById("search");
let notFound = document.getElementById("notFound");
let notFoundtext = document.getElementById("notFoundText");
let loading = document.getElementById("loading");
let wordBox = document.getElementById("wordsAndMeaning");
let meaning = document.getElementById("meaning");
let manual = document.getElementById("manual");
/* To display or hide the search box */
//document.getElementById("formWrap").style.display = "none";
notFound.style.display = "none";
if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.onresult = (event) => {
        let finalTranscript = "";
        loading.style.display = "block";
        wordBox.innerText = "";
        notFound.style.display = "none";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            var date11 = new Date().getTime();
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            }
        }
        console.log("final transcript: " + finalTranscript);
        LOGGER && fetch(`${API_URL}?query=${finalTranscript.trim()}&app=eWorship&level=info`, { mode: 'no-cors' });
        if (finalTranscript != "") {
            var date22 = new Date().getTime();
            var diff = (date22 - date11) / 1000;
            // console.log("Parsing time '" + finalTranscript + "': " + diff);
            const date1 = new Date().getTime();
            getData(finalTranscript);
            const date2 = new Date().getTime();
            var difference = (date2 - date1) / 1000;
            //console.log("Search time'" + finalTranscript + "': " + difference);
            finalTranscript = "";
        }
    };
    speechRecognition.start();
    // speechRecognition.onend = () => speechRecognition.start();
} else {
    manual.classList.remove("d-none")
    console.log("Speech Recognition Not Available");
}

searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    notFound.style.display = "none";
    let word = input.value;
    if (word === "") {
        alert("Word is required");
        return;
    }
    var wordTosearch = "";
    wordTosearch = word;
    getData(wordTosearch);
});

async function getData(word) {
    wordBox.innerHTML = "";
    loading.style.display = "block";
    var data = "";
    var myBook = "";
    var myWord = word.toLowerCase().trim();
    var character = myWord.split(" ").filter((words) => words.trim().length > 0);

    //convert colon to chapter and verse
    function converColonToWords() {
        for (let i in character) {
            let pattern = /:/;
            let isColonExists = pattern.test(character[i]);
            if (isColonExists) {
                let colonWord = character[i];
                let indexOfColon = colonWord.indexOf(":");
                let newTranscript = "chapter " + colonWord.slice(0, indexOfColon) + " verse " + colonWord.slice(indexOfColon + 1);
                let newTranscriptArray = newTranscript.split(" ");
                let beforeColonWord = character.slice(0, i);
                let afterIndex = (Number(i) + 1);
                let afterColonWord = character.slice(afterIndex);
                character = beforeColonWord.concat(newTranscriptArray, afterColonWord);
            }
        }
    }
    converColonToWords();

    //convert vs to verse
    function convertVsToVerse() {
        for (let i in character) {
            if (character[i] == "vs" || character[i] == "VS") {
                character[i] = "verse"
            }
        }
    }
    convertVsToVerse();

    //remove commas
    function removeCommas() {
        for (let i in character) {
            character[i] = character[i].replace(/,/g, "");
        }
        character = character.filter(function (el) {
            return el != "";
        });
    }
    removeCommas();

    //remove dots
    function removeDots() {
        for (let i in character) {
            character[i] = character[i].replace(/\./g, "");
        }
        character = character.filter(function (el) {
            return el != "";
        });
    }
    removeDots();

    //change numbers in words to int
    function changeWordsToNumber() {
        for (let i in character) {
            switch (character[i]) {
                case "one":
                    character[i] = '1';
                    break;
                case "two":
                    character[i] = '2';
                    break;
                case "three":
                    character[i] = '3';
                    break;
                case "four":
                    character[i] = '4';
                    break;
                case "five":
                    character[i] = '5';
                    break;
                case "six":
                    character[i] = '6';
                    break;
                case "seven":
                    character[i] = '7';
                    break;
                case "eight":
                    character[i] = '8';
                    break;
                case "nine":
                    character[i] = '9';
                    break;
            }
        }
    };
    changeWordsToNumber();

    //correction for variations
    function correctionForVariation() {
        var characterString = character.join(" ")
        characterString = characterString.replace(/ephesians|efisians|Efishens|Efeshens|Efishance|Efficient|Efficience\b/gi, "ephesians")
        characterString = characterString.replace(/nehemiah|Nehimiah|Nehimia|Nehemaya|Nehimaya|Ne hi Maya|nehemia|Nahin Miya/gi, "nehemiah")
        characterString = characterString.replace(/psalms\b/gi, "psalm")
        characterString = characterString.replace(/psalm|sam's|some|Salms|Salm|Sams|Sam\b/gi, "psalm")
        characterString = characterString.replace(/proverbs|Proverb|Provabs/gi, "proverbs")
        characterString = characterString.replace(/Ecclesiastics/gi, "ecclesiastes")
        characterString = characterString.replace(/ecclesiastes|Ecclesiastis|Ecclesiasticus|Ecclisiastis|Ecclesiastic/gi, "ecclesiastes")
        characterString = characterString.replace(/Hezekiah/gi, "isaiah")
        characterString = characterString.replace(/isaiah|Isaya|Isia|Izaya|Hezaya|Hezia|Izia/gi, "isaiah")
        characterString = characterString.replace(/Hoosier|Hosier|Josiah/gi, "hosea")
        characterString = characterString.replace(/hosea|Hozia|Hosia/gi, "hosea")
        characterString = characterString.replace(/Juwel|Jowel|Jewel|Jwel/gi, "joel")
        characterString = characterString.replace(/amos|Emos/gi, "amos")
        characterString = characterString.replace(/obadiah|Obidaya|Obidia|Obedaya|Obedia/gi, "obadiah")
        characterString = characterString.replace(/micah|Mica|Myca/gi, "micah")
        characterString = characterString.replace(/nahum|Nahom|Naehom|Naehum/gi, "nahum")
        characterString = characterString.replace(/habakkuk|Habakok|Habakuk|Haebakuk|Haebakok|Havoc/gi, "habakkuk")
        characterString = characterString.replace(/zephaniah|Zafania|Zefanaya|Zefinaya/gi, "zephaniah")
        characterString = characterString.replace(/haggai|Hagi|Haegai|Haegi|Hegai|Hegi|hey guys|Hey guy/gi, "haggai")
        characterString = characterString.replace(/zechariah|Zakaraya|Zakariya|Zakaria|Zechariya|Zachariah/gi, "zechariah")
        characterString = characterString.replace(/malachi|Malakai/gi, "malachi")
        characterString = characterString.replace(/corinthians|Corintians/gi, "corinthians")
        characterString = characterString.replace(/galatians|Galeshians|Galeshans|Galeashians|Galashians/gi, "galatians")
        characterString = characterString.replace(/colossians|Coloshans|Coloshians/gi, "colossians")
        characterString = characterString.replace(/test loan ians|test loan in|Tehsil onions/gi, "thessalonians") 
        characterString = characterString.replace(/thessalonians|Tesalonians|Thesalonians|Teselonians|Theselonnians|Theselonians/gi, "thessalonians")
        characterString = characterString.replace(/timothy|Timoty/gi, "timothy")
        characterString = characterString.replace(/hebrews|Hibrus|Hebrew/gi, "hebrews")
        characterString = characterString.replace(/ezra|asra/gi, "ezra")
        characterString = characterString.replace(/philemon|Phylum on/gi, "philemon")
        characterString = characterString.replace(/Acts of the Apostles|Arts of the Apostles|At of the Apostles|Art of the Apostles/gi, "acts")
        characterString = characterString.replace(/Peete/gi, "peter")
        character = characterString.split(" ")
    }
    correctionForVariation()

    // change "to" to 2 if allowed keywords preceds
    function correctionForTo() {
        let lastNameArray = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth', 'samuel', 'kings', 'chronicles', 'ezra', 'nehemiah', 'esther', 'job', 'psalm', 'proverbs', 'ecclesiastes', 'solomon', 'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi', 'matthew', 'mark', 'luke', 'john', 'acts', 'romans', 'corinthians', 'corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', 'thessalonians', 'thessalonians', 'timothy', 'timothy', 'titus', 'philemon', 'hebrews', 'james', 'peter', 'peter', 'john', 'john', 'john', 'jude', 'revelation', 'verse', 'chapter'];
        character = character.map((d,i) => {
            if(d == "to"){
                if(lastNameArray.findIndex((e) => e == character[i-1]) != "-1"){
                    return "2"
                }
                else{
                    return d
                }
            }
            else {
                return d
            }
        })
    }
    correctionForTo();

    //add chapter or verse if missing after book name
    function addChapterOrVerse() {
        let isChapterWordAvailable = character.indexOf("chapter");
        if (isChapterWordAvailable == "-1") {
            let lastNameArray = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth', 'samuel', 'kings', 'chronicles', 'ezra', 'nehemiah', 'esther', 'job', 'psalm', 'proverbs', 'ecclesiastes', 'solomon', 'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi', 'matthew', 'mark', 'luke', 'john', 'acts', 'romans', 'corinthians', 'corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', 'thessalonians', 'thessalonians', 'timothy', 'timothy', 'titus', 'philemon', 'hebrews', 'james', 'peter', 'peter', 'john', 'john', 'john', 'jude', 'revelation'];
            for (let i in character) {
                lastNameArray.forEach((v) => {
                    if (v == character[i]) {
                        let lastNameNextPosition = Number(i) + 1;
                        if (Number(character[lastNameNextPosition]) > 0 && !isNaN(character[lastNameNextPosition])) {
                            character.splice(lastNameNextPosition, 0, "chapter")
                            if (character[lastNameNextPosition + 2]) {
                                if (Number(character[lastNameNextPosition + 2]) > 0 && !isNaN(character[lastNameNextPosition + 2])) {
                                    character.splice(lastNameNextPosition + 2, 0, "verse")
                                }
                            }
                        }
                    }
                });
            }
        }
        let isVerseWordAvailable = character.indexOf("verse");
        if (isChapterWordAvailable != "-1" && isVerseWordAvailable == "-1") {
            let chapterWordIndex = Number(isChapterWordAvailable);
            if (character[chapterWordIndex + 2]) {
                if (Number(character[chapterWordIndex + 2]) > 0 && !isNaN(character[chapterWordIndex + 2])) {
                    character.splice(chapterWordIndex + 2, 0, "verse")
                }
            }
        }
    }
    addChapterOrVerse();


    // switch function accordingly for "show me", "let see"
    function switchFunctions() {
        let allowedKeywords = ['first', 'second', 'third', '1st', '2nd', '3rd', 'song',
            'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth',
            'samuel', 'kings', 'chronicles', 'ezra', 'nehemiah', 'esther', 'job', 'psalm', 'proverbs',
            'ecclesiastes', 'solomon', 'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea',
            'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah',
            'malachi', 'matthew', 'mark', 'luke', 'john', 'acts', 'romans', 'corinthians', 'galatians', 'ephesians',
            'philippians', 'colossians', 'thessalonians', 'timothy', 'titus', 'philemon', 'hebrews', 'james', 'peter',
            'jude', 'revelation', 'chapter', 'standard', 'amplified', 'message', 'kjv', 'niv', 'nkjv', 'msg', 'esv', 'new', 'king'];

        if (character[0] == "show" && character[1] == "me") {
            if (character[2] == "verse") {
                checkKeywordsAvailablility();
            }
            else if (allowedKeywords.includes(character[2])) {
                character = character.filter((a) => {
                    if (a == "in" || a == "the") {
                        return false
                    }
                    else {
                        return true
                    }
                })
                filterWordsBeforeBookName()
            }
        }
        else if ((character[0] == "lets" || character[0] == "let's") && character[1] == "see") {
            if (character[2] == "verse") {
                checkKeywordsAvailablility();
            }
            else if (allowedKeywords.includes(character[2])) {
                filterWordsBeforeBookName()
            }
        }
        else if ((character[0] == "lets" || character[0] == "let's") && character[1] == "go" && character[2] == "to") {
            if (character[3] == "verse") {
                checkKeywordsAvailablility();
            }
            else if (allowedKeywords.includes(character[3])) {
                filterWordsBeforeBookName()
            }
        }
        else if (character[0] == "take" && character[1] == "me" && character[2] == "to") {
            if (character[3] == "verse") {
                checkKeywordsAvailablility();
            }
            else if (allowedKeywords.includes(character[3])) {
                filterWordsBeforeBookName()
            }
        }
        else if (character[0] == "bring" && character[1] == "up" && character[2] == "to") {
            if (character[3] == "verse") {
                checkKeywordsAvailablility();
            }
            else if (allowedKeywords.includes(character[3])) {
                filterWordsBeforeBookName()
            }
        }
    }
    switchFunctions();

    // check whether the command has a book, chapter and verse to run "show me verse 4"
    function checkKeywordsAvailablility() {
        let allowedKeywords = ['first', 'second', 'third', '1st', '2nd', '3rd', 'song',
            'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth',
            'samuel', 'kings', 'chronicles', 'ezra', 'nehemiah', 'esther', 'job', 'psalm', 'proverbs',
            'ecclesiastes', 'solomon', 'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea',
            'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah',
            'malachi', 'matthew', 'mark', 'luke', 'john', 'acts', 'romans', 'corinthians', 'galatians', 'ephesians',
            'philippians', 'colossians', 'thessalonians', 'timothy', 'titus', 'philemon', 'hebrews', 'james', 'peter',
            'jude', 'revelation', 'chapter', 'standard', 'amplified', 'message', 'kjv', 'niv', 'nkjv', 'msg', 'esv', 'new', 'king'];
        //check whether there was an earlier search or not?
        let earlierSearchWords = sessionStorage.getItem("character");
        if (earlierSearchWords) {
            let originalLenghtNewSearch = character.length;
            let newSearchTerm = character;
            let removedIndices = 0;
            let verseWordIndexOfNewSearch = newSearchTerm.indexOf("verse");
            let verseNumberIndexOfNewSearch = Number(verseWordIndexOfNewSearch) + 1;
            if ((/^\d+$/.test(newSearchTerm[verseNumberIndexOfNewSearch])) && verseWordIndexOfNewSearch != "-1") {
                for (i = 0; i < originalLenghtNewSearch; i++) {
                    //if the first name reaches, stop the loop
                    if (allowedKeywords.includes(newSearchTerm[Number(i) - removedIndices])) {
                        break;
                    }
                    //if the word is verse proceed further in reconstructing the new characters array
                    else if (newSearchTerm[Number(i) - removedIndices] == "verse") {
                        //check whether the verse number is a valid number
                        if (/^\d+$/.test(character[Number(i) + 1 - removedIndices])) {
                            //get the previous search array and proceed
                            let previousSearchArray = sessionStorage.getItem("characterArray");
                            if (previousSearchArray) {
                                previousSearchArray = previousSearchArray.split(",")
                                let verseWordIndexOfPreviousSearch = previousSearchArray.indexOf("verse");
                                let verseNumberIndexOfPreviousSearch = Number(verseWordIndexOfPreviousSearch) + 1;
                                verseWordIndexOfNewSearch = newSearchTerm.indexOf("verse");
                                verseNumberIndexOfNewSearch = Number(verseWordIndexOfNewSearch) + 1;
                                if (verseWordIndexOfPreviousSearch != "-1" && previousSearchArray[verseNumberIndexOfPreviousSearch]) {
                                    if (/^\d+$/.test(newSearchTerm[verseNumberIndexOfNewSearch])) {
                                        let newCharacterArray = previousSearchArray;
                                        newCharacterArray[verseNumberIndexOfPreviousSearch] = newSearchTerm[verseNumberIndexOfNewSearch]
                                        let previousVersion = sessionStorage.getItem("previousVersion");
                                        if (previousVersion && !(newCharacterArray.includes("version"))) {
                                            newCharacterArray.splice(0, 0, previousVersion);
                                            character = newCharacterArray;
                                        }
                                        else {
                                            character = newCharacterArray;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //continue trimming the newSearchTerm array.
                    else {
                        newSearchTerm.splice(Number(i) - removedIndices, 1);
                        removedIndices++;
                    }
                }
            }
        }
    }

    //bible version checking and sorting
    function findVersion() {
        let versionWordPosition = character.indexOf("version");
        if (versionWordPosition == "-1") {
            for (let i = 0; i < character.length; i++) {
                if (character[i] == "standard") {
                    myChapter = Esv;
                    character.splice(i, 1);
                    sessionStorage.setItem("previousVersion", "standard")
                    break;
                }
                else if (character[i] == "amplified") {
                    myChapter = Amplified;
                    character.splice(i, 1);
                    sessionStorage.setItem("previousVersion", "amplified")
                    break;
                }
                else if (character[i] == "kjv") {
                    myChapter = Kingjames;
                    character.splice(i, 1);
                    sessionStorage.setItem("previousVersion", "kjv")
                    break;
                }
                else if (character[i] == "niv") {
                    myChapter = Niv;
                    character.splice(i, 1);
                    sessionStorage.setItem("previousVersion", "niv")
                    break;
                }
                else if (character[i] == "nkjv") {
                    myChapter = Nkjv;
                    character.splice(i, 1);
                    sessionStorage.setItem("previousVersion", "nkjv")
                    break;
                }
                else if (character[i] == "msg") {
                    myChapter = msg;
                    character.splice(i, 1);
                    sessionStorage.setItem("previousVersion", "msg")
                    break;
                }
                else if (character[i] == "message") {
                    myChapter = msg;
                    character.splice(i, 1);
                    sessionStorage.setItem("previousVersion", "msg")
                    break;
                }
                else if (character[i] == "esv") {
                    myChapter = Esv;
                    character.splice(i, 1);
                    sessionStorage.setItem("previousVersion", "esv")
                    break;
                }
                else {
                    myChapter = Kingjames;
                    sessionStorage.setItem("previousVersion", "kjv")
                }
            }
        }
        else {
            if (character[versionWordPosition - 1] == "standard") {
                myChapter = Esv;
                character.splice(versionWordPosition - 1, 2);
                sessionStorage.setItem("previousVersion", "standard")
            }
            else if (character[versionWordPosition - 1] == "amplified") {
                myChapter = Amplified;
                character.splice(versionWordPosition - 1, 2);
                sessionStorage.setItem("previousVersion", "amplified")
            }
            else if (character[versionWordPosition - 1] == "message") {
                myChapter = msg;
                character.splice(versionWordPosition - 1, 2);
                sessionStorage.setItem("previousVersion", "msg")
            }
            else if (character[versionWordPosition - 1] == "kjv") {
                myChapter = Kingjames;
                character.splice(versionWordPosition - 1, 2);
                sessionStorage.setItem("previousVersion", "kjv")
            }
            else if (character[versionWordPosition - 1] == "niv") {
                myChapter = Niv;
                character.splice(versionWordPosition - 1, 2);
                sessionStorage.setItem("previousVersion", "niv")
            }
            else if (character[versionWordPosition - 1] == "nkjv") {
                myChapter = Nkjv;
                character.splice(versionWordPosition - 1, 2);
                sessionStorage.setItem("previousVersion", "nkjv")
            }
            else if (character[versionWordPosition - 1] == "msg") {
                myChapter = msg;
                character.splice(versionWordPosition - 1, 2);
                sessionStorage.setItem("previousVersion", "msg")
            }
            else if (character[versionWordPosition - 1] == "esv") {
                myChapter = Esv;
                character.splice(versionWordPosition - 1, 2);
                sessionStorage.setItem("previousVersion", "esv")
            }
            else if (character[versionWordPosition - 1] == "james" && character[versionWordPosition - 2] == "king" && character[versionWordPosition - 3] == "new") {
                myChapter = Nkjv;
                character.splice(versionWordPosition - 3, 4);
                sessionStorage.setItem("previousVersion", "nkjv")
            }
            else if (character[versionWordPosition - 1] == "james" && character[versionWordPosition - 2] == "king") {
                myChapter = Kingjames;
                character.splice(versionWordPosition - 2, 3);
                sessionStorage.setItem("previousVersion", "kjv")
            }
            else if (character[versionWordPosition - 1] == "bible" && character[versionWordPosition - 2] == "message") {
                myChapter = msg;
                character.splice(versionWordPosition - 2, 3);
                sessionStorage.setItem("previousVersion", "msg")
            }
            else if (character[versionWordPosition - 1] == "international" && character[versionWordPosition - 2] == "new") {
                myChapter = Niv;
                character.splice(versionWordPosition - 2, 3);
                sessionStorage.setItem("previousVersion", "niv")
            }
        }
    }
    findVersion();

    //remove the word chapter if appears twice
    function removeDuplicateChapterWord() {
        let chapterWordCount = 0;
        for (let i in character) {
            if (character[i] == "chapter") {
                chapterWordCount++;
                if (chapterWordCount >= 2) {
                    character.splice(i, 1);
                }
            }
        }
    }
    removeDuplicateChapterWord();


    //filter words before book name
    function filterWordsBeforeBookName() {
        let removedIndices = 0;
        let initalLength = character.length;
        for (i = 0; i < initalLength; i++) {
            let allowedFirstName = ['first', 'second', 'third', '1st', '2nd', '3rd', 'song', 'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth', 'samuel', 'kings', 'chronicles', 'ezra', 'nehemiah', 'esther', 'job', 'psalm', 'proverbs', 'ecclesiastes', 'solomon', 'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi', 'matthew', 'mark', 'luke', 'john', 'acts', 'romans', 'corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', 'thessalonians', 'timothy', 'titus', 'philemon', 'hebrews', 'james', 'peter', 'jude', 'revelation'];
            //if the first name reaches, stop the loop
            if (allowedFirstName.includes(character[Number(i) - removedIndices])) {
                break;
            }
            //if the word is verse skip the loop
            else if (character[Number(i) - removedIndices] == "verse") {
                continue;
            }
            //if the word is a numeric literal also skip the loop
            else if (/^\d+$/.test(character[Number(i) - removedIndices])) {
                continue;
            }
            //continue trimming the character array.
            else {
                character.splice(Number(i) - removedIndices, 1);
                removedIndices++;
            }
        }
    }


    var titleForResult = character;
    var firstString = character[0];
    var secondString = character[1];
    if (typeof secondString == "string") {
        var content = secondString.match(
            /^(samuel|kings|corinthians|chronicles|thessalonians|timothy|peter|john)$/
        );
    }
    if ((firstString == "first" || firstString == "1st") && content) {
        myBook = "first" + secondString;
        character = character.slice(1);
    } else if ((firstString == "second" || firstString == "2nd") && content) {
        myBook = "second" + secondString;
        character = character.slice(1);
    } else if ((firstString == "third" || firstString == "3rd") && content) {
        myBook = "third" + secondString;
        character = character.slice(1);
    } else {
        myBook = character[0];
    }

    if (character[0] == "song" && character[1] == "of" && character[2] == "solomon") {
        character = character.slice(2);
    }

    var chapterName = [
        "Genesis",
        "Exodus",
        "Leviticus",
        "Numbers",
        "Deuteronomy",
        "Joshua",
        "Judges",
        "Ruth",
        "First samuel",
        "Second samuel",
        "First kings",
        "Second kings",
        "First chronicles",
        "Second chronicles",
        "Ezra",
        "Nehemiah",
        "Esther",
        "Job",
        "Psalm",
        "Proverbs",
        "Ecclesiastes",
        "Song of Solomon",
        "Isaiah",
        "Jeremiah",
        "Lamentations",
        "Ezekiel",
        "Daniel",
        "Hosea",
        "Joel",
        "Amos",
        "Obadiah",
        "Jonah",
        "Micah",
        "Nahum",
        "Habakkuk",
        "Zephaniah",
        "Haggai",
        "Zechariah",
        "Malachi",
        "Matthew",
        "Mark",
        "Luke",
        "John",
        "Acts",
        "Romans",
        "First Corinthians",
        "Second Corinthians",
        "Galatians",
        "Ephesians",
        "Philippians",
        "Colossians",
        "First Thessalonians",
        "Second Thessalonians",
        "First Timothy",
        "Second Timothy",
        "Titus",
        "Philemon",
        "Hebrews",
        "James",
        "First Peter",
        "Second Peter",
        "First John",
        "Second John",
        "Third John",
        "Jude",
        "Revelation",
    ];
    function firstCase(bible) {
        var chapter = character[1];
        var chapterNo = character[2] - 1;
        var verse = character[3];
        var verseNo = character[4] - 1;
        var noOfChapters = bible.length - 1;
        if (chapterNo >= 0 && character.length != 0) {
            if (
                chapterNo <= noOfChapters &&
                verseNo <= 200 &&
                chapter == "chapter" &&
                (verse == "vs" || verse == "verse") &&
                character.length == 5
            ) {
                return (data = bible[chapterNo][verseNo]);
            } else if (
                chapter == "chapter" &&
                chapterNo <= noOfChapters &&
                character.length == 3
            ) {
                var fromindex = -1;
                //var chap=bible[chapterNo].filter((verseText,index,array)=>array.indexOf(verseText)===index)
                bible[chapterNo].forEach(function (verseText, index) {
                    var nextIndex = index + 1;
                    if (verseText != (bible[chapterNo][(nextIndex)])) {
                        if (fromindex > 0) {
                            data = data + "<br>" + fromindex + "-" + nextIndex + " " + verseText;
                        }
                        else {
                            data = data + "<br>" + "<span class='index'>" + (nextIndex) + "</span> " + verseText;
                        }
                        fromindex = -1;

                    } else {
                        if (fromindex == -1) {
                            fromindex = index + 1;

                        }

                    }


                });
                return data;
            }
        } else {
            return (data = 0);
        };
    };

    if (character.length != 0) {
        switch (myBook) {
            case "genesis":
                firstCase(myChapter[0]);
                break;
            case "exodus":
                firstCase(myChapter[1]);
                break;
            case "leviticus":
                firstCase(myChapter[2]);
                break;
            case "numbers":
                firstCase(myChapter[3]);
                break;
            case "deuteronomy":
                firstCase(myChapter[4]);
                break;
            case "joshua":
                firstCase(myChapter[5]);
                break;
            case "judges":
                firstCase(myChapter[6]);
                break;
            case "ruth":
                firstCase(myChapter[7]);
                break;
            case "firstsamuel":
                firstCase(myChapter[8]);
                break;
            case "secondsamuel":
                firstCase(myChapter[9]);
                break;
            case "firstkings":
                firstCase(myChapter[10]);
                break;
            case "secondkings":
                firstCase(myChapter[11]);
                break;
            case "firstchronicles":
                firstCase(myChapter[12]);
                break;
            case "secondchronicles":
                firstCase(myChapter[13]);
                break;
            case "ezra":
                firstCase(myChapter[14]);
                break;
            case "nehemiah":
                firstCase(myChapter[15]);
                break;
            case "esther":
                firstCase(myChapter[16]);
                break;
            case "job":
                firstCase(myChapter[17]);
                break;
            case "psalm":
                firstCase(myChapter[18]);
                break;
            case "proverbs":
                firstCase(myChapter[19]);
                break;
            case "ecclesiastes":
                firstCase(myChapter[20]);
                break;
            case "song":
                firstCase(myChapter[21]);
                break;
            case "isaiah":
                firstCase(myChapter[22]);
                break;
            case "jeremiah":
                firstCase(myChapter[23]);
                break;
            case "lamentations":
                firstCase(myChapter[24]);
                break;
            case "ezekiel":
                firstCase(myChapter[25]);
                break;
            case "daniel":
                firstCase(myChapter[26]);
                break;
            case "hosea":
                firstCase(myChapter[27]);
                break;
            case "joel":
                firstCase(myChapter[28]);
                break;
            case "amos":
                firstCase(myChapter[29]);
                break;
            case "obadiah":
                firstCase(myChapter[30]);
                break;
            case "jonah":
                firstCase(myChapter[31]);
                break;
            case "micah":
                firstCase(myChapter[32]);
                break;
            case "nahum":
                firstCase(myChapter[33]);
                break;
            case "habakkuk":
                firstCase(myChapter[34]);
                break;
            case "zephaniah":
                firstCase(myChapter[35]);
                break;
            case "haggai":
                firstCase(myChapter[36]);
                break;
            case "zechariah":
                firstCase(myChapter[37]);
                break;
            case "malachi":
                firstCase(myChapter[38]);
                break;
            case "matthew":
                firstCase(myChapter[39]);
                break;
            case "mark":
                firstCase(myChapter[40]);
                break;
            case "luke":
                firstCase(myChapter[41]);
                break;
            case "john":
                firstCase(myChapter[42]);
                break;
            case "acts":
                firstCase(myChapter[43]);
                break;
            case "romans":
                firstCase(myChapter[44]);
                break;
            case "firstcorinthians":
                firstCase(myChapter[45]);
                break;
            case "secondcorinthians":
                firstCase(myChapter[46]);
                break;
            case "galatians":
                firstCase(myChapter[47]);
                break;
            case "ephesians":
                firstCase(myChapter[48]);
                break;
            case "philippians":
                firstCase(myChapter[49]);
                break;
            case "colossians":
                firstCase(myChapter[50]);
                break;
            case "firstthessalonians":
                firstCase(myChapter[51]);
                break;
            case "secondthessalonians":
                firstCase(myChapter[52]);
                break;
            case "firsttimothy":
                firstCase(myChapter[53]);
                break;
            case "secondtimothy":
                firstCase(myChapter[54]);
                break;
            case "titus":
                firstCase(myChapter[55]);
                break;
            case "philemon":
                firstCase(myChapter[56]);
                break;
            case "hebrews":
                firstCase(myChapter[57]);
                break;
            case "james":
                firstCase(myChapter[58]);
                break;
            case "firstpeter":
                firstCase(myChapter[59]);
                break;
            case "secondpeter":
                firstCase(myChapter[60]);
                break;
            case "firstjohn":
                firstCase(myChapter[61]);
                break;
            case "secondjohn":
                firstCase(myChapter[62]);
                break;
            case "thirdjohn":
                firstCase(myChapter[63]);
                break;
            case "jude":
                firstCase(myChapter[64]);
                break;
            case "revelation":
                firstCase(myChapter[65]);
                break;
            default:
                var noBooks = 0;
        };
    };


    result = "";
    chapterNameCode = 0;
    chapterCode = 0;
    verseCode = 0;
    // reverse search. 
    if (noBooks == 0) {
        var versionName = ["Amplified", "Esv", "Kjv", "Niv", "Nkjv", "Msg"];
        var myversion = [Amplified, Esv, Kingjames, Niv, Nkjv, msg];
        function checkBooks(bible, versionIndex) {
            var input = word.toLowerCase().trim();
            for (k = 0; k < bible.length; k++) {
                version = bible[k];
                for (i = 0; i < version.length; i++) {
                    chapter = bible[k][i];
                    for (j = 0; j < chapter.length; j++) {
                        var bibleLines = bible[k][i][j].toLowerCase();
                        if (bibleLines.search(input) >= 0) {
                            result = bible[k][i][j];
                            chapterNameCode = k;
                            chapterCode = i;
                            verseCode = j;
                            data = result;
                            // title is reworked for the reverse search result
                            titleForResult = `${chapterName[chapterNameCode]} chapter ${chapterCode + 1} verse ${verseCode + 1}`
                            titleForResult = titleForResult.split(" ")
                            return bibleLines.search(input) >= 0;
                        };
                    };
                };
            };
        };

        var versionNameCode = myversion.findIndex(checkBooks);
        if (versionNameCode == "-1") {
            data = 0;
        } else {
            sessionStorage.setItem("previousVersion", versionName[versionNameCode].toLowerCase());
            word =
                versionName[versionNameCode] +
                "  " +
                chapterName[k] + " " +
                "chapter " +
                (chapterCode + 1) +
                "  " +
                "verse " +
                (verseCode + 1);
        };
    };

    if ((result.length == 0 && noBooks == 0) || data == undefined) {
        data = 0;
    };

    // no results found
    if (!data.length) {
        loading.style.display = "none";
        notFound.style.display = "block";
        notFoundtext.innerText = word + ".";
        manual.classList.remove("d-none");
        LOGGER && fetch(`${API_URL}?query=${word.trim()}&app=eWorship&level=warn`, { mode: 'no-cors' });
        return false;
    }
    else {
        manual.classList.add("d-none")
    }

    // display results
    let words = document.createElement("span");
    let meanging = document.createElement("span");
    let br = document.createElement("br");
    let wordMeaningBox = document.createElement("div");
    words.classList.add("suggested");
    meanging.classList.add("meaning");
    word = word.trim();

    //baptise the commands for UI
    let arrayForBaptising = titleForResult;
    let versionNameForHeading = sessionStorage.getItem("previousVersion");
    if (versionNameForHeading) {
        switch (versionNameForHeading) {
            case "standard":
                arrayForBaptising.splice(arrayForBaptising.length, 0, "standard", "version");
                break;
            case "amplified":
                arrayForBaptising.splice(arrayForBaptising.length, 0, "amplified", "version");
                break;
            case "kjv":
                arrayForBaptising.splice(arrayForBaptising.length, 0, "king", "james", "version");
                break;
            case "nkjv":
                arrayForBaptising.splice(arrayForBaptising.length, 0, "new", "king", "james", "version");
                break;
            case "msg":
                arrayForBaptising.splice(arrayForBaptising.length, 0, "message", "version");
                break;
            case "niv":
                arrayForBaptising.splice(arrayForBaptising.length, 0, "new", "international", "version");
                break;
            case "esv":
                arrayForBaptising.splice(arrayForBaptising.length, 0, "standard", "version");
                break;
        }
    }
    arrayForBaptising = arrayForBaptising.toString().replaceAll(",", " ");
    arrayForBaptising = arrayForBaptising.toUpperCase();
    words.innerHTML = arrayForBaptising
    meanging.innerHTML = data;

    //set characterArray is local sessionStorage
    if (data) {
        sessionStorage.setItem("characterArray", titleForResult);
    }
    loading.style.display = "none";
    wordMeaningBox.appendChild(words);
    wordMeaningBox.appendChild(br);
    wordMeaningBox.appendChild(meanging);
    wordBox.insertBefore(wordMeaningBox, wordBox.firstChild);

    //save data in the sessionStorage
    sessionStorage.setItem("character", word);
};
