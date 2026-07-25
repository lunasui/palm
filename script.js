const palmImage = document.getElementById('palmImage');
const preview = document.getElementById('preview');
const uploadPrompt = document.getElementById('uploadPrompt');
const agree = document.getElementById('agree');
const startBtn = document.getElementById('startBtn');
const uploadCard = document.getElementById('uploadCard');
const loadingCard = document.getElementById('loadingCard');
const resultCard = document.getElementById('resultCard');
const retryBtn = document.getElementById('retryBtn');
const loadingText = document.getElementById('loadingText');
const demoBtn = document.getElementById('demoBtn');

let selectedFile = null;
let currentReading = null;

const readings = [
  {
    name: '穏やかな積み上げ型',
    summary: '急いで答えを出すより、納得できる形を少しずつ築いていく傾向があります。',
    traits: ['慎重', '継続力', '安心重視'],
    love: ['恋愛では、信頼を確かめながら距離を縮める傾向があります。言葉より日々の行動で愛情を示すことも多そうです。', '大切なことを決めるとき、あなたとパートナーでは考える速さに違いがありますか？'],
    work: ['仕事では、経験を重ねるほど力を発揮しやすいタイプです。急な方針変更より、見通しのある進め方で安心して力を出せます。', '仕事や家庭の予定を決めるとき、二人はどのくらい先まで相談していますか？'],
    money: ['お金は一度に大きく動かすより、無理のない範囲で守り育てたい傾向があります。', '貯めることと楽しむことについて、二人の優先順位は近いですか？'],
    strength: ['あなたの強みは、決めたことを投げ出さず、現実的な形へ整えていけることです。', '夫婦の中で、あなたが自然に支えていることは何でしょう？'],
    message: 'あなたのペースは弱さではなく、暮らしを安定させる力です。'
  },
  {
    name: '直感で道を開く挑戦型',
    summary: '心が動いた瞬間を大切にし、新しい可能性へ一歩踏み出せる傾向があります。',
    traits: ['行動力', '好奇心', '決断が早い'],
    love: ['恋愛では気持ちが動くと素直に行動しやすく、関係にも新鮮さを求める傾向があります。', '二人のうち、新しい提案を先にするのはどちらですか？'],
    work: ['変化のある仕事や、自分で工夫できる環境で力を出しやすいタイプです。', '挑戦したいことを、パートナーにどの段階で話していますか？'],
    money: ['経験や成長につながるものには、思い切ってお金を使える傾向があります。', '使う前に相談したい金額について、二人で基準を決めていますか？'],
    strength: ['あなたの強みは、止まっている空気を動かし、最初の一歩を作れることです。', '夫婦の未来に、今取り入れたい新しいことはありますか？'],
    message: 'あなたのひらめきは、二人の未来を動かすきっかけになります。'
  },
  {
    name: '深く考える探究型',
    summary: '表面だけで判断せず、理由や背景まで理解したい気持ちが強い傾向があります。',
    traits: ['分析力', '集中力', '本質重視'],
    love: ['恋愛では、軽い言葉よりも本音や一貫した態度を重視する傾向があります。', '二人は気持ちの理由まで話し合えていますか？'],
    work: ['一つの分野を深く掘り下げる仕事や、専門性を磨く環境と相性がよさそうです。', '仕事へのこだわりを、家庭ではどのように共有していますか？'],
    money: ['納得できる価値があるかを調べてからお金を使う傾向があります。', '大きな買い物の判断材料を、二人で共有していますか？'],
    strength: ['あなたの強みは、見過ごされやすい大切な点に気づけることです。', '最近、相手の言葉の奥にある気持ちを聞いたことはありますか？'],
    message: '深く考える力は、二人の理解を一段深める力にもなります。'
  },
  {
    name: 'しなやかな調整型',
    summary: '状況や相手に合わせながら、無理のない着地点を見つけられる傾向があります。',
    traits: ['柔軟', '調整力', '適応力'],
    love: ['恋愛では相手の気持ちをくみ取り、関係を穏やかに保とうとする傾向があります。', '合わせすぎて言えなかったことはありませんか？'],
    work: ['変化に対応しながら、人や状況をつなぐ役割で力を発揮しやすいタイプです。', '家庭と仕事の負担について、調整役が一人に偏っていませんか？'],
    money: ['その時々の生活に合わせて、お金の使い方を調整できる傾向があります。', '家計の変更を二人で確認する時間はありますか？'],
    strength: ['あなたの強みは、違いの間に立ち、現実的な折り合いをつけられることです。', 'あなた自身の希望も、話し合いの中に入っていますか？'],
    message: '優しく合わせる力と、自分の希望を伝える力は両立できます。'
  },
  {
    name: '心を受け止める共感型', summary: '人の気持ちの変化に気づきやすく、安心できる関係を大切にする傾向があります。', traits: ['共感力','気配り','温かさ'],
    love: ['相手の表情や声から気持ちを感じ取りやすく、寄り添う愛情表現が得意です。','相手の気持ちを想像するだけでなく、言葉で確認できていますか？'], work: ['人を支える仕事や、相手の立場を考える役割で力を発揮しやすいでしょう。','疲れたとき、家庭でどんな支え方を求めていますか？'], money: ['家族や身近な人のためには、お金を惜しまない傾向があります。','誰かのための支出について、二人で納得できていますか？'], strength: ['相手が安心して本音を話せる空気を作れることが強みです。','あなた自身の気持ちも、同じように受け止めてもらえていますか？'], message: '寄り添う優しさには、関係を立て直す力があります。'
  },
  {
    name: '信頼を守る誠実型', summary: '約束や役割を大切にし、長く続く信頼を築こうとする傾向があります。', traits: ['責任感','誠実','安定志向'],
    love: ['一度大切だと感じた相手には、責任を持って向き合う傾向があります。','二人の中で「守ってほしい約束」は共有されていますか？'], work: ['任されたことを丁寧にやり遂げ、周囲から信頼されやすいタイプです。','家庭で当たり前になっている役割を、見直したことはありますか？'], money: ['生活を守るための備えを重視し、計画的に管理しようとします。','安心に必要な金額について、二人の感覚は近いですか？'], strength: ['責任を引き受け、関係を長く守れることが強みです。','あなたが背負いすぎていることはありませんか？'], message: '守る力がある人ほど、支えてもらうことも大切です。'
  },
  {
    name: '想いを届ける表現型', summary: '感じたことや考えたことを、言葉や行動にして伝えられる傾向があります。', traits: ['表現力','明るさ','発信力'],
    love: ['愛情を言葉や態度で表し、関係を活気づけやすいタイプです。','相手が受け取りやすい愛情表現は何でしょう？'], work: ['発信、接客、企画など、自分の考えを外へ届ける場で力を出しやすいでしょう。','仕事の夢や不満を、家庭でどこまで話していますか？'], money: ['心が豊かになる体験や、人との時間にお金を使う傾向があります。','楽しみのためのお金を、二人でどう決めていますか？'], strength: ['思いを見える形にして、人の心を動かせることが強みです。','伝えるだけでなく、相手の受け止め方も聞けていますか？'], message: 'あなたの言葉は、二人の間に新しい会話を生み出します。'
  },
  {
    name: '平和をつくる調和型', summary: '対立を大きくするより、互いが納得できる関係を整えたい傾向があります。', traits: ['協調性','穏やか','公平感'],
    love: ['争いを避け、安心して過ごせる関係を大切にします。','我慢して平和を保っていることはありませんか？'], work: ['チーム内の空気を整え、協力しやすい環境を作る力があります。','家庭の話し合いで、発言量に偏りはありませんか？'], money: ['家族全体のバランスを考えてお金を配分する傾向があります。','誰か一人だけが我慢する家計になっていませんか？'], strength: ['異なる意見をつなぎ、穏やかな着地点を作れることが強みです。','本当の調和のために、今伝えるべきことは何でしょう？'], message: '穏やかさは、我慢ではなく対話によって守ることができます。'
  },
  {
    name: '技を磨く職人型', summary: '得意なことを丁寧に磨き、質の高い結果へつなげる傾向があります。', traits: ['集中','こだわり','技能'],
    love: ['言葉数は多くなくても、行動や継続で愛情を示す傾向があります。','あなたの愛情表現は、相手に伝わっていますか？'], work: ['専門性や技術を磨ける環境で、長く強みを育てられるタイプです。','仕事への集中と家族の時間を、どう分けていますか？'], money: ['長く使えるものや品質のよいものへ、納得してお金を使います。','品質と価格のどちらを重視するか、二人で違いはありますか？'], strength: ['時間をかけて、他の人には真似しにくい力を育てられます。','あなたの努力を、家庭の中で言葉にしていますか？'], message: '積み重ねてきた技術も愛情も、伝えることで初めて共有できます。'
  },
  {
    name: '未来を描く企画型', summary: '今あるものを組み合わせ、これからの可能性を考えることが得意な傾向があります。', traits: ['発想力','計画','未来志向'],
    love: ['二人で楽しめる予定や将来像を考えることで、愛情を育てる傾向があります。','二人の1年後について、最近話しましたか？'], work: ['企画、改善、仕組みづくりなど、未来を形にする役割に向いています。','仕事で考えている未来を、家族は知っていますか？'], money: ['目的が見えると、お金を計画的に振り分けやすいタイプです。','二人で叶えたいことに、予算をつけていますか？'], strength: ['漠然とした希望を、具体的な計画へ変えられることが強みです。','夫婦の希望を一つの計画にまとめられていますか？'], message: '未来は当てるものではなく、二人で言葉にして作るものです。'
  },
  {
    name: '暮らしを整える実務型', summary: '必要なことを見つけ、現実的な手順に落とし込むことが得意な傾向があります。', traits: ['実行力','管理力','現実的'],
    love: ['生活を整え、相手が困らないように動くことで愛情を示す傾向があります。','あなたがしている見えない家事を、二人で把握していますか？'], work: ['段取り、管理、改善など、物事を確実に進める役割で力を発揮します。','家庭の予定管理は一人に偏っていませんか？'], money: ['収支を現実的に把握し、必要なものへ優先的に使います。','家計管理の情報を二人で共有できていますか？'], strength: ['考えを現実に落とし込み、暮らしを回せることが強みです。','整える役割を、誰かと分ける余地はありますか？'], message: '暮らしを支える力には、見える言葉と感謝も必要です。'
  },
  {
    name: '前へ導くリーダー型', summary: '目標を見つけると、自分から決断し周囲を前へ進める傾向があります。', traits: ['決断力','統率力','目標志向'],
    love: ['関係をよくするため、自分から提案し解決へ動こうとします。','相手が考える時間を待てていますか？'], work: ['責任ある立場や、方向性を決める役割で力を発揮しやすいタイプです。','仕事の決断を家庭へ持ち込む前に相談できていますか？'], money: ['目標達成に必要だと判断すると、大きな決断もできる傾向があります。','大きなお金の決定権を、二人で共有していますか？'], strength: ['迷っている場面で方向を示し、行動を始められることが強みです。','夫婦の決定で、相手の希望を十分に聞けていますか？'], message: '導く力は、相手の声を聞くことでさらに信頼へ変わります。'
  },
  {
    name: '安心を育てる堅実型', summary: '生活の土台や将来の安心を大切にし、無理のない選択を重ねる傾向があります。', traits: ['節度','安定','備え'],
    love: ['安心できる日常や、変わらない関係を愛情として大切にします。','相手にとっての安心は、あなたと同じでしょうか？'], work: ['安定した環境で責任を積み重ね、着実に成果を出すタイプです。','安定と挑戦について、二人の考えは近いですか？'], money: ['貯蓄や備えを重視し、将来の不安を減らそうとします。','安心のために、どこまで貯めれば十分だと感じますか？'], strength: ['生活を守り、予想外の出来事にも備えられることが強みです。','安心を優先するあまり、後回しにしている楽しみはありますか？'], message: '守ることと楽しむことの両方を、二人で選んでいけます。'
  },
  {
    name: '可能性へ投資する成長型', summary: '学びや経験を通して、自分や暮らしを少しずつ良くしたい傾向があります。', traits: ['向上心','学び','自己投資'],
    love: ['二人で成長できる関係や、新しい経験を共有できる関係を求めます。','二人で一緒に学んでみたいことはありますか？'], work: ['学び続けられる仕事や、努力が成長につながる環境で力を発揮します。','学びに使う時間を、家庭で応援し合えていますか？'], money: ['資格、学習、経験など、将来につながる支出を価値あるものと考えます。','自己投資の予算について、二人で話していますか？'], strength: ['現状で止まらず、自分の可能性を育て続けられることが強みです。','夫婦として今後育てたい力は何でしょう？'], message: '二人の成長は、同じ速さでなくても支え合うことができます。'
  },
  {
    name: '感覚を信じる直感型', summary: '数字や理屈だけでなく、自分の感覚やタイミングを大切にする傾向があります。', traits: ['感性','瞬発力','タイミング'],
    love: ['相手との空気や感覚的なつながりを重視する傾向があります。','「察してほしい」と思っていることはありませんか？'], work: ['感性を生かす仕事や、瞬時の判断が必要な場面で力を出しやすいでしょう。','直感で決めたことを、相手にどう説明していますか？'], money: ['心が動くものや、今しかない機会にお金を使いやすい傾向があります。','衝動的な支出について、二人のルールはありますか？'], strength: ['言葉になる前の変化を感じ取り、好機をつかめることが強みです。','感覚の違いを否定せず、説明し合えていますか？'], message: '直感は、言葉を添えることで二人の理解へつながります。'
  },
  {
    name: '豊かさを分かち合う循環型', summary: '自分だけで抱え込まず、人とのつながりの中で豊かさを回したい傾向があります。', traits: ['分かち合い','交流','つながり'],
    love: ['相手が喜ぶことを考え、時間や気持ちを惜しまず渡せる傾向があります。','与えることと受け取ることのバランスは取れていますか？'], work: ['人と協力し、互いの得意を生かす場で力を発揮しやすいタイプです。','家庭の助け合いは、言葉にして確認されていますか？'], money: ['人との時間、贈り物、応援したいものへお金を使う傾向があります。','人のための支出について、二人の価値観は近いですか？'], strength: ['人や情報をつなぎ、周囲にも良い流れを広げられることが強みです。','あなた自身も十分に受け取れていますか？'], message: '分かち合う力は、受け取ることを許したときに長く続きます。'
  }
];

const topicLabels = { love: '恋愛・パートナーシップ', work: '仕事との向き合い方', money: 'お金との付き合い方', strength: 'あなたの強み' };
const topicArts = { love: 'assets/moon_cloud.jpg', work: 'assets/golden_path.jpg', money: 'assets/drop_ripples.jpg', strength: 'assets/moon_stars.jpg' };

function updateStartState() {
  startBtn.disabled = !(selectedFile && agree.checked);
}

palmImage.addEventListener('change', () => {
  const file = palmImage.files?.[0];
  if (!file) return;
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    preview.src = e.target.result;
    preview.hidden = false;
    uploadPrompt.hidden = true;
  };
  reader.readAsDataURL(file);
  updateStartState();
});

agree.addEventListener('change', updateStartState);

function pickReading(file) {
  // V1のデモ判定。ファイル情報から毎回同じ結果になるように選択。
  const seedText = `${file.name}:${file.size}:${file.lastModified}`;
  let hash = 0;
  for (const ch of seedText) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  return readings[Math.abs(hash) % readings.length];
}

function renderTopic(topic) {
  const [text, question] = currentReading[topic];
  document.getElementById('topicTitle').textContent = topicLabels[topic];
  document.getElementById('topicText').textContent = text;
  document.getElementById('topicQuestion').textContent = question;
  document.getElementById('topicArt').src = topicArts[topic];
  const panel = document.getElementById('topicPanel');
  panel.style.animation = 'none';
  void panel.offsetWidth;
  panel.style.animation = '';
  document.querySelectorAll('.topic-btn').forEach(btn => {
    const active = btn.dataset.topic === topic;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });
}

function renderResult(reading) {
  currentReading = reading;
  document.getElementById('typeTitle').textContent = reading.name;
  document.getElementById('typeSummary').textContent = reading.summary;
  document.getElementById('traits').innerHTML = reading.traits.map(t => `<span>${t}</span>`).join('');
  document.getElementById('lunasuiText').textContent = reading.message;
  renderTopic('love');
}

function runReadingDemo() {
  uploadCard.classList.add('hidden');
  resultCard.classList.add('hidden');
  loadingCard.classList.remove('hidden');
  loadingCard.classList.add('loading-fade-in');

  const progressBar = document.getElementById('progressBar');
  const stepEls = [...document.querySelectorAll('#readingSteps li')];
  const stages = [
    { text: '手のひら全体を見つめています…', progress: 12 },
    { text: '生命線を確認しています…', progress: 32 },
    { text: '知能線を見つめています…', progress: 53 },
    { text: '感情線を見つめています…', progress: 74 },
    { text: 'あなたらしさを言葉にしています…', progress: 92 },
    { text: '診断がまとまりました。', progress: 100 }
  ];

  let stage = 0;
  const updateStage = () => {
    const current = stages[stage];
    loadingText.textContent = current.text;
    progressBar.style.width = `${current.progress}%`;

    stepEls.forEach((el, index) => {
      el.classList.toggle('done', index < stage);
      el.classList.toggle('active', index === stage && stage < stepEls.length);
    });
  };

  progressBar.style.width = '0%';
  stepEls.forEach(el => el.classList.remove('done', 'active'));
  updateStage();

  const timer = setInterval(() => {
    stage += 1;
    updateStage();

    if (stage === stages.length - 1) {
      clearInterval(timer);
      stepEls.forEach(el => {
        el.classList.remove('active');
        el.classList.add('done');
      });

      setTimeout(() => {
        loadingCard.classList.add('hidden');
        loadingCard.classList.remove('loading-fade-in');
        resultCard.classList.remove('hidden');
        resultCard.style.animation = 'fadeUp .55s ease both';
        renderResult(selectedFile ? pickReading(selectedFile) : readings[0]);
        window.scrollTo({ top: resultCard.offsetTop - 18, behavior: 'smooth' });
      }, 650);
    }
  }, 850);
}

startBtn.addEventListener('click', () => {
  if (!selectedFile || !agree.checked) return;
  runReadingDemo();
});

demoBtn.addEventListener('click', () => {
  selectedFile = null;
  runReadingDemo();
});

if (new URLSearchParams(window.location.search).get('demo') === '1') {
  setTimeout(runReadingDemo, 250);
}

document.querySelectorAll('.topic-btn').forEach(btn => btn.addEventListener('click', () => renderTopic(btn.dataset.topic)));

retryBtn.addEventListener('click', () => {
  selectedFile = null;
  currentReading = null;
  palmImage.value = '';
  agree.checked = false;
  preview.src = '';
  preview.hidden = true;
  uploadPrompt.hidden = false;
  startBtn.disabled = true;
  resultCard.classList.add('hidden');
  uploadCard.classList.remove('hidden');
  window.scrollTo({ top: uploadCard.offsetTop - 18, behavior: 'smooth' });
});

document.getElementById('noteLink').addEventListener('click', e => {
  if (e.currentTarget.getAttribute('aria-disabled') === 'true') e.preventDefault();
});
