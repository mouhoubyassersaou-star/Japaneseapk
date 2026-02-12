let data;
let lastLesson = localStorage.getItem('lastLesson') || 0;
document.getElementById('progress').innerText = "آخر درس مفتوح: " + lastLesson;

fetch("data.json")
.then(res => res.json())
.then(json => data = json);

function showSection(section){
  let html = "";
  if(!data) return;

  if(section === "letters"){
    data.letters.forEach(l=>{
      html += `<div class="card">
      <h2>${l.jp}</h2>
      <p>Romaji: ${l.romaji}</p>
      <p>العربية: ${l.ar}</p>
      <p>مثال: ${l.example}</p>
      </div>`;
    });
  }

  if(section === "words"){
    data.words.forEach(w=>{
      html += `<div class="card">
      <h3>${w.jp}</h3>
      <p>Romaji: ${w.romaji}</p>
      <p>العربية: ${w.ar}</p>
      </div>`;
    });
  }

  if(section === "grammar"){
    data.grammar.forEach(g=>{
      html += `<div class="card">
      <h3>${g.title}</h3>
      <p>مثال: ${g.example}</p>
      <p>شرح: ${g.explain}</p>
      </div>`;
    });
  }

  if(section === "lessons"){
    data.lessons.forEach(l=>{
      html += `<div class="card">
      <h3>درس ${l.id}: ${l.title}</h3>
      <p>${l.content}</p>
      </div>`;
      lastLesson = l.id;
      localStorage.setItem('lastLesson', lastLesson);
      document.getElementById('progress').innerText = "آخر درس مفتوح: " + lastLesson;
    });
  }

  if(section === "quiz"){
    html = `<div class="card">
    ❓ ما معنى 水 ؟<br><br>
    <button onclick="alert('خطأ')">نار</button>
    <button onclick="alert('صحيح')">ماء</button>
    <button onclick="alert('خطأ')">هواء</button>
    </div>`;
  }

  document.getElementById("content").innerHTML = html;
}

function searchLessons(term){
  if(!data) return;
  let html = "";

  term = term.toLowerCase();

  // بحث في الكلمات
  data.words.forEach(w=>{
    if(w.jp.includes(term) || w.ar.includes(term) || w.romaji.includes(term)){
      html += `<div class="card">
      <h3>${w.jp}</h3>
      <p>Romaji: ${w.romaji}</p>
      <p>العربية: ${w.ar}</p>
      </div>`;
    }
  });

  // بحث في الحروف
  data.letters.forEach(l=>{
    if(l.jp.includes(term) || l.ar.includes(term) || l.romaji.includes(term)){
      html += `<div class="card">
      <h2>${l.jp}</h2>
      <p>Romaji: ${l.romaji}</p>
      <p>العربية: ${l.ar}</p>
      <p>مثال: ${l.example}</p>
      </div>`;
    }
  });

  document.getElementById("content").innerHTML = html || "لا توجد نتائج";
}