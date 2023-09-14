require("../books/amplified")
require("../books/kingjames")


async function getData(word) {
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
        characterString = characterString.replace(/nehemiah|Nehimiah|Nehimia|Nehemaya|Nehimaya/gi, "nehemiah")
        characterString = characterString.replace(/psalm|Salms|Salm|Sams|Sam\b/gi, "psalm")
        characterString = characterString.replace(/proverbs|Proverb|Provabs/gi, "proverbs")
        characterString = characterString.replace(/ecclesiastes|Ecclesiastis|Ecclesiasticus|Ecclisiastis|Ecclesiastic/gi, "ecclesiastes")
        characterString = characterString.replace(/isaiah|Isaya|Isia|Izaya|Hezaya|Hezia|Izia/gi, "isaiah")
        characterString = characterString.replace(/hosea|Hozia|Hosia/gi, "hosea")
        characterString = characterString.replace(/Juwel|Jowel|Jwel/gi, "joel")
        characterString = characterString.replace(/amos|Emos/gi, "amos")
        characterString = characterString.replace(/obadiah|Obidaya|Obidia|Obedaya|Obedia/gi, "obadiah")
        characterString = characterString.replace(/micah|Mica|Myca/gi, "micah")
        characterString = characterString.replace(/nahum|Nahom|Naehom|Naehum/gi, "nahum")
        characterString = characterString.replace(/habakkuk|Habakok|Habakuk|Haebakuk|Haebakok/gi, "habakkuk")
        characterString = characterString.replace(/zephaniah|Zafania|Zefanaya|Zefinaya/gi, "zephaniah")
        characterString = characterString.replace(/haggai|Hagi|Haegai|Haegi|Hegai|Hegi/gi, "haggai")
        characterString = characterString.replace(/zechariah|Zakaraya|Zakariya|Zakaria|Zechariya|Zachariah/gi, "zechariah")
        characterString = characterString.replace(/malachi|Malakai/gi, "malachi")
        characterString = characterString.replace(/corinthians|Corintians/gi, "corinthians")
        characterString = characterString.replace(/galatians|Galeshians|Galeshans|Galeashians|Galashians/gi, "galatians")
        characterString = characterString.replace(/colossians|Coloshans|Coloshians/gi, "colossians")
        characterString = characterString.replace(/thessalonians|Tesalonians|Thesalonians|Teselonians|Theselonnians|Theselonians/gi, "thessalonians")
        characterString = characterString.replace(/timothy|Timoty/gi, "timothy")
        characterString = characterString.replace(/hebrews|Hibrus|Hebrew/gi, "hebrews")
        characterString = characterString.replace(/Acts of the Apostles|Arts of the Apostles|At of the Apostles|Art of the Apostles/gi, "acts")
        character = characterString.split(" ")
    }
    correctionForVariation()

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
                filterWordsBeforeBookName()
            }
        }
        else if (character[0] == "lets" && character[1] == "see") {
            if (allowedKeywords.includes(character[2])) {
                filterWordsBeforeBookName()
            }
        }
    }
    switchFunctions()

    //bible version checking and sorting
    function findVersion() {
        let versionWordPosition = character.indexOf("version");
        if (versionWordPosition == "-1") {
            for (let i = 0; i < character.length; i++) {
                if (character[i] == "standard") {
                    myChapter = Esv;
                    character.splice(i, 1);
                    break;
                }
                else if (character[i] == "amplified") {
                    myChapter = Amplified;
                    character.splice(i, 1);
                    break;
                }
                else if (character[i] == "kjv") {
                    myChapter = Kingjames;
                    character.splice(i, 1);
                    break;
                }
                else if (character[i] == "niv") {
                    myChapter = Niv;
                    character.splice(i, 1);
                    break;
                }
                else if (character[i] == "nkjv") {
                    myChapter = Nkjv;
                    character.splice(i, 1);
                    break;
                }
                else if (character[i] == "msg") {
                    myChapter = msg;
                    character.splice(i, 1);
                    break;
                }
                else if (character[i] == "esv") {
                    myChapter = Esv;
                    character.splice(i, 1);
                    break;
                }
                else {
                    myChapter = Kingjames;
                }
            }
        }
        else {
            if (character[versionWordPosition - 1] == "standard") {
                myChapter = Esv;
                character.splice(versionWordPosition - 1, 2);
            }
            else if (character[versionWordPosition - 1] == "amplified") {
                myChapter = Amplified;
                character.splice(versionWordPosition - 1, 2);
            }
            else if (character[versionWordPosition - 1] == "message") {
                myChapter = msg;
                character.splice(versionWordPosition - 1, 2);
            }
            else if (character[versionWordPosition - 1] == "kjv") {
                myChapter = Kingjames;
                character.splice(versionWordPosition - 1, 2);
            }
            else if (character[versionWordPosition - 1] == "niv") {
                myChapter = Niv;
                character.splice(versionWordPosition - 1, 2);
            }
            else if (character[versionWordPosition - 1] == "nkjv") {
                myChapter = Nkjv;
                character.splice(versionWordPosition - 1, 2);
            }
            else if (character[versionWordPosition - 1] == "msg") {
                myChapter = msg;
                character.splice(versionWordPosition - 1, 2);
            }
            else if (character[versionWordPosition - 1] == "esv") {
                myChapter = Esv;
                character.splice(versionWordPosition - 1, 2);
            }
            else if (character[versionWordPosition - 1] == "james" && character[versionWordPosition - 2] == "king" && character[versionWordPosition - 3] == "new") {
                myChapter = Nkjv;
                character.splice(versionWordPosition - 3, 4);
            }
            else if (character[versionWordPosition - 1] == "james" && character[versionWordPosition - 2] == "king") {
                myChapter = Kingjames;
                character.splice(versionWordPosition - 2, 3);
            }
            else if (character[versionWordPosition - 1] == "bible" && character[versionWordPosition - 2] == "message") {
                myChapter = msg;
                character.splice(versionWordPosition - 2, 3);
            }
            else if (character[versionWordPosition - 1] == "international" && character[versionWordPosition - 2] == "new") {
                myChapter = Niv;
                character.splice(versionWordPosition - 2, 3);
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

    //filter words after the word verse
    function filterWordsAfterVerse() {
        let indexOfWordVerse = character.indexOf("verse");
        if (character.length > Number(indexOfWordVerse) + 2 && indexOfWordVerse != "-1") {
            let indicesAfterVerseNumber = character.length - 2 - Number(indexOfWordVerse);
            if (indicesAfterVerseNumber) {
                character.splice(Number(indexOfWordVerse) + 2, indicesAfterVerseNumber);
            }
        }
    }
    //filterWordsAfterVerse();

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
    //filterWordsBeforeBookName();

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
    var smallChapterName = chapterName.map(a => a.toLowerCase())

    const chapterWordPosition = character.indexOf("chapter")
    const verseWordPosition = character.indexOf("verse")
    const verseNumber = character[verseWordPosition + 1] - 1
    const chapterNumber = character[chapterWordPosition + 1] - 1
    const bookName = character.slice(0, chapterWordPosition).join(" ")
    const bookIndex = smallChapterName.indexOf(bookName)
    if (character.includes("verse")) {
        try {
            const result = Amplified[bookIndex][chapterNumber][verseNumber]
            return result ? true : false
        }
        catch (e) {
            return false
        }
    }
    else {
        try {
            const result = Amplified[bookIndex][chapterNumber]
            return result ? true : false
        }
        catch (e) {
            return false
        }
    }

};

const tests = [
    "first john 1:1", "genesis 4", "John 3:16 King James Version",
    "John Chapter 3 verse 16 King James Version", "John Chapter 3 16 King James Version",
    "John 3 verse 16 King James Version", "show me John 3:16 in the King James Version",
    "Lets see John chapter 3 verse 16", "Genesis 1:1", "Exodus 1:1", "Leviticus 1", "Numbers 1:1",
    "Deuteronomy 1", "Joshua 1:1", "Judges 1:1", "Ruth 1:1", "First samuel 1", "Second samuel 1:1", "First kings 1:1",
    "Second kings 1:1", "First chronicles 1", "Second chronicles 1:1", "Ezra 1:1", "Nehemiah 1:1", "Esther 1:1", "Job 1:1",
    "Psalm 1:1", "Proverbs 1:1", "Ecclesiastes 1:1", "Song of Solomon 1", "Isaiah 1:1", "Jeremiah 1:1", "Lamentations 1",
    "Ezekiel 1:1", "Daniel 1:1", "Hosea 1", "Joel 1:1", "Amos 1:1", "Jonah 1", "Micah 1:1", "Nahum 1", "Habakkuk 1:1",
    "Zephaniah 1:1", "Haggai 1", "Zechariah 1:1", "Malachi 1", "Matthew 1:1", "Mark 1:1", "Luke 1:1", "John 1:1", "Acts 1:1",
    "Romans 1:1", "First Corinthians 1:1", "Second Corinthians 1:1", "Galatians 1:1", "Ephesians 1:1", "Philippians 1:1", "Colossians 1",
    "First Thessalonians 1:1", "Second Thessalonians 1:1", "First Timothy 1:1", "Second Timothy 1", "Titus 1:1", "Philemon 1:1",
    "Hebrews 1", "James 1:1", "First Peter 1", "Second Peter 1:1", "First John 1:1",
    "Second John 1:1", "Third John 1", "Jude 1:1", "Revelation 1", "Obadiah 1", "Nehemiah 1:1", "Nehimiah 1:1",
    "Nehimia 1:1", "Nehemaya 1:1", "Nehimaya 1:1", "Sam 1:1", "Sams 1:1", "Salms 1", "Salm 1:1", "Proverb 1:1",
    "Provabs 1:1", "Proverbs 1:1", "Ecclesiastis 1:1", "Ecclesiasticus 1:1", "Ecclisiastis 1", "Ecclesiastic 1:1",
    "Isaya 1:1", "Isia 1:1", "Izaya 1:1", "Hezaya 1", "Hezia 1:1", "Izia 1:1", "Hozia 1", "Hosia 1:1", "Juwel 1:1",
    "Jowel 1:1", "Jwel 1:1", "Emos 1:1", "Obidaya 1:1", "Obidia 1:1", "Obedaya 1", "Obedia 1:1", "Mica 1", "Myca 1:1",
    "Nahom 1:1", "Naehom 1:1", "Naehum 1:1", "Habakok 1:1", "Habakuk 1:1", "Haebakuk 1:1", "Haebakok 1:1", "Zafania 1:1",
    "Zefanaya 1:1", "Zefinaya 1:1", "Hagi 1:1", "Haegai 1:1", "Haegi 1:1", "Hegai 1:1", "Hegi 1:1", "Zakaraya 1:1",
    "Zakariya 1:1", "Zakaria 1:1", "Zechariya 1:1", "Zachariah 1:1", "Malakai 1:1", "Acts of the Apostles 1",
    "Arts of the Apostles 1:1", "At of the Apostles 1", "Art of the Apostles 1", "First Corintians 1:1",
    "Second Corintians 1:1", "Galeshians 1:1", "Galeshans 1:1", "Galeashians 1:1", "Galashians 1:1",
    "Efishens 1:1", "Efisians 1:1", "Efeshens 1", "Efishance 1:1", "Efficient 1:1", "Efficience 1:1",
    "Coloshans 1:1", "Coloshians 1:1", "First Tesalonians 1:1", "First Thesalonians 1:1", "First Teselonians 1:1",
    "First Theselonnians 1", "Second Tesalonians 1:1", "Second Thesalonians 1", "Second Teselonians 1",
    "Second Theselonians 1", "First Timoty 1", "Second Timoty 1:1", "Hibrus 1:1", "Hebrew 1", "show me luke 4", "lets see john 4:2"
]

/* tests.forEach(async (element) => {
    const result = await getData(element)
    if (result) {
        console.log("test passed")
    }
    else {
        console.log("test failed: " + element, result)
    }
}); */

var largestChapter = 0;
var largestVerse = 0;
var largestChapterIndex = 0;
Amplified.forEach((book, i) => {
    book.forEach((chapter,j) => {
        largestChapterIndex = chapter.length > largestVerse ? j : largestChapterIndex
        largestVerse = chapter.length > largestVerse ? chapter.length : largestVerse
        largestChapter = book.length > largestChapter ? book.length : largestChapter
    })
})
console.log(largestChapter)
console.log(largestChapterIndex)
console.log(largestVerse)