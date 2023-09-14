let input = document.getElementById("input");
let searchBtn = document.getElementById("search");
let notFound = document.getElementById("notFound");
let notFoundtext = document.getElementById("notFoundText");
let loading = document.getElementById("loading");
let wordBox = document.getElementById("wordsAndMeaning");
let meaning = document.getElementById("meaning");
/* To display or hide the search box */
document.getElementById("formWrap").style.display = "none";
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
    if (finalTranscript != "") {
      var date22 = new Date().getTime();
      var diff = (date22 - date11) / 1000;
      console.log("Parsing time '" + finalTranscript + "': " + diff);
      const date1 = new Date().getTime();
      getData(finalTranscript);
      const date2 = new Date().getTime();
      var difference = (date2 - date1) / 1000;
      console.log("Search time'" + finalTranscript + "': " + difference);
      finalTranscript = "";
    }
  };
  speechRecognition.start();
} else {
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
  switch(character[0]){
    case "standard":
      myChapter=Esv;
      character=character.slice(1);
      break;
    case "niv":
      myChapter=Niv;
      character=character.slice(1);
      break;
    case "nkjv":
      myChapter=Nkjv;
      character=character.slice(1);
      break;
    case "amplified":
      myChapter=Amplified;
      character=character.slice(1);
      break;
    case "kjv":
      myChapter=Kingjames;
      character=character.slice(1);
      break;
    case "msg":
      myChapter=msg;
      character=character.slice(1);
      break;  
    default:
      myChapter=Kingjames;
  };

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

  if (character[0]=="song" && character[1]=="of" && character[2]=="solomon") {
    character = character.slice(2);
  }
  console.log(character);
  console.log(myBook);
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
        verse == "verse" &&
        character.length == 5
      ) {
        return (data = bible[chapterNo][verseNo]);
      } else if (
        chapter == "chapter" &&
        chapterNo <= noOfChapters &&
        character.length == 3
      ) {
        var fromindex=-1;
        //var chap=bible[chapterNo].filter((verseText,index,array)=>array.indexOf(verseText)===index)
        bible[chapterNo].forEach(function (verseText, index) {     
          var nextIndex = index+1;
          if(verseText!=(bible[chapterNo][(nextIndex)])){
            if(fromindex>0){
              data = data + "<br>" + fromindex+"-"+nextIndex+ " " + verseText;
            }
            else{
              data = data + "<br>" + (nextIndex )+ " " + verseText;
            }
            fromindex=-1;
        
          }else{
            if(fromindex==-1){
              fromindex=index+1;

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
  chapterNameCode=0;
  chapterCode = 0;
  verseCode = 0;
  if (noBooks == 0) {
    var versionName=["Amplified","Esv","Kjv","Niv","Nkjv","Msg"];
    var myversion=[Amplified,Esv,Kingjames,Niv,Nkjv,msg];
    function checkBooks(bible) {
      var input = word.toLowerCase().trim();
      for(k=0;k<bible.length;k++){
        version=bible[k];
      for (i = 0; i < version.length; i++) {
        chapter = bible[k][i];
        for (j = 0; j < chapter.length; j++) {
          var bibleLines = bible[k][i][j].toLowerCase();
          if (bibleLines.search(input) >= 0) {
            result = bible[k][i][j];
            chapterNameCode=k;
            chapterCode = i;
            verseCode = j;
            data = result;
            return bibleLines.search(input) >= 0;
          };
        };
      };
    };
    };
   
    var versionNameCode = myversion.findIndex(checkBooks);
    if (versionNameCode < 0) {
      data = 0;
    } else {
      word =
        versionName[versionNameCode] +
        "  " +
        chapterName[k]+" "+
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
  if (!data.length) {
    loading.style.display = "none";
    notFound.style.display = "block";
    notFoundtext.innerText = word + ".";
    return;
  };
  let words = document.createElement("span");
  let meanging = document.createElement("span");
  let br = document.createElement("br");
  let wordMeaningBox = document.createElement("div");
  words.classList.add("suggested");
  meanging.classList.add("meaning");
  words.innerHTML = word.toUpperCase();
  meanging.innerHTML = data;
  loading.style.display = "none";
  wordMeaningBox.appendChild(words);
  wordMeaningBox.appendChild(br);
  wordMeaningBox.appendChild(meanging);
  wordBox.insertBefore(wordMeaningBox, wordBox.firstChild);
};
