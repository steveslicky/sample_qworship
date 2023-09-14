const versions = [
    "Amplified Version - AMP", "Message Version - MSG",
    "King James Version - KJV", "New King James Version - NKJV",
    "Standard Bible Version - STAN", "New International Version - NIV"
];

const books = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
    "First Samuel", "Second Samuel", "First Kings", "Second Kings", "First Chronicles", "Second Chronicles",
    "Ezra", "Nehemiah", "Esther", "Job", "Psalm", "Proverbs", "Ecclesiastes", "Song of Solomon",
    "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah",
    "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark",
    "Luke", "John", "Acts", "Romans", "First Corinthians", "Second Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "First Thessalonians", "Second Thessalonians", "First Timothy", "Second Timothy",
    "Titus", "Philemon", "Hebrews", "James", "First Peter", "Second Peter", "First John", "Second John", "Third John",
    "Jude", "Revelation"
];

// bloodhound will create the typeahead instance for version and passed to the versionsDefaults function for defaults suggestions
// this default function will act as the soucre for the typeahead suggestions
var versionsBloodhound = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: versions
});
function versionsDefaults(q, sync) {
    if (q === '') {
        sync(versionsBloodhound.get("Amplified Version - AMP", "Message Version - MSG",
            "King James Version - KJV", "New King James Version - NKJV",
            "Standard Bible Version - STAN", "New International Version - NIV"));
    }

    else {
        versionsBloodhound.search(q, sync);
    }
}

// bloodhound will create the typeahead instance for book and passed to the booksDefaults function for defaults suggestions
// this default function will act as the soucre for the typeahead suggestions
var booksBloodhound = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: books
});
function booksDefaults(q, sync) {
    if (q === '') {
        sync(booksBloodhound.get("Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
            "First Samuel", "Second Samuel", "First Kings", "Second Kings", "First Chronicles", "Second Chronicles",
            "Ezra", "Nehemiah", "Esther", "Job", "Psalm", "Proverbs", "Ecclesiastes", "Song of Solomon",
            "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah",
            "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark",
            "Luke", "John", "Acts", "Romans", "First Corinthians", "Second Corinthians", "Galatians", "Ephesians",
            "Philippians", "Colossians", "First Thessalonians", "Second Thessalonians", "First Timothy", "Second Timothy",
            "Titus", "Philemon", "Hebrews", "James", "First Peter", "Second Peter", "First John", "Second John", "Third John",
            "Jude", "Revelation"));
    }

    else {
        booksBloodhound.search(q, sync);
    }
}

// utility function to check the input is a number or not
const isNumber = (number) => {
    return /^-?\d+$/.test(number);
}

// typeahead for versions
$('#scrollable-dropdown-menu-version .typeahead').typeahead({
    minLength: 0,
    highlight: true
}, {
    name: 'versions',
    limit: 6,
    source: versionsDefaults
});

// typeahead for books
$('#scrollable-dropdown-menu-book .typeahead').typeahead({
    minLength: 0,
    highlight: true
}, {
    name: 'books',
    limit: 66,
    source: booksDefaults
});

// on select version
$('#typeahead-version').bind('typeahead:select', function (ev, suggestion) {
    clearInputs("version");
    getBookValue() == "" && $('#typeahead-book').focus();
});

// on select book
$('#typeahead-book').bind('typeahead:select', function (ev, suggestion) {
    clearInputs("book");
    fetchAndPopulateChapters();
    $('#typeahead-chapter').focus();
});

// on select chapter
$('#typeahead-chapter').bind('typeahead:select', function (ev, suggestion) {
    clearInputs("chapter");
    fetchAndPopulateVerse();
    fetchVerseAndDisplay();
    $('#typeahead-verse').focus();
});

// on select verse
$('#typeahead-verse').bind('typeahead:select', function (ev, suggestion) {
    fetchVerseAndDisplay();
});

// get value functions
const getVersionValue = () => $('#typeahead-version').val();
const getBookValue = () => $('#typeahead-book').val();
const getChapterValue = () => $('#typeahead-chapter').val();
const getVerseValue = () => $('#typeahead-verse').val();

// clear function
function clearInputs(input) {
    const versionInputValue = getVersionValue();
    const bookInputValue = getBookValue();
    const chapterInputValue = getChapterValue();
    const verseInputValue = getVerseValue() || undefined;
    switch (input) {
        case "version":
            if (bookInputValue != "" && chapterInputValue != "" && versionInputValue != "") {
                // if the user try to change the version only
                searchBibleFunction(versionInputValue, bookInputValue, chapterInputValue, verseInputValue)
            }
            else {
                $('#typeahead-book').removeClass("d-none");

                $('#typeahead-book').typeahead('val', "");
                $('#typeahead-chapter').typeahead('val', "");
                $('#typeahead-verse').typeahead('val', "");

                $('#typeahead-chapter').addClass("d-none");
                $('#typeahead-verse').addClass("d-none");
            }
            break;

        case "book":
            $('#typeahead-chapter').removeClass("d-none");

            $('#typeahead-chapter').typeahead('val', "");
            $('#typeahead-verse').typeahead('val', "");

            $('#typeahead-verse').addClass("d-none");
            $('#typeahead-chapter').typeahead('destroy');
            break;

        case "chapter":
            $('#typeahead-verse').removeClass("d-none");

            $('#typeahead-verse').typeahead('val', "");

            $('#typeahead-verse').typeahead('destroy');
            break;
    }
}

// fetch and populate chapters dropdown
function fetchAndPopulateChapters() {
    var versionSelected = getVersionValue();
    var bookSelected = getBookValue();

    switch (versionSelected) {
        case "Amplified Version - AMP":
            createChaptersList(Amplified[books.indexOf(bookSelected)].length);
            break;
        case "Message Version - MSG":
            createChaptersList(msg[books.indexOf(bookSelected)].length);
            break;
        case "King James Version - KJV":
            createChaptersList(Kingjames[books.indexOf(bookSelected)].length);
            break;
        case "New King James Version - NKJV":
            createChaptersList(Nkjv[books.indexOf(bookSelected)].length);
            break;
        case "Standard Bible Version - STAN":
            createChaptersList(Esv[books.indexOf(bookSelected)].length);
            break;
        case "New International Version - NIV":
            createChaptersList(Niv[books.indexOf(bookSelected)].length);
            break;
    }

    function createChaptersList(chapters) {
        const chaptersArray = Array(chapters).fill().map((v, i) => i + 1);
        var substringMatcher = function (strs) {
            return function findMatches(q, cb) {
                var matches, substringRegex;

                // an array that will be populated with substring matches
                matches = [];

                // regex used to determine if a string contains the substring `q`
                substrRegex = new RegExp(q, 'i');

                // iterate through the pool of strings and for any string that
                // contains the substring `q`, add it to the `matches` array
                $.each(strs, function (i, str) {
                    if (substrRegex.test(str)) {
                        matches.push(str);
                    }
                });

                cb(matches);
            };
        };
        $('#scrollable-dropdown-menu-chapter .typeahead').typeahead({
            minLength: 0,
            highlight: true
        }, {
            name: 'chaoters',
            limit: 150,
            source: substringMatcher(chaptersArray)
        });
    }
}

// fetch and populate verse dropdown
function fetchAndPopulateVerse() {
    var versionSelected = getVersionValue();
    var bookSelected = getBookValue();
    var chapterSelected = getChapterValue();

    switch (versionSelected) {
        case "Amplified Version - AMP":
            createVerseList(Amplified[books.indexOf(bookSelected)][chapterSelected - 1].length);
            break;
        case "Message Version - MSG":
            createVerseList(msg[books.indexOf(bookSelected)][chapterSelected - 1].length);
            break;
        case "King James Version - KJV":
            createVerseList(Kingjames[books.indexOf(bookSelected)][chapterSelected - 1].length);
            break;
        case "New King James Version - NKJV":
            createVerseList(Nkjv[books.indexOf(bookSelected)][chapterSelected - 1].length);
            break;
        case "Standard Bible Version - STAN":
            createVerseList(Esv[books.indexOf(bookSelected)][chapterSelected - 1].length);
            break;
        case "New International Version - NIV":
            createVerseList(Niv[books.indexOf(bookSelected)][chapterSelected - 1].length);
            break;
    }

    function createVerseList(verse) {
        const versesArray = Array(verse).fill().map((v, i) => i + 1);
        var substringMatcher = function (strs) {
            return function findMatches(q, cb) {
                var matches, substringRegex;

                // an array that will be populated with substring matches
                matches = [];

                // regex used to determine if a string contains the substring `q`
                substrRegex = new RegExp(q, 'i');

                // iterate through the pool of strings and for any string that
                // contains the substring `q`, add it to the `matches` array
                $.each(strs, function (i, str) {
                    if (substrRegex.test(str)) {
                        matches.push(str);
                    }
                });

                cb(matches);
            };
        };
        $('#scrollable-dropdown-menu-verse .typeahead').typeahead({
            minLength: 0,
            highlight: true
        }, {
            name: 'verses',
            limit: 176,
            source: substringMatcher(versesArray)
        });
    }
}

// look for change in the verse input
function fetchVerseAndDisplay() {
    const versionInputValue = getVersionValue();
    const bookInputValue = getBookValue();
    const chapterInputValue = getChapterValue();
    const verseInputValue = getVerseValue() || undefined;
    versionInputValue && bookInputValue && chapterInputValue && searchBibleFunction(versionInputValue, bookInputValue, chapterInputValue, verseInputValue);
}

// search bible function
function searchBibleFunction(version, book, chapter = 1, verses) {
    // default state
    var searchCommand, result, noResult = false;
    // find version array
    var versionForCommand = version.split("-")[0].trim();
    var versionForSearch;
    switch (version) {
        case "Amplified Version - AMP":
            versionForSearch = Amplified
            break;
        case "Message Version - MSG":
            versionForSearch = msg
            break;
        case "King James Version - KJV":
            versionForSearch = Kingjames
            break;
        case "New King James Version - NKJV":
            versionForSearch = Nkjv
            break;
        case "Standard Bible Version - STAN":
            versionForSearch = Esv
            break;
        case "New International Version - NIV":
            versionForSearch = Niv
            break;
    }
    // find book index
    var bookIndex = books.indexOf(book)
    if (bookIndex == "-1") {
        noResult = true
    }
    // chapter index
    var chapterIndex = chapter - 1
    // type check 
    const isBookIndexNumber = isNumber(bookIndex);
    const isChapterIndexNumber = isNumber(chapterIndex);
    const versionIndex = versions.indexOf(version);
    const isVersionIndexNumber = isNumber(versionIndex);
    // dom elements
    let words = document.createElement("span");
    let meaning = document.createElement("span");
    let br = document.createElement("br");
    let wordMeaningBox = document.createElement("div");
    let wordBox = document.getElementById("wordsAndMeaning");

    let createPrevChapterControll = document.createElement("i");
    createPrevChapterControll.classList.add("bi", "bi-skip-backward-circle", "d-none", "controllIcons");
    createPrevChapterControll.id = "prevChapter";
    createPrevChapterControll.title = "Previous Chapter";

    let createPrevVerseControll = document.createElement("i");
    createPrevVerseControll.classList.add("bi", "bi-skip-start-circle", "d-none", "controllIcons");
    createPrevVerseControll.id = "prevVerse";
    createPrevVerseControll.title = "Previous Verse";

    let createNextVerseControll = document.createElement("i");
    createNextVerseControll.classList.add("bi", "bi-skip-end-circle", "d-none", "controllIcons");
    createNextVerseControll.id = "nextVerse";
    createNextVerseControll.title = "Next Verse";

    let createNextChapterControll = document.createElement("i");
    createNextChapterControll.classList.add("bi", "bi-skip-forward-circle", "d-none", "controllIcons");
    createNextChapterControll.id = "nextChapter";
    createNextChapterControll.title = "Next Chapter";

    words.classList.add("suggested");
    meaning.classList.add("meaning");
    function hideAllControlls() {
        // hide all controlls
        const prevChapterControll = document.getElementById("prevChapter") || undefined;
        const prevVerseControll = document.getElementById("prevVerse") || undefined;
        const nextVerseControll = document.getElementById("nextVerse") || undefined;
        const nextChapterControll = document.getElementById("nextChapter") || undefined;

        prevChapterControll && prevChapterControll.classList.add("d-none");
        prevVerseControll && prevVerseControll.classList.add("d-none");
        nextVerseControll && nextVerseControll.classList.add("d-none");
        nextChapterControll && nextChapterControll.classList.add("d-none");
    }
    // controlls
    function setupAndDisplayControlls() {
        hideAllControlls()
        if (isBookIndexNumber && isChapterIndexNumber && bookIndex != "-1" && chapterIndex != "-1") {
            // function to test the next case is feasble or not
            function checkCaseFeasibility(chapterToTest, startVerse, endVerse) {
                if (chapterToTest) {
                    if (!startVerse && !endVerse) {
                        return chapterToTest
                    }
                    else if (startVerse && endVerse) {
                        if (startVerse == endVerse) {
                            return chapterToTest.length >= startVerse && chapterToTest[startVerse]
                        }
                        else if (startVerse != endVerse) {
                            return chapterToTest.length >= endVerse && chapterToTest.slice(startVerse - 1, endVerse)
                        }
                        else {
                            return undefined
                        }
                    }
                    else {
                        return undefined
                    }
                }
                else {
                    return undefined
                }
            }
            // hide all controlls
            const prevChapterControll = document.getElementById("prevChapter") || undefined;
            const prevVerseControll = document.getElementById("prevVerse") || undefined;
            const nextVerseControll = document.getElementById("nextVerse") || undefined;
            const nextChapterControll = document.getElementById("nextChapter") || undefined;
            // values
            const versesArray = (verses && verses.split("-")) || undefined
            const startVerse = versesArray ? versesArray[0] : undefined
            const endVerse = versesArray ? versesArray[versesArray.length - 1] : undefined
            const nextChapterWithVerse = checkCaseFeasibility(versionForSearch[bookIndex][chapterIndex + 1], startVerse, endVerse) || undefined
            const prevChapterWithVerse = checkCaseFeasibility(versionForSearch[bookIndex][chapterIndex - 1], startVerse, endVerse) || undefined
            const nextChapter = nextChapterWithVerse || undefined
            const prevChapter = prevChapterWithVerse || undefined
            const prevVerse = (startVerse && versionForSearch[bookIndex][chapterIndex][startVerse - 2]) || undefined
            const nextVerse = (endVerse && versionForSearch[bookIndex][chapterIndex][endVerse]) || undefined
            // check for prev chapter, prev verse, next verse, next chapter
            if (prevChapter && prevChapterControll) {
                prevChapterControll.classList.remove("d-none")
                prevChapterControll.onclick = () => {
                    searchBibleFunction(version, book, Number(chapter) - 1, verses)
                }
            }
            if (nextChapter && nextChapterControll) {
                nextChapterControll.classList.remove("d-none")
                nextChapterControll.onclick = () => {
                    searchBibleFunction(version, book, Number(chapter) + 1, verses)
                }
            }
            if (prevVerse && prevVerseControll) {
                prevVerseControll.classList.remove("d-none")
                prevVerseControll.onclick = () => {
                    searchBibleFunction(version, book, chapter, String(Number(startVerse) - 1))
                }
            }
            if (nextVerse && nextVerseControll) {
                nextVerseControll.classList.remove("d-none")
                nextVerseControll.onclick = () => {
                    searchBibleFunction(version, book, chapter, String(Number(endVerse) + 1))
                }
            }
        }
    }
    // hide notFound and loading
    function hideNotFoundLoading() {
        document.getElementById("notFound").style.display = "none";
        document.getElementById("loading").style.display = "none";
        wordBox.innerHTML = ""
        ///setupAndDisplayControlls();
    }
    if (isVersionIndexNumber && versionIndex != "-1") {
        if (verses) {
            if (verses.includes("-")) {
                if (isBookIndexNumber && isChapterIndexNumber && bookIndex != "-1" && chapterIndex != "-1") {
                    // search for range
                    searchCommand = `${versionForCommand} ${book} chapter ${chapter} verses ${verses}`
                    const chapterData = versionForSearch[bookIndex][chapterIndex]
                    // verify and check verses range
                    const startRange = verses.split("-")[0];
                    const lastRange = verses.split("-")[1];
                    const isStartNumber = isNumber(startRange) && startRange != "0"
                    const isLastNumber = isNumber(lastRange);
                    if (isStartNumber && isLastNumber && startRange < lastRange && chapterData.length >= startRange) {
                        const versesData = chapterData.slice(startRange - 1, lastRange)
                        const versesResult = versesData.reduce((c, v, i) => {
                            return `${c} <br> <span class="index"> ${Number(startRange) + i} </span> ${v}`
                        }, ``)
                        // dom manipulation
                        hideNotFoundLoading();
                        words.innerHTML = searchCommand.toUpperCase();
                        meaning.innerHTML = versesResult;
                        wordMeaningBox.appendChild(createPrevChapterControll);
                        wordMeaningBox.appendChild(createPrevVerseControll);
                        wordMeaningBox.appendChild(words);
                        wordMeaningBox.appendChild(createNextVerseControll);
                        wordMeaningBox.appendChild(createNextChapterControll);
                        wordMeaningBox.appendChild(br);
                        wordMeaningBox.appendChild(meaning);
                        wordBox.insertBefore(wordMeaningBox, wordBox.firstChild);
                        setupAndDisplayControlls();
                    }
                    else {
                        noResult = true;
                    }
                }
                else {
                    noResult = true;
                }
            }
            else {
                const isVerse = isNumber(verses) && verses != "0"
                if (isBookIndexNumber && isChapterIndexNumber && bookIndex != "-1" && chapterIndex != "-1" && isVerse) {
                    // search for verse
                    searchCommand = `${versionForCommand} ${book} chapter ${chapter} verse ${verses}`;
                    result = versionForSearch[bookIndex][chapterIndex][verses - 1];
                    if (result) {
                        noResult = false;
                    }
                    else {
                        noResult = true;
                    }
                    // dom manipulation
                    hideNotFoundLoading();
                    words.innerHTML = searchCommand.toUpperCase();
                    meaning.innerHTML = result;
                    wordMeaningBox.appendChild(createPrevChapterControll);
                    wordMeaningBox.appendChild(createPrevVerseControll);
                    wordMeaningBox.appendChild(words);
                    wordMeaningBox.appendChild(createNextVerseControll);
                    wordMeaningBox.appendChild(createNextChapterControll);
                    wordMeaningBox.appendChild(br);
                    wordMeaningBox.appendChild(meaning);
                    wordBox.insertBefore(wordMeaningBox, wordBox.firstChild);
                    setupAndDisplayControlls();
                }
                else {
                    noResult = true;
                }
            }
        }
        else {
            if (isBookIndexNumber && isChapterIndexNumber && bookIndex != "-1") {
                // search for chapter
                searchCommand = `${versionForCommand} ${book} chapter ${chapter}`;
                result = versionForSearch[bookIndex][chapterIndex];
                if (result) {
                    noResult = false;
                    const chapterResult = result.reduce((c, v, i) => {
                        return `${c} <br> <span class="index"> ${1 + i} </span> ${v}`
                    }, ``)
                    // dom manipulation
                    hideNotFoundLoading();
                    words.innerHTML = searchCommand.toUpperCase();
                    meaning.innerHTML = chapterResult;
                    wordMeaningBox.appendChild(createPrevChapterControll);
                    wordMeaningBox.appendChild(createPrevVerseControll);
                    wordMeaningBox.appendChild(words);
                    wordMeaningBox.appendChild(createNextVerseControll);
                    wordMeaningBox.appendChild(createNextChapterControll);
                    wordMeaningBox.appendChild(br);
                    wordMeaningBox.appendChild(meaning);
                    wordBox.insertBefore(wordMeaningBox, wordBox.firstChild);
                    setupAndDisplayControlls();
                }
                else {
                    noResult = true;
                }
            }
            else {
                noResult = true;
            }
        }
    }
    else {
        noResult = true;
    }
    if (noResult) {
        const versionInputValue = version || getVersionValue() || undefined;
        const bookInputValue = book || getBookValue() || undefined;
        const chapterInputValue = chapter || getChapterValue() || undefined;
        const verseInputValue = verses || getVerseValue() || undefined;

        let versionCommand = versionInputValue ? versionInputValue : ""
        let bookCommand = bookInputValue ? bookInputValue : ""
        let chapterCommand = chapterInputValue ? `chapter ${chapterInputValue}` : ""
        let verseCommand;
        if (verseInputValue) {
            if (verseInputValue.includes("-")) {
                verseCommand = `verses ${verseInputValue}`
            }
            else {
                verseCommand = `verse ${verseInputValue}`
            }
        }
        else {
            verseCommand = ""
        }
        searchCommand = `${versionCommand} ${bookCommand} ${chapterCommand} ${verseCommand}`
        document.getElementById("notFound").style.display = "block";
        document.getElementById("loading").style.display = "none";
        wordBox.innerHTML = ""
        document.getElementById("notFoundText").innerHTML = searchCommand.trim()
    }
}

// onchange event for verse input field
$('#typeahead-verse').change(fetchVerseAndDisplay);

// onchange event for chapter input field
$('#typeahead-chapter').change(fetchVerseAndDisplay);

// onchange event for book input field
$('#typeahead-book').change(fetchVerseAndDisplay);

// onchange event for version input field
$('#typeahead-version').change(fetchVerseAndDisplay);