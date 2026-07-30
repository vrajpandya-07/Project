export type TranslationSection = {
  title: string;
  body: string;
};

export type LessonTranslation = {
  title: string;
  description: string;
  sections: TranslationSection[];
};

export const LESSON_TRANSLATIONS: Record<string, Record<string, LessonTranslation>> = {
  l1: {
    en: {
      title: "Introduction to Algebra",
      description: "Learn variables, expressions, and equations.",
      sections: [
        {
          title: "Introduction",
          body: "Welcome to Introduction to Algebra. In this lesson, we'll explore the core ideas step by step, with examples in your language.",
        },
        {
          title: "Core Concept",
          body: "The fundamental idea behind algebra is replacing unknown numbers with variables (like x or y). This allows us to write general equations and solve complex problems by balancing both sides.",
        },
        {
          title: "Worked Examples",
          body: "Consider the equation 2x + 5 = 15. To find x, we first subtract 5 from both sides: 2x = 10. Next, we divide both sides by 2: x = 5. By isolating the variable, we find the exact value of the unknown.",
        },
        {
          title: "Practice",
          body: "Try to solve: 3x - 4 = 11. Move the constant 4, then divide by 3. What is the value of x? Hint: x is a whole number.",
        },
      ],
    },
    hi: {
      title: "बीजगणित का परिचय (Introduction to Algebra)",
      description: "चर (variables), व्यंजक (expressions) और समीकरणों (equations) के बारे में जानें।",
      sections: [
        {
          title: "परिचय (Introduction)",
          body: "बीजगणित के परिचय में स्वागत है। इस पाठ में, हम आपकी भाषा में उदाहरणों के साथ, कदम दर कदम मुख्य विचारों का पता लगाएंगे। बीजगणित गणित की वह शाखा है जो प्रतीकों और उन्हें हेरफेर करने के नियमों से संबंधित है।",
        },
        {
          title: "मुख्य अवधारणा (Core Concept)",
          body: "बीजगणित के पीछे का मूल विचार अज्ञात संख्याओं को चर (जैसे x या y) से बदलना है। यह हमें दोनों पक्षों को संतुलित करके सामान्य समीकरण लिखने और जटिल समस्याओं को हल करने की अनुमति देता है। जब हम x का मान बदलते हैं, तो पूरे व्यंजक का मान बदल जाता है।",
        },
        {
          title: "हल किए गए उदाहरण (Worked Examples)",
          body: "समीकरण 2x + 5 = 15 पर विचार करें। x खोजने के लिए, हम पहले दोनों पक्षों से 5 घटाते हैं: 2x = 10। इसके बाद, हम दोनों पक्षों को 2 से विभाजित करते हैं: x = 5। चर को अलग करके, हम अज्ञात संख्या का सही मूल्य पाते हैं।",
        },
        {
          title: "अभ्यास (Practice)",
          body: "हल करने का प्रयास करें: 3x - 4 = 11। अचर 4 को दूसरी ओर स्थानांतरित करें (3x = 15), फिर 3 से विभाजित करें। x का मान क्या है? संकेत: x एक पूर्ण संख्या है।",
        },
      ],
    },
    gu: {
      title: "બીજગણિતનો પરિચય (Introduction to Algebra)",
      description: "ચલ, પદાવલિઓ અને સમીકરણો વિશે જાણો.",
      sections: [
        {
          title: "પરિચય (Introduction)",
          body: "બીજગણિતના પરિચયમાં આપનું સ્વાગત છે. આ પાઠમાં, આપણે તમારી ભાષામાં ઉદાહરણો સાથે, પગલું-દર-પગલું મુખ્ય વિચારો શોધીશું. બીજગણિત ગણિતની તે શાખા છે જે ચિહ્નો અને નિયમો સાથે સંબંધિત છે.",
        },
        {
          title: "મુખ્ય ખ્યાલ (Core Concept)",
          body: "બીજગણિત પાછળનો મૂળભૂત ખ્યાલ અજ્ઞાત સંખ્યાઓને ચલ (જેમ કે x અથવા y) સાથે બદલવાનો છે. આ આપણને બંને બાજુઓને સંતુલિત કરીને સામાન્ય સમીકરણો લખવા અને જટિલ સમસ્યાઓ હલ કરવાની મંજૂરી આપે છે. જ્યારે આપણે x ની કિંમત બદલીએ છીએ, ત્યારે પદાવલિની કિંમત બદલાય છે.",
        },
        {
          title: "ઉદાહરણો (Worked Examples)",
          body: "સમીકરણ 2x + 5 = 15 ધ્યાનમાં લો. x શોધવા માટે, આપણે પહેલા બંને બાજુથી 5 બાદ કરીએ છીએ: 2x = 10. આગળ, આપણે બંને બાજુને 2 વડે ભાગીએ છીએ: x = 5. ચલને અલગ કરીને, આપણને અજ્ઞાતનું ચોક્કસ મૂલ્ય મળે છે.",
        },
        {
          title: "અભ્યાસ (Practice)",
          body: "ઉકેલવાનો પ્રયત્ન કરો: 3x - 4 = 11. અચલ 4 ને બીજી બાજુ ખસેડો (3x = 15), પછી 3 વડે ભાગો. x ની કિંમત શું છે? સંકેત: x એક પૂર્ણાંક સંખ્યા છે.",
        },
      ],
    },
    ta: {
      title: "இயற்கணித அறிமுகம் (Introduction to Algebra)",
      description: "மாறிகள், கோவைகள் மற்றும் சமன்பாடுகளைக் கற்றுக்கொள்ளுங்கள்.",
      sections: [
        {
          title: "அறிமுகம் (Introduction)",
          body: "இயற்கணித அறிமுகத்திற்கு உங்களை வரவேற்கிறோம். இந்த பாடத்தில், உங்கள் மொழியிலான உதாரணங்களுடன், முக்கிய கருத்துக்களை படிப்படியாக ஆராய்வோம். இயற்கணிதம் என்பது எண்களுக்குப் பதிலாக குறியீடுகளைப் பயன்படுத்தும் கணிதப் பிரிவாகும்.",
        },
        {
          title: "முக்கிய கருத்து (Core Concept)",
          body: "இயற்கணிதத்தின் பின்னால் உள்ள அடிப்படை கருத்து என்னவென்றால், தெரியாத எண்களை மாறிகளால் (x அல்லது y போன்ற) மாற்றுவதாகும். இது இரு பக்கங்களையும் சமநிலைப்படுத்துவதன் மூலம் பொதுவான சமன்பாடுகளை எழுதவும் சிக்கலான கணக்குகளை தீர்க்கவும் உதவுகிறது.",
        },
        {
          title: "தீர்க்கப்பட்ட உதாரணங்கள் (Worked Examples)",
          body: "2x + 5 = 15 என்ற சமன்பாட்டைக் கருத்தில் கொள்க. x-ஐக் கண்டறிய, முதலில் இரு பக்கங்களிலிருந்தும் 5-ஐக் கழிக்கிறோம்: 2x = 10. அடுத்து, இரு பக்கங்களையும் 2-ஆல் வகுக்கிறோம்: x = 5. மாறியைத் தனிமைப்படுத்துவதன் மூலம், தெரியாத மதிப்பைத் துல்லியமாகக் கண்டறியலாம்.",
        },
        {
          title: "பயிற்சி (Practice)",
          body: "இதைத் தீர்க்க முயலுங்கள்: 3x - 4 = 11. மாறிலி 4-ஐ வலது பக்கம் நகர்த்தி (3x = 15), பின்னர் 3-ஆல் வகுக்கவும். x இன் மதிப்பு என்ன? குறிப்பு: x ஒரு முழு எண்.",
        },
      ],
    },
    mr: {
      title: "बीजगणिताची ओळख (Introduction to Algebra)",
      description: "चल, पदावली आणि समीकरणे याबद्दल शिका.",
      sections: [
        {
          title: "ओळख (Introduction)",
          body: "बीजगणिताच्या ओळखीमध्ये आपले स्वागत आहे. या पाठात, आम्ही तुमच्या भाषेत उदाहरणांसह, टप्प्याटप्प्याने मुख्य संकल्पनांचा शोध घेऊ. बीजगणित ही गणिताची एक शाखा आहे जी चिन्हे आणि नियम वापरून समस्या सोडवते.",
        },
        {
          title: "मुख्य संकल्पना (Core Concept)",
          body: "बीजगणितामागील मूलभूत संकल्पना म्हणजे अज्ञात संख्यांच्या जागी चल (जसे की x किंवा y) वापरणे. हे आम्हाला दोन्ही बाजू संतुलित करून सामान्य समीकरणे लिहिण्यास आणि जटिल समस्या सोडविण्यास अनुमती देते.",
        },
        {
          title: "सोडवलेली उदाहरणे (Worked Examples)",
          body: "2x + 5 = 15 हे समीकरण विचारात घ्या. x शोधण्यासाठी, आपण प्रथम दोन्ही बाजूंमधून 5 वजा करतो: 2x = 10. पुढे, आपण दोन्ही बाजूंना 2 ने भागतो: x = 5. चल वेगळा करून, आम्हाला अज्ञात संख्येचे अचूक मूल्य मिळते.",
        },
        {
          title: "सराव (Practice)",
          body: "सोडवण्याचा प्रयत्न करा: 3x - 4 = 11. स्थिरांक 4 दुसऱ्या बाजूला हलवा (3x = 15), नंतर 3 ने भागा. x चे मूल्य काय आहे? संकेत: x ही एक पूर्ण संख्या आहे.",
        },
      ],
    },
  },
  l2: {
    en: {
      title: "Newton's Laws of Motion",
      description: "Understand the three laws that govern motion.",
      sections: [
        {
          title: "Introduction",
          body: "Newton's laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces. They lay the foundation for classical mechanics.",
        },
        {
          title: "Core Concept",
          body: "There are three laws. First, Inertia: an object remains at rest or in uniform motion unless acted upon by an external force. Second, F = ma: force equals mass times acceleration. Third, Action-Reaction: for every action, there is an equal and opposite reaction.",
        },
        {
          title: "Worked Examples",
          body: "Example 1: A passenger lurches forward when a braking bus stops suddenly (Inertia). Example 2: Pushing a heavy cart requires more force than pushing a light cart to achieve the same speed acceleration (F = ma).",
        },
        {
          title: "Practice",
          body: "If a 5 kg ball accelerates at 3 m/s², what is the force applied? Use F = ma. (Answer: Force = 15 Newtons).",
        },
      ],
    },
    hi: {
      title: "न्यूटन के गति के नियम (Newton's Laws of Motion)",
      description: "गति को नियंत्रित करने वाले तीन नियमों को समझें।",
      sections: [
        {
          title: "परिचय (Introduction)",
          body: "न्यूटन के गति के नियम किसी पिंड और उस पर लगने वाले बलों के बीच के संबंध और उन बलों के जवाब में उसकी गति का वर्णन करते हैं। वे शास्त्रीय भौतिकी और हमारे दैनिक जीवन की गतिविधियों की बुनियादी नींव रखते हैं।",
        },
        {
          title: "मुख्य अवधारणा (Core Concept)",
          body: "न्यूटन के तीन नियम हैं। पहला, जड़त्व (Inertia): कोई वस्तु तब तक स्थिर या गति में रहेगी जब तक बाहरी बल न लगे। दूसरा, F = ma: बल वस्तु के द्रव्यमान और त्वरण के गुणनफल के बराबर होता है। तीसरा, क्रिया-प्रतिक्रिया (Action-Reaction): प्रत्येक क्रिया की समान और विपरीत प्रतिक्रिया होती है।",
        },
        {
          title: "हल किए गए उदाहरण (Worked Examples)",
          body: "उदाहरण 1: अचानक ब्रेक लगाने पर बस में बैठा यात्री आगे की ओर झुक जाता है (जड़त्व)। उदाहरण 2: भारी गाड़ी को धकेलने के लिए समान त्वरण प्राप्त करने के लिए हल्की गाड़ी की तुलना में अधिक बल की आवश्यकता होती है (F = ma)।",
        },
        {
          title: "अभ्यास (Practice)",
          body: "यदि 5 किलोग्राम की गेंद 3 मीटर/सेकंड² की दर से त्वरित होती है, तो लगाया गया बल क्या है? F = ma का उपयोग करें। (उत्तर: बल = 15 न्यूटन (Newtons))।",
        },
      ],
    },
    gu: {
      title: "ન્યૂટનના ગતિના નિયમો (Newton's Laws of Motion)",
      description: "ગતિને નિયંત્રિત કરતા ત્રણ નિયમો સમજો.",
      sections: [
        {
          title: "પરિચય (Introduction)",
          body: "ન્યૂટનના ગતિના નિયમો પદાર્થ અને તેના પર લાગતા બળો વચ્ચેના સંબંધ અને તે બળોના પ્રતિભાવમાં તેની ગતિનું વર્ણન કરે છે. તેઓ ક્લાસિકલ ફિઝિક્સનો પાયો નાખે છે.",
        },
        {
          title: "મુખ્ય ખ્યાલ (Core Concept)",
          body: "ત્રણ નિયમો છે. પ્રથમ, જડત્વ (Inertia): કોઈ પદાર્થ ત્યાં સુધી સ્થિર અથવા ગતિમાં રહે છે જે સુધી કોઈ બાહ્ય બળ ન લાગે. બીજો, F = ma: બળ એ દળ અને પ્રવેગના ગુણાકાર બરાબર છે. ત્રીજો, ક્રિયા-પ્રતિક્રિયા: દરેક ક્રિયાની સમાન અને વિરુદ્ધ પ્રતિક્રિયા હોય છે.",
        },
        {
          title: "ઉદાહરણો (Worked Examples)",
          body: "ઉદાહરણ 1: બસ અચાનક બ્રેક મારે ત્યારે મુસાફર આગળ તરફ નમી જાય છે (જડત્વ). ઉદાહરણ 2: સમાન ગતિ મેળવવા માટે ભારે લારીને ધકેલવા માટે હળવી લારી કરતાં વધુ બળની જરૂર પડે છે (F = ma).",
        },
        {
          title: "અભ્યાસ (Practice)",
          body: "જો 5 કિગ્રાનો દડો 3 મી/સે² ના પ્રવેગથી ગતિ કરે છે, તો લાગુ કરેલ બળ કેટલું છે? F = ma નો ઉપયોગ કરો. (જવાબ: બળ = 15 ન્યૂટન).",
        },
      ],
    },
    ta: {
      title: "நியூட்டனின் இயக்க விதிகள் (Newton's Laws of Motion)",
      description: "இயக்கத்தை நிர்வகிக்கும் மூன்று விதிகளைப் புரிந்து கொள்ளுங்கள்.",
      sections: [
        {
          title: "அறிமுகம் (Introduction)",
          body: "நியூட்டனின் இயக்க விதிகள் ஒரு பொருளின் மீதான விசைகளுக்கும், அவ்விசைகளின் விளைவாக ஏற்படும் இயக்கத்திற்கும் இடையிலான உறவை விவரிக்கின்றன. இவை செவ்வியல் இயக்கவியலின் அடிப்படையாகும்.",
        },
        {
          title: "முக்கிய கருத்து (Core Concept)",
          body: "மூன்று விதிகள் உள்ளன. முதலாவது, நிலைமம் (Inertia): ஒரு பொருள் வெளிப்புற விசை செயல்படும் வரை ஓய்விலோ அல்லது சீரான இயக்கத்திலோ இருக்கும். இரண்டாவது, F = ma: விசை என்பது நிறை மற்றும் முடுக்கத்தின் பெருக்கற்பலனுக்குச் சமம். மூன்றாவது, வினை-எதிர்வினை: ஒவ்வொரு வினைக்கும் ஒரு சமமான மற்றும் எதிர் வினை உண்டு.",
        },
        {
          title: "தீர்க்கப்பட்ட உதாரணங்கள் (Worked Examples)",
          body: "உதாரணம் 1: இயங்கும் பேருந்து திடீரென நிறுத்தப்படும் போது பயணி முன்னோக்கிச் சாய்கிறார் (நிலைமம்). உதாரணம் 2: ஒரே வேகத்தை அடைய கனமான வண்டியைத் தள்ளுவதற்கு இலகுவான வண்டியை விட அதிக விசை தேவைப்படுகிறது (F = ma).",
        },
        {
          title: "பயிற்சி (Practice)",
          body: "5 கிலோ எடையுள்ள பந்து 3 m/s² முடுக்கத்தில் சென்றால், செலுத்தப்படும் விசை என்ன? F = ma ஐப் பயன்படுத்தவும். (விடை: விசை = 15 நியூட்டன்கள்).",
        },
      ],
    },
    mr: {
      title: "न्यूटनचे गतीचे नियम (Newton's Laws of Motion)",
      description: "गती नियंत्रित करणारे तीन नियम समजून घ्या.",
      sections: [
        {
          title: "ओळख (Introduction)",
          body: "न्यूटनचे गतीचे नियम एखादी वस्तू आणि त्यावर कार्य करणारी बले यांच्यातील संबंध आणि त्या बलांना मिळणाऱ्या प्रतिसादातील गतीचे वर्णन करतात. ते अभिजात भौतिकशास्त्राचा पाया घालतात.",
        },
        {
          title: "मुख्य संकल्पना (Core Concept)",
          body: "तीन नियम आहेत. पहिला, जडत्व (Inertia): बाह्य बल कार्य करेपर्यंत एखादी वस्तू स्थिर किंवा एकसमान गतीत राहते. दुसरा, F = ma: बल हे वस्तुमान आणि प्रवेगाच्या गुणाकाराएवढे असते. तिसरा, क्रिया-प्रतिक्रिया: प्रत्येक क्रियेला समान आणि विरुद्ध प्रतिक्रिया असते.",
        },
        {
          title: "सोडवलेली उदाहरणे (Worked Examples)",
          body: "उदाहरण १: चालत्या बसला अचानक ब्रेक लागल्यास प्रवासी पुढे झुकतो (जडत्व). उदाहरण २: समान प्रवेग मिळवण्यासाठी हलक्या गाडीपेक्षा जड गाडी ढकलण्यासाठी जास्त बल लागते (F = ma).",
        },
        {
          title: "सराव (Practice)",
          body: "जर ५ किलो वजनाचा चेंडू ३ m/s² ने प्रवेगित होत असेल, तर प्रयुक्त बल किती आहे? F = ma वापरा. (उत्तर: बल = १५ न्यूटन).",
        },
      ],
    },
  },
  l3: {
    en: {
      title: "Chemical Bonding",
      description: "Ionic, covalent, and metallic bonds.",
      sections: [
        {
          title: "Introduction",
          body: "Chemical bonding refers to the attraction between atoms, ions, or molecules that enables the formation of chemical compounds. Atoms bond to achieve stability by filling their outermost electron shell.",
        },
        {
          title: "Core Concept",
          body: "There are three main types of bonds. Ionic Bonds: formed by the complete transfer of valence electrons from a metal to a non-metal (like NaCl). Covalent Bonds: formed by sharing electron pairs between non-metal atoms (like H2O). Metallic Bonds: formed by the electrostatic attraction between conduction electrons and positively charged metal ions.",
        },
        {
          title: "Worked Examples",
          body: "Example 1: Sodium (Na) has 1 valence electron and Chlorine (Cl) has 7. Na transfers its electron to Cl, forming Na+ and Cl- ions that bond together (Ionic). Example 2: Two Hydrogen atoms each share an electron with one Oxygen atom to complete their shells (Covalent).",
        },
        {
          title: "Practice",
          body: "When Carbon (4 valence electrons) bonds with four Hydrogen atoms (1 valence electron each) to form Methane (CH4), what type of bond is formed? (Answer: Covalent bonds, because electrons are shared).",
        },
      ],
    },
    hi: {
      title: "रासायनिक बंधन (Chemical Bonding)",
      description: "आयनिक, सहसंयोजक और धात्विक बंध।",
      sections: [
        {
          title: "परिचय (Introduction)",
          body: "रासायनिक बंधन परमाणुओं, आयनों या अणुओं के बीच उस आकर्षण को दर्शाता है जो रासायनिक यौगिकों के निर्माण को सक्षम बनाता है। परमाणु अपने बाहरी इलेक्ट्रॉन शेल को भरकर स्थिरता प्राप्त करने के लिए बंध बनाते हैं।",
        },
        {
          title: "मुख्य अवधारणा (Core Concept)",
          body: "तीन मुख्य प्रकार के बंध होते हैं। आयनिक बंध (Ionic Bonds): धातु से अधातु में इलेक्ट्रॉनों के पूर्ण स्थानांतरण से बनते हैं (जैसे NaCl)। सहसंयोजक बंध (Covalent Bonds): अधातु परमाणुओं के बीच इलेक्ट्रॉनों की साझेदारी से बनते हैं (जैसे H2O)। धात्विक बंध (Metallic Bonds): धातु के धनात्मक आयनों और मुक्त इलेक्ट्रॉनों के बीच आकर्षण से बनते हैं।",
        },
        {
          title: "हल किए गए उदाहरण (Worked Examples)",
          body: "उदाहरण 1: सोडियम (Na) के पास 1 संयोजी इलेक्ट्रॉन है और क्लोरीन (Cl) के पास 7 हैं। Na अपना इलेक्ट्रॉन Cl को स्थानांतरित करता है, जिससे Na+ और Cl- आयन बनते हैं जो आपस में बंधते हैं (आयनिक)। उदाहरण 2: दो हाइड्रोजन परमाणु एक-एक इलेक्ट्रॉन ऑक्सीजन के साथ साझा करते हैं (सहसंयोजक)।",
        },
        {
          title: "अभ्यास (Practice)",
          body: "जब कार्बन (4 संयोजी इलेक्ट्रॉन) मीथेन (CH4) बनाने के लिए चार हाइड्रोजन परमाणुओं (प्रत्येक के पास 1 इलेक्ट्रॉन) के साथ बंध बनाता है, तो किस प्रकार का बंध बनता है? (उत्तर: सहसंयोजक बंध, क्योंकि इलेक्ट्रॉन साझा किए जाते हैं)।",
        },
      ],
    },
    gu: {
      title: "રાસાયણિક બંધન (Chemical Bonding)",
      description: "આયનિક, સહસંયોજક અને ધાતુ બંધો.",
      sections: [
        {
          title: "પરિચય (Introduction)",
          body: "રાસાયણિક બંધન એટલે પરમાણુઓ, આયનો અથવા અણુઓ વચ્ચેનું આકર્ષણ જે રાસાયણિક સંયોજનોની રચનાને સક્ષમ કરે છે. પરમાણુઓ તેમની સૌથી બહારની ઇલેક્ટ્રોન કક્ષા ભરીને સ્થિરતા મેળવવા માટે બંધ બનાવે છે.",
        },
        {
          title: "મુખ્ય ખ્યાલ (Core Concept)",
          body: "ત્રણ મુખ્ય પ્રકારના બંધ હોય છે. આયનિક બંધ (Ionic Bonds): ધાતુમાંથી અધાતુમાં ઇલેક્ટ્રોનની સંપૂર્ણ ફેરબદલી દ્વારા રચાય છે (જેમ કે NaCl). સહસંયોજક બંધ (Covalent Bonds): અધાતુ પરમાણુઓ વચ્ચે ઇલેક્ટ્રોનની ભાગીદારી દ્વારા રચાય છે (જેમ કે H2O). ધાતુ બંધ (Metallic Bonds): ધાતુ આયનો અને મુક્ત ઇલેક્ટ્રોન વચ્ચેના સ્થિર વિદ્યુત આકર્ષણ દ્વારા રચાય છે.",
        },
        {
          title: "ઉદાહરણો (Worked Examples)",
          body: "ઉદાહરણ 1: સોડિયમ (Na) પાસે 1 સંયોજકતા ઇલેક્ટ્રોન છે અને ક્લોરિન (Cl) પાસે 7 છે. Na તેનો ઇલેક્ટ્રોન Cl ને આપે છે, જેથી Na+ અને Cl- આયનો બને છે જે જોડાઈને આયનિક બંધ બનાવે છે. ઉદાહરણ 2: બે હાઇડ્રોજન પરમાણુઓ એક ઓક્સિજન પરમાણુ સાથે ઇલેક્ટ્રોનની ભાગીદારી કરે છે (સહસંયોજક).",
        },
        {
          title: "અભ્યાસ (Practice)",
          body: "જ્યારે કાર્બન (4 સંયોજકતા ઇલેક્ટ્રોન) મિથેન (CH4) બનાવવા માટે ચાર હાઇડ્રોજન પરમાણુઓ (દરેક પાસે 1 ઇલેક્ટ્રોન) સાથે જોડાય છે, ત્યારે કયો બંધ બને છે? (જવાબ: સહસંયોજક બંધ, કારણ કે ઇલેક્ટ્રોનની ભાગીદારી થાય છે).",
        },
      ],
    },
    ta: {
      title: "வேதிப் பிணைப்பு (Chemical Bonding)",
      description: "அயனி, சகப்பிணைப்பு மற்றும் உலோகப் பிணைப்புகள்.",
      sections: [
        {
          title: "அறிமுகம் (Introduction)",
          body: "வேதிப் பிணைப்பு என்பது அணுக்கள், அயனிகள் அல்லது மூலக்கூறுகளுக்கு இடையிலான ஈர்ப்பு விசையைக் குறிக்கிறது, இது வேதிச் சேர்மங்களின் உருவாக்கத்தை சாத்தியமாக்குகிறது. அணுக்கள் அவற்றின் வெளிப்புற எலக்ட்ரான் கூட்டினை நிரப்பி நிலைத்தன்மையை அடைய பிணைப்புகளை உருவாக்குகின்றன.",
        },
        {
          title: "முக்கிய கருத்து (Core Concept)",
          body: "மூன்று முக்கிய பிணைப்பு வகைகள் உள்ளன. அயனிப் பிணைப்பு (Ionic Bonds): ஒரு உலோகத்திலிருந்து அலோகத்திற்கு எலக்ட்ரான்கள் முழுமையாக மாற்றப்படுவதால் உருவாகிறது (எ.கா. NaCl). சகப்பிணைப்பு (Covalent Bonds): அலோக அணுக்களுக்கு இடையே எலக்ட்ரான் ஜோடிகளைப் பகிர்வதால் உருவாகிறது (எ.கா. H2O). உலோகப் பிணைப்பு (Metallic Bonds): நேர்மின் உலோக அயனிகளுக்கும் கட்டுறா எலக்ட்ரான்களுக்கும் இடையே உள்ள ஈர்ப்பு விசையால் உருவாகிறது.",
        },
        {
          title: "தீர்க்கப்பட்ட உதாரணங்கள் (Worked Examples)",
          body: "உதாரணம் 1: சோடியம் (Na) அணுவிடம் 1 எலக்ட்ரானும், குளோரின் (Cl) அணுவிடம் 7 எலக்ட்ரான்களும் வெளிப்புற கூட்டில் உள்ளன. Na எலக்ட்ரானை Cl-க்கு மாற்றுகிறது, இதனால் Na+ மற்றும் Cl- அயனிகள் உருவாகி இணைகின்றன (அயனி பிணைப்பு). உதாரணம் 2: இரண்டு ஹைட்ரஜன் அணுக்கள் ஒரு ஆக்சிஜன் அணுவுடன் தலா ஒரு எலக்ட்ரானைப் பகிர்ந்து கொள்கின்றன (சகப்பிணைப்பு).",
        },
        {
          title: "பயிற்சி (Practice)",
          body: "கார்பன் (4 வெளிப்புற எலக்ட்ரான்கள்) நான்கு ஹைட்ரஜன் அணுக்களுடன் (தலா 1 எலக்ட்ரான்) இணைந்து மீத்தேன் (CH4) உருவாக்கும் போது என்ன வகையான பிணைப்பு ஏற்படுகிறது? (விடை: சகப்பிணைப்பு, ஏனெனில் எலக்ட்ரான்கள் பகிரப்படுகின்றன).",
        },
      ],
    },
    mr: {
      title: "रासायनिक बंधन (Chemical Bonding)",
      description: "आयनिक, सहसंयोजक आणि धातू बंध.",
      sections: [
        {
          title: "ओळख (Introduction)",
          body: "रासायनिक बंधन म्हणजे अणू, आयन किंवा रेणू यांच्यातील आकर्षण ज्यामुळे रासायनिक संयुगे तयार होतात. अणू त्यांच्या बाह्यतम कवचातील इलेक्ट्रॉनची संख्या पूर्ण करून स्थिरता मिळवण्यासाठी रासायनिक बंध तयार करतात.",
        },
        {
          title: "मुख्य संकल्पना (Core Concept)",
          body: "बंधांचे तीन मुख्य प्रकार आहेत. आयनिक बंध (Ionic Bonds): धातू कडून अधातू कडे इलेक्ट्रॉनच्या पूर्ण स्थानांतराने तयार होतात (उदा. NaCl). सहसंयोजक बंध (Covalent Bonds): अधातू अणूंमध्ये इलेक्ट्रॉनच्या भागीदारीमुळे तयार होतात (उदा. H2O). धातू बंध (Metallic Bonds): धन प्रभारित धातू आयन आणि मुक्त इलेक्ट्रॉन्स यांच्यातील आकर्षणाने तयार होतात.",
        },
        {
          title: "सोडवलेली उदाहरणे (Worked Examples)",
          body: "उदाहरण १: सोडिअम (Na) कडे १ संयोजी इलेक्ट्रॉन आहे आणि क्लोरीन (Cl) कडे ७ आहेत. Na त्याचा इलेक्ट्रॉन Cl ला देतो, ज्यायोगे Na+ आणि Cl- आयन तयार होतात व एकत्र जोडले जातात (आयनिक). उदाहरण २: दोन हायड्रोजन अणू ऑक्सिजनच्या अणूसोबत प्रत्येकी एक इलेक्ट्रॉनची भागीदारी करतात (सहसंयोजक).",
        },
        {
          title: "सराव (Practice)",
          body: "जेव्हा कार्बन (४ संयोजी इलेक्ट्रॉन) मिथेन (CH4) तयार करण्यासाठी चार हायड्रोजन अणूंशी (प्रत्येकी १ इलेक्ट्रॉन) जोडला जातो, तेव्हा कोणता बंध तयार होतो? (उत्तर: सहसंयोजक बंध, कारण इलेक्ट्रॉन्सची भागीदारी होते).",
        },
      ],
    },
  },
  l4: {
    en: {
      title: "Cell Structure",
      description: "Explore the building blocks of life.",
      sections: [
        {
          title: "Introduction",
          body: "The cell is the basic structural, functional, and biological unit of all known organisms. Cells are often called the 'building blocks of life'. Eukaryotic cells contain specialized structures called organelles.",
        },
        {
          title: "Core Concept",
          body: "Key organelles inside a cell include: Nucleus: the control center containing DNA. Mitochondria: the powerhouses that generate chemical energy (ATP). Cell Membrane: the barrier controlling what enters and exits. Ribosomes: tiny factories that synthesize proteins.",
        },
        {
          title: "Worked Examples",
          body: "Example 1: The cell membrane acts like a security guard, allowing nutrients inside but keeping toxic wastes out. Example 2: Active muscles require massive amounts of energy, so muscle cells have thousands of mitochondria compared to skin cells.",
        },
        {
          title: "Practice",
          body: "Which cell organelle is responsible for storing genetic information and controlling cell activities? (Answer: The Nucleus).",
        },
      ],
    },
    hi: {
      title: "कोशिका संरचना (Cell Structure)",
      description: "जीवन के मूलभूत खंडों का अन्वेषण करें।",
      sections: [
        {
          title: "परिचय (Introduction)",
          body: "कोशिका सभी ज्ञात जीवों की बुनियादी संरचनात्मक, कार्यात्मक और जैविक इकाई है। कोशिकाओं को अक्सर 'जीवन के निर्माण खंड' कहा जाता है। सुकेन्द्रकीय (Eukaryotic) कोशिकाओं में विशेष संरचनाएं होती हैं जिन्हें अंगक (organelles) कहा जाता है।",
        },
        {
          title: "मुख्य अवधारणा (Core Concept)",
          body: "कोशिका के प्रमुख अंगकों में शामिल हैं: केंद्रक (Nucleus): डीएनए युक्त नियंत्रण केंद्र। सूत्रकणिका (Mitochondria): बिजलीघर जो रासायनिक ऊर्जा (ATP) उत्पन्न करता है। कोशिका झिल्ली (Cell Membrane): सीमा जो प्रवेश और निकास को नियंत्रित करती है। राइबोसोम (Ribosomes): छोटे कारखाने जो प्रोटीन का निर्माण करते हैं।",
        },
        {
          title: "हल किए गए उदाहरण (Worked Examples)",
          body: "उदाहरण 1: कोशिका झिल्ली एक सुरक्षा गार्ड की तरह काम करती है, जो पोषक तत्वों को अंदर आने देती है लेकिन हानिकारक कचरे को बाहर रखती है। उदाहरण 2: सक्रिय मांसपेशियों को भारी मात्रा में ऊर्जा की आवश्यकता होती है, इसलिए मांसपेशियों की कोशिकाओं में त्वचा की कोशिकाओं की तुलना में हजारों सूत्रकणिकाएं (mitochondria) होती हैं।",
        },
        {
          title: "अभ्यास (Practice)",
          body: "कोशिका का कौन सा अंगक आनुवंशिक जानकारी संग्रहीत करने और कोशिका गतिविधियों को नियंत्रित करने के लिए जिम्मेदार है? (उत्तर: केंद्रक (Nucleus))।",
        },
      ],
    },
    gu: {
      title: "કોષ રચના (Cell Structure)",
      description: "જીવનના પાયાના એકમો વિશે જાણો.",
      sections: [
        {
          title: "પરિચય (Introduction)",
          body: "કોષ એ બધા જ સજીવોનો પાયાનો બંધારણીય અને ક્રિયાત્મક એકમ છે. કોષોને ઘણીવાર 'જીવનના ઇંટો' અથવા 'બિલ્ડિંગ બ્લોક્સ' કહેવામાં આવે છે. યુકેરીયોટિક કોષોમાં કોષીય અંગિકાઓ (organelles) આવેલી હોય છે જે વિશિષ્ટ કાર્યો કરે છે.",
        },
        {
          title: "મુખ્ય ખ્યાલ (Core Concept)",
          body: "કોષની મુખ્ય અંગિકાઓમાં સમાવેશ થાય છે: કોષકેન્દ્ર (Nucleus): ડીએનએ ધરાવતું નિયંત્રણ કેન્દ્ર. કણાભસૂત્ર (Mitochondria): કોષનું પાવરહાઉસ જે રાસાયણિક ઉર્જા (ATP) બનાવે છે. કોષરસપટલ (Cell Membrane): એક એવું આવરણ જે નક્કી કરે છે કે કોષમાં શું પ્રવેશશે અને શું બહાર જશે. રીબોઝોમ્સ (Ribosomes): નાના કારખાના જે પ્રોટીનનું સંશ્લેષણ કરે છે.",
        },
        {
          title: "ઉદાહરણો (Worked Examples)",
          body: "ઉદાહરણ 1: કોષરસપટલ સુરક્ષા ગાર્ડની જેમ કામ કરે છે, જે પોષક તત્વોને અંદર આવવા દે છે પરંતુ કચરાને બહાર રાખે છે. ઉદાહરણ 2: સક્રિય સ્નાયુઓને વધુ ઉર્જાની જરૂર હોવાથી, સ્નાયુ કોષોમાં કણાભસૂત્રોની સંખ્યા ત્વચાના કોષો કરતાં ઘણી વધારે હોય છે.",
        },
        {
          title: "અભ્યાસ (Practice)",
          body: "કોષની કઈ અંગિકા આનુવંશિક માહિતીનો સંગ્રહ કરવા અને કોષની પ્રવૃત્તિઓનું સંચાલન કરવા માટે જવાબદાર છે? (જવાબ: કોષકેન્દ્ર (Nucleus)).",
        },
      ],
    },
    ta: {
      title: "செல் அமைப்பு (Cell Structure)",
      description: "உயிரினங்களின் அடிப்படை அலகுகளை ஆராயுங்கள்.",
      sections: [
        {
          title: "அறிமுகம் (Introduction)",
          body: "செல் என்பது அனைத்து உயிரினங்களின் அடிப்படை கட்டமைப்பு, செயல்பாடு மற்றும் உயிரியல் அலகாகும். செல்கள் பெரும்பாலும் 'உயிரின் கட்டுமானத் தொகுதிகள்' என்று அழைக்கப்படுகின்றன. யுகேரியோடிக் செல்கள் நுண்ணுறுப்புகள் (organelles) எனப்படும் சிறப்பு அமைப்புகளைக் கொண்டுள்ளன.",
        },
        {
          title: "முக்கிய கருத்து (Core Concept)",
          body: "செல்லின் முக்கிய நுண்ணுறுப்புகள்: உட்கரு (Nucleus): டி.என்.ஏ கொண்ட கட்டுப்பாட்டு மையம். மைட்டோகாண்ட்ரியா (Mitochondria): செல்லின் ஆற்றல் மையம், இது வேதி ஆற்றலை (ATP) உருவாக்குகிறது. செல் சவ்வு (Cell Membrane): செல்லுக்குள் பொருட்கள் நுழைவதையும் வெளியேறுவதையும் கட்டுப்படுத்தும் அரண். ரிபோசோம்கள் (Ribosomes): புரதங்களை உற்பத்தி செய்யும் சிறிய தொழிற்சாலைகள்.",
        },
        {
          title: "தீர்க்கப்பட்ட உதாரணங்கள் (Worked Examples)",
          body: "உதாரணம் 1: செல் சவ்வு ஒரு பாதுகாப்புக் காவலர் போல் செயல்படுகிறது, ஊட்டச்சத்துக்களை உள்ளே அனுமதிக்கிறது ஆனால் நச்சுக் கழிவுகளைத் தடுக்கிறது. உதாரணம் 2: செயலில் உள்ள தசை செல்களுக்கு அதிக ஆற்றல் தேவைப்படுவதால், தோல் செல்களை விட தசை செல்களில் ஆயிரக்கணக்கான மைட்டோகாண்ட்ரியாக்கள் உள்ளன.",
        },
        {
          title: "பயிற்சி (Practice)",
          body: "மரபணு தகவல்களை சேமித்து செல்லின் செயல்பாடுகளை கட்டுப்படுத்தும் நுண்ணுறுப்பு எது? (விடை: உட்கரு (Nucleus)).",
        },
      ],
    },
    mr: {
      title: "पेशीची रचना (Cell Structure)",
      description: "जीवनाच्या मूलभूत घटकांचा शोध घ्या.",
      sections: [
        {
          title: "ओळख (Introduction)",
          body: "पेशी ही सर्व सजीवांची मूलभूत रचनात्मक, कार्यात्मक आणि जैविक युनिट आहे. पेशींना सहसा 'जीवनाचे रचना घटक' म्हटले जाते. दृश्यकेंद्रकी (Eukaryotic) पेशींमध्ये विशिष्ट कार्ये करणारी पेशी अंगके असतात.",
        },
        {
          title: "मुख्य संकल्पना (Core Concept)",
          body: "पेशीमधील महत्त्वाचे अंगक पुढीलप्रमाणे आहेत: केंद्रक (Nucleus): डीएनए असणारे पेशीचे नियंत्रण केंद्र. तंतुकणिका (Mitochondria): पेशीचे ऊर्जा केंद्र (Powerhouse) जे ऊर्जा (ATP) निर्माण करते. पेशीपटल (Cell Membrane): पेशीच्या आत जाणाऱ्या आणि बाहेर येणाऱ्या पदार्थांवर नियंत्रण ठेवणारी सीमा. रायबोझोम्स (Ribosomes): प्रथिने (Proteins) तयार करणारे सूक्ष्म कारखाने.",
        },
        {
          title: "सोडवलेली उदाहरणे (Worked Examples)",
          body: "उदाहरण १: पेशीपटल एखाद्या सुरक्षा रक्षकासारखे काम करते, पोषक तत्वांना आत प्रवेश देते परंतु कचरा बाहेर ठेवते. उदाहरण २: स्नायूंच्या पेशींना जास्त ऊर्जेची गरज असल्याने स्नायूंच्या पेशींमध्ये त्वचेच्या पेशींपेक्षा खूप जास्त तंतुकणिका असतात.",
        },
        {
          title: "सराव (Practice)",
          body: "पेशीचे अनुवांशिक माहिती साठवणारे आणि पेशीच्या कार्यावर नियंत्रण ठेवणारे मुख्य अंगक कोणते आहे? (उत्तर: केंद्रक (Nucleus)).",
        },
      ],
    },
  },
  l5: {
    en: {
      title: "Loops in Python",
      description: "For loops, while loops, and iteration.",
      sections: [
        {
          title: "Introduction",
          body: "In programming, loops are used to repeat a block of code multiple times. Python provides two primary loop constructs: 'for' loops (iterating over a sequence) and 'while' loops (repeating as long as a condition is true).",
        },
        {
          title: "Core Concept",
          body: "A 'for loop' repeats for a set number of times, typically going through a sequence like a list or range. A 'while loop' runs indefinitely until its conditional statement evaluates to False. Proper indentation is required in Python to define the loop body.",
        },
        {
          title: "Worked Examples",
          body: "Example 1: `for i in range(3): print(i)` prints 0, then 1, then 2. Example 2: A game loop runs `while playing == True: get_user_input()`. It terminates when the player chooses to quit, setting `playing` to False.",
        },
        {
          title: "Practice",
          body: "How many times will `for x in range(5):` execute the code inside it? (Answer: 5 times, with values of x from 0 to 4).",
        },
      ],
    },
    hi: {
      title: "पायथन में लूप (Loops in Python)",
      description: "फॉर लूप, व्हाइल लूप और पुनरावृत्ति।",
      sections: [
        {
          title: "परिचय (Introduction)",
          body: "प्रोग्रामिंग में, कोड के एक हिस्से को कई बार दोहराने के लिए लूप का उपयोग किया जाता है। पायथन दो मुख्य लूप संरचनाएं प्रदान करता है: 'for' लूप (एक अनुक्रम पर चलना) और 'while' लूप (जब तक कोई शर्त सच है, तब तक चलना)।",
        },
        {
          title: "मुख्य अवधारणा (Core Concept)",
          body: "एक 'for लूप' एक निश्चित संख्या में दोहराता है, आमतौर पर एक सूची या रेंज जैसे अनुक्रम के माध्यम से जाता है। एक 'while लूप' अनिश्चित काल तक चलता रहता है जब तक कि उसकी शर्त False नहीं हो जाती। लूप बॉडी को परिभाषित करने के लिए पायथन में उचित इंडेंटेशन (space) आवश्यक है।",
        },
        {
          title: "हल किए गए उदाहरण (Worked Examples)",
          body: "उदाहरण 1: `for i in range(3): print(i)` पहले 0, फिर 1, फिर 2 प्रिंट करता है। उदाहरण 2: एक गेम लूप `while playing == True: get_user_input()` चलाता है। यह तब समाप्त होता है जब खिलाड़ी बाहर निकलने का विकल्प चुनता है, जिससे `playing` False हो जाता है।",
        },
        {
          title: "अभ्यास (Practice)",
          body: "`for x in range(5):` इसके अंदर के कोड को कितनी बार निष्पादित करेगा? (उत्तर: 5 बार, x के मान 0 से 4 तक होंगे)।",
        },
      ],
    },
    gu: {
      title: "પાયથનમાં લૂપ્સ (Loops in Python)",
      description: "ફોર લૂપ્સ, વ્હાઇલ લૂપ્સ અને પુનરાવર્તન.",
      sections: [
        {
          title: "પરિચય (Introduction)",
          body: "પ્રોગ્રામિંગમાં, કોઈ એક કોડ બ્લોકને વારંવાર ચલાવવા માટે લૂપનો ઉપયોગ થાય છે. પાયથન મુખ્યત્વે બે પ્રકારના લૂપ્સ આપે છે: 'for' લૂપ (શ્રેણી અથવા લિસ્ટ પર ચક્ર ચલાવવા) અને 'while' લૂપ (જ્યાં સુધી શરત સાચી હોય ત્યાં સુધી ચક્ર ચલાવવા).",
        },
        {
          title: "મુખ્ય ખ્યાલ (Core Concept)",
          body: "એક 'for loop' ચોક્કસ સંખ્યામાં ફરે છે, સામાન્ય રીતે કોઈ લિસ્ટ અથવા રેન્જ દ્વારા. જ્યારે 'while loop' ત્યાં સુધી ફરતું રહેશે જ્યાં સુધી તેની શરત ખોટી (False) ના થાય. પાયથનમાં લૂપ બોડી દર્શાવવા માટે ઇન્ડેન્ટેશન (જગ્યા છોડવી) ફરજિયાત છે.",
        },
        {
          title: "ઉદાહરણો (Worked Examples)",
          body: "ઉદાહરણ 1: `for i in range(3): print(i)` 0, 1 અને 2 પ્રિન્ટ કરે છે. ઉદાહરણ 2: ગેમિંગ લૂપ `while playing == True:` પ્લેયર રમવાનું બંધ ન કરે ત્યાં સુધી ચાલ્યા કરે છે, અને ગેમ બંધ થતાં `playing` ની કિંમત False થાય છે.",
        },
        {
          title: "અભ્યાસ (Practice)",
          body: "`for x in range(5):` લૂપ તેની અંદરના કોડને કેટલી વાર ચલાવશે? (જવાબ: 5 વાર, x ની કિંમત 0 થી 4 સુધી બદલાશે).",
        },
      ],
    },
    ta: {
      title: "பைத்தானில் மடக்குகள் (Loops in Python)",
      description: "for மற்றும் while மடக்குகள்.",
      sections: [
        {
          title: "அறிமுகம் (Introduction)",
          body: "நிரலாக்கத்தில் (programming), ஒரு குறிப்பிட்ட குறியீட்டுத் தொகுதியை பல முறை மீண்டும் இயக்குவதற்கு மடக்குகள் (loops) பயன்படுத்தப்படுகின்றன. பைத்தான் இரு முக்கிய மடக்குகளை வழங்குகிறது: 'for' மடக்கு மற்றும் 'while' மடக்கு.",
        },
        {
          title: "முக்கிய கருத்து (Core Concept)",
          body: "ஒரு 'for மடக்கு' ஒரு குறிப்பிட்ட எண்ணிக்கையிலான முறைகள் இயங்கும் (உதாரணமாக ஒரு பட்டியலின் அல்லது எல்லையின் அடிப்படையில்). ஒரு 'while மடக்கு' அதன் நிபந்தனை False ஆகும் வரை தொடர்ந்து இயங்கும். பைத்தானில் மடக்கின் உள்ளடக்கத்தை வரையறுக்க சரியான உள்தள்ளல் (indentation) அவசியம்.",
        },
        {
          title: "தீர்க்கப்பட்ட உதாரணங்கள் (Worked Examples)",
          body: "உதாரணம் 1: `for i in range(3): print(i)` என்பது 0, 1, 2 ஆகியவற்றை அடுத்தடுத்து அச்சிடும். உதாரணம் 2: ஒரு விளையாட்டின் இயக்கம் `while playing == True: get_user_input()` என இருக்கும். விளையாட்டை முடிக்கும் போது `playing` மதிப்பு False ஆக மாற்றப்படும்.",
        },
        {
          title: "பயிற்சி (Practice)",
          body: "`for x in range(5):` என்ற குறியீடு அதன் உள்ளே உள்ள குறியீட்டை எத்தனை முறை இயக்கும்? (விடை: 5 முறை, x இன் மதிப்புகள் 0 முதல் 4 வரை இருக்கும்).",
        },
      ],
    },
    mr: {
      title: "पायथन मधील लूप्स (Loops in Python)",
      description: "फॉर लूप्स, व्हाईल लूप्स आणि पुनरावृत्ती.",
      sections: [
        {
          title: "ओळख (Introduction)",
          body: "प्रोग्रामिंगमध्ये, कोडचा एक गट वारंवार चालवण्यासाठी लूपचा वापर केला जातो. पायथन दोन मुख्य लूप प्रदान करतो: 'for' लूप (एखाद्या अनुक्रमावर फिरण्यासाठी) आणि 'while' लूप (जोपर्यंत अट सत्य आहे तोपर्यंत चालणारा).",
        },
        {
          title: "मुख्य संकल्पना (Core Concept)",
          body: "एक 'for loop' विशिष्ट संख्येने चालतो, सामान्यतः लिस्ट किंवा रेंजद्वारे. 'while loop' जोपर्यंत त्याची अट False होत नाही तोपर्यंत चालू राहतो. पायथनमध्ये लूपचा भाग दाखवण्यासाठी योग्य इंडेंटेशन (जागा सोडणे) आवश्यक आहे.",
        },
        {
          title: "सोडवलेली उदाहरणे (Worked Examples)",
          body: "उदाहरण १: `for i in range(3): print(i)` आधी 0, नंतर 1 आणि शेवटी 2 प्रिंट करते. उदाहरण २: गेममधील लूप `while playing == True: get_user_input()` खेळाडू गेम बंद करेपर्यंत चालू राहतो, ज्याने `playing` False होते.",
        },
        {
          title: "सराव (Practice)",
          body: "`for x in range(5):` हा लूप अंतर्गत कोड किती वेळा चालवेल? (उत्तर: ५ वेळा, x चे मूल्य ० ते ४ असेल).",
        },
      ],
    },
  },
  l6: {
    en: {
      title: "Quadratic Equations",
      description: "Solve equations of degree two.",
      sections: [
        {
          title: "Introduction",
          body: "A quadratic equation is a second-order polynomial equation in a single variable. The general form is ax² + bx + c = 0, where x represents an unknown, and a, b, and c are constants with a ≠ 0.",
        },
        {
          title: "Core Concept",
          body: "The solutions are called roots. They can be found using the Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a. The term (b² - 4ac) is the discriminant (D). If D > 0, roots are real and distinct. If D = 0, roots are real and equal. If D < 0, roots are complex.",
        },
        {
          title: "Worked Examples",
          body: "Example: Solve x² - 5x + 6 = 0. Here, a=1, b=-5, c=6. Discriminant D = (-5)² - 4(1)(6) = 25 - 24 = 1. Roots are x = (5 ± √1)/2. So x = (5+1)/2 = 3, and x = (5-1)/2 = 2. The roots are 2 and 3.",
        },
        {
          title: "Practice",
          body: "Find the roots of x² - 4x + 4 = 0. Hint: This is a perfect square trinomial (x - 2)² = 0. (Answer: x = 2, equal roots).",
        },
      ],
    },
    hi: {
      title: "द्विघात समीकरण (Quadratic Equations)",
      description: "द्वितीय घात के समीकरणों को हल करें।",
      sections: [
        {
          title: "परिचय (Introduction)",
          body: "द्विघात समीकरण एक चर में द्वितीय श्रेणी का बहुपद समीकरण है। इसका सामान्य रूप ax² + bx + c = 0 होता है, जहाँ x एक अज्ञात चर है, और a, b, और c अचर गुणांक हैं जहाँ a ≠ 0।",
        },
        {
          title: "मुख्य अवधारणा (Core Concept)",
          body: "इनके हलों को मूल (roots) कहा जाता है। इन्हें श्रीधराचार्य सूत्र से ज्ञात किया जा सकता है: x = (-b ± √(b² - 4ac)) / 2a। पद (b² - 4ac) को विविक्तकर (Discriminant - D) कहा जाता है। यदि D > 0, मूल वास्तविक और भिन्न होंगे। यदि D = 0, मूल वास्तविक और समान होंगे।",
        },
        {
          title: "हल किए गए उदाहरण (Worked Examples)",
          body: "उदाहरण: x² - 5x + 6 = 0 को हल करें। यहाँ a=1, b=-5, c=6। विविक्तकर D = (-5)² - 4(1)(6) = 25 - 24 = 1। मूल होंगे x = (5 ± √1)/2। अतः x = 3 और x = 2। मूल 2 और 3 हैं।",
        },
        {
          title: "अभ्यास (Practice)",
          body: "x² - 4x + 4 = 0 के मूल ज्ञात करें। संकेत: यह एक पूर्ण वर्ग (x - 2)² = 0 है। (उत्तर: x = 2, दोनों मूल समान हैं)।",
        },
      ],
    },
    gu: {
      title: "દ્વિઘાત સમીકરણો (Quadratic Equations)",
      description: "દ્વિઘાત સમીકરણો ઉકેલો.",
      sections: [
        {
          title: "પરિચય (Introduction)",
          body: "દ્વિઘાત સમીકરણ એ બે ઘાત ધરાવતું બહુપદી સમીકરણ છે. તેનું સામાન્ય સ્વરૂપ ax² + bx + c = 0 છે, જ્યાં x એ અજ્ઞાત ચલ છે, અને a, b, અને c અચળાંકો છે જ્યાં a ≠ 0.",
        },
        {
          title: "મુખ્ય ખ્યાલ (Core Concept)",
          body: "તેના ઉકેલોને તેના ઉકેલ અથવા બીજ (roots) કહે છે. તેને આ સૂત્ર દ્વારા શોધી શકાય છે: x = (-b ± √(b² - 4ac)) / 2a. પદ (b² - 4ac) ને વિવેચક (D) કહે છે. જો D > 0, બીજ વાસ્તવિક અને ભિન્ન મળે. જો D = 0, બીજ વાસ્તવिक અને સમાન મળે. જો D < 0, બીજ કાલ્પનિક મળે.",
        },
        {
          title: "ઉદાહરણો (Worked Examples)",
          body: "ઉદાહરણ: x² - 5x + 6 = 0 ઉકેલો. અહીં a=1, b=-5, c=6. વિવેચક D = (-5)² - 4(1)(6) = 25 - 24 = 1. બીજ x = (5 ± √1)/2 મળશે. તેથી x = (5+1)/2 = 3 અને x = (5-1)/2 = 2. આમ, બીજ 2 અને 3 છે.",
        },
        {
          title: "અભ્યાસ (Practice)",
          body: "x² - 4x + 4 = 0 ના બીજ શોધો. સંકેત: આ એક પૂર્ણવર્ગ પદાવલિ (x - 2)² = 0 છે. (જવાબ: x = 2, સમાન બીજ).",
        },
      ],
    },
    ta: {
      title: "இருபடிச் சமன்பாடுகள் (Quadratic Equations)",
      description: "இருபடிச் சமன்பாடுகளைத் தீர்க்கவும்.",
      sections: [
        {
          title: "அறிமுகம் (Introduction)",
          body: "இருபடிச் சமன்பாடு என்பது ஒரு மாறியைக் கொண்ட இரண்டாம் படி பல்லுறுப்புக் கோவைச் சமன்பாடாகும். இதன் பொதுவான வடிவம் ax² + bx + c = 0 ஆகும், இதில் x என்பது தெரியாத மதிப்பு, a, b மற்றும் c ஆகியவை மாறிலிகள் (a ≠ 0).",
        },
        {
          title: "முக்கிய கருத்து (Core Concept)",
          body: "இதன் தீர்வுகள் மூலங்கள் (roots) என அழைக்கப்படுகின்றன. இருபடிச் சூத்திரத்தைப் பயன்படுத்தி இவற்றைக் கண்டறியலாம்: x = (-b ± √(b² - 4ac)) / 2a. இங்கு (b² - 4ac) என்பது தன்மைகாட்டி (Discriminant - D) ஆகும். D > 0 எனில் மூலங்கள் மெய் மற்றும் வெவ்வேறானவை. D = 0 எனில் மெய் மற்றும் சமமானவை.",
        },
        {
          title: "தீர்க்கப்பட்ட உதாரணங்கள் (Worked Examples)",
          body: "எடுத்துக்காட்டு: x² - 5x + 6 = 0 ஐத் தீர்க்கவும். இங்கு a=1, b=-5, c=6. தன்மைகாட்டி D = (-5)² - 4(1)(6) = 25 - 24 = 1. மூலங்கள் x = (5 ± √1)/2. எனவே x = 3 மற்றும் x = 2. மூலங்கள் 2 மற்றும் 3 ஆகும்.",
        },
        {
          title: "பயிற்சி (Practice)",
          body: "x² - 4x + 4 = 0 இன் மூலங்களைக் காண்க. குறிப்பு: இது ஒரு முழு வர்க்கக் கோவை (x - 2)² = 0. (விடை: x = 2, சமமான மூலங்கள்).",
        },
      ],
    },
    mr: {
      title: "वर्गसमीकरणे (Quadratic Equations)",
      description: "वर्गसमीकरणे सोडवा.",
      sections: [
        {
          title: "ओळख (Introduction)",
          body: "वर्गसमीकरण हे एका चलातील द्वितीय घाताचे बहुपदी समीकरण असते. त्याचे सर्वसाधारण रूप ax² + bx + c = 0 असे असते, जिथे x हे चल आहे आणि a, b, c हे स्थिरांक असून a ची किंमत शून्य नसावी (a ≠ 0).",
        },
        {
          title: "मुख्य संकल्पना (Core Concept)",
          body: "या समीकरणाच्या उकलींना मुळे (roots) म्हणतात. ती खालील सूत्राने काढली जातात: x = (-b ± √(b² - 4ac)) / 2a. सूत्रामधील (b² - 4ac) या भागाला विवेचक (Discriminant - D) म्हणतात. जर D > 0 असेल तर मुळे वास्तव आणि भिन्न असतात, जर D = 0 असेल तर मुळे वास्तव आणि समान असतात.",
        },
        {
          title: "सोडवलेली उदाहरणे (Worked Examples)",
          body: "उदाहरण: x² - 5x + 6 = 0 सोडवा. येथे a=1, b=-5, c=6. विवेचक D = (-5)² - 4(1)(6) = 25 - 24 = 1. मुळे काढू: x = (5 ± √1)/2. म्हणून x = (5+1)/2 = 3 आणि x = (5-1)/2 = 2. मुळे 2 आणि 3 आहेत.",
        },
        {
          title: "सराव (Practice)",
          body: "x² - 4x + 4 = 0 या समीकरणाची मुळे काढा. संकेत: हा पूर्ण वर्ग आहे (x - 2)² = 0. (उत्तर: x = 2, समान मुळे).",
        },
      ],
    },
  },
  l7: {
    en: {
      title: "Thermodynamics Basics",
      description: "Energy, heat, and the laws of thermodynamics.",
      sections: [
        {
          title: "Introduction",
          body: "Thermodynamics is the branch of physics that deals with the relationships between heat, work, temperature, and energy. It describes how thermal energy is converted to and from other forms of energy.",
        },
        {
          title: "Core Concept",
          body: "The First Law of Thermodynamics is the Law of Conservation of Energy: ΔU = Q - W (change in internal energy equals heat added minus work done by system). The Second Law states that entropy (disorder) of an isolated system always increases over time, meaning heat flows naturally from hot to cold.",
        },
        {
          title: "Worked Examples",
          body: "Example 1: Heating a gas inside a container pushes a piston upward. The heat energy added (Q) increases the gas kinetic energy (ΔU) and performs mechanical work (W) in raising the piston. Example 2: Refrigerator cooling requires external electrical work to force heat from a cold zone to a warm zone.",
        },
        {
          title: "Practice",
          body: "If 100 Joules of heat is added to a gas cylinder and the gas performs 40 Joules of work pushing the piston, what is the increase in internal energy? Use ΔU = Q - W. (Answer: 60 Joules).",
        },
      ],
    },
    hi: {
      title: "ऊष्मागतिकी के मूल सिद्धांत (Thermodynamics Basics)",
      description: "ऊर्जा, ऊष्मा और ऊष्मागतिकी के नियम।",
      sections: [
        {
          title: "परिचय (Introduction)",
          body: "ऊष्मागतिकी भौतिकी की वह शाखा है जो ऊष्मा, कार्य, तापमान और ऊर्जा के बीच संबंधों से संबंधित है। यह वर्णन करती है कि तापीय ऊर्जा अन्य प्रकार की ऊर्जा में कैसे परिवर्तित होती है।",
        },
        {
          title: "मुख्य अवधारणा (Core Concept)",
          body: "ऊष्मागतिकी का पहला नियम ऊर्जा संरक्षण का नियम है: ΔU = Q - W (आंतरिक ऊर्जा में परिवर्तन = जोड़ी गई ऊष्मा - किया गया कार्य)। दूसरा नियम कहता है कि एक पृथक प्रणाली की एंट्रॉपी (अव्यवस्था) हमेशा बढ़ती है, जिसका अर्थ है कि ऊष्मा स्वाभाविक रूप से गर्म से ठंडे की ओर बहती है।",
        },
        {
          title: "हल किए गए उदाहरण (Worked Examples)",
          body: "उदाहरण 1: एक कंटेनर के अंदर गैस को गर्म करने पर पिस्टन ऊपर की ओर धकेलता है। जोड़ी गई ऊष्मा (Q) गैस की आंतरिक ऊर्जा (ΔU) को बढ़ाती है और पिस्टन को उठाने में यांत्रिक कार्य (W) करती है। उदाहरण 2: रेफ्रिजरेटर में ठंडक के लिए बाहरी विद्युत कार्य की आवश्यकता होती है।",
        },
        {
          title: "अभ्यास (Practice)",
          body: "यदि गैस सिलेंडर में 100 जूल ऊष्मा जोड़ी जाती है और गैस पिस्टन को धकेलने में 40 जूल कार्य करती है, तो आंतरिक ऊर्जा में कितनी वृद्धि होगी? ΔU = Q - W का उपयोग करें। (उत्तर: 60 जूल (Joules))।",
        },
      ],
    },
    gu: {
      title: "થર્મોડાયનેમિક્સના મૂળભૂત નિયમો (Thermodynamics Basics)",
      description: "ઉર્જા, ઉષ્મા અને થર્મોડાયનેમિક્સના નિયમો.",
      sections: [
        {
          title: "પરિચય (Introduction)",
          body: "થર્મોડાયનેમિક્સ એ ભૌતિકશાસ્ત્રની તે શાખા છે જે ઉષ્મા, કાર્ય, તાપમાન અને ઉર્જા વચ્ચેના સંબંધો સાથે વ્યવહાર કરે છે. તે સમજાવે છે કે તાપીય ઉર્જા અન્ય ઉર્જા સ્વરૂપોમાં કેવી રીતે રૂપાંતરિત થાય છે.",
        },
        {
          title: "મુખ્ય ખ્યાલ (Core Concept)",
          body: "થર્મોડાયનેમિક્સનો પ્રથમ નિયમ એ ઉર્જા સંરક્ષણનો નિયમ છે: ΔU = Q - W (આંતરિક ઉર્જામાં થતો ફેરફાર એ મેળવેલી ઉષ્મા અને થયેલા કાર્યના તફાવત બરાબર હોય છે). બીજો નિયમ દર્શાવે છે કે બ્રહ્માંડની એન્ટ્રોપી (અવ્યવસ્થા) હંમેશાં વધે છે, એટલે કે ઉષ્મા આપમેળે ગરમ પદાર્થથી ઠંડા પદાર્થ તરફ વહે છે.",
        },
        {
          title: "ઉદાહરણો (Worked Examples)",
          body: "ઉદાહરણ 1: પાત્રમાં રહેલા વાયુને ગરમ કરવાથી તે પિસ્ટનને ઉપર ધકેલે છે. આપેલી ઉષ્મા (Q) વાયુની આંતરિક ઉર્જા (ΔU) વધારે છે અને પિસ્ટનને ઊંચકવા માટે યાંત્રિક કાર્ય (W) કરે છે. ઉદાહરણ 2: રેફ્રિજરેટરમાં ઠંડક મેળવવા માટે બાહ્ય વિદ્યુત કાર્ય કરવું પડે છે.",
        },
        {
          title: "અભ્યાસ (Practice)",
          body: "જો વાયુના પાત્રને 100 જૂલ ઉષ્મા આપવામાં આવે અને વાયુ પિસ્ટન ધકેલવા માટે 40 જૂલ કાર્ય કરે, તો આંતરિક ઉર્જામાં કેટલો વધારો થશે? ΔU = Q - W નો ઉપયોગ કરો. (જવાબ: 60 જૂલ).",
        },
      ],
    },
    ta: {
      title: "வெப்ப இயக்கவியல் அடிப்படைகள் (Thermodynamics Basics)",
      description: "ஆற்றல், வெப்பம் மற்றும் வெப்ப இயக்கவியல் விதிகள்.",
      sections: [
        {
          title: "அறிமுகம் (Introduction)",
          body: "வெப்ப இயக்கவியல் என்பது வெப்பம், வேலை, வெப்பநிலை மற்றும் ஆற்றல் ஆகியவற்றுக்கு இடையேயான உறவுகளைக் கையாளும் இயற்பியலின் ஒரு பிரிவாகும். இது வெப்ப ஆற்றல் எவ்வாறு பிற ஆற்றல் வடிவங்களாக மாற்றப்படுகிறது என்பதை விவரிக்கிறது.",
        },
        {
          title: "முக்கிய கருத்து (Core Concept)",
          body: "வெப்ப இயக்கவியலின் முதல் விதி ஆற்றல் அழிவின்மை விதியாகும்: ΔU = Q - W (உள் ஆற்றலில் ஏற்படும் மாற்றம் என்பது உட்செலுத்தப்பட்ட வெப்பத்திற்கும் செய்யப்பட்ட வேலைக்கும் உள்ள வித்தியாசமாகும்). இரண்டாவது விதி, ஒரு தனிமைப்படுத்தப்பட்ட அமைப்பின் ஒழுங்கின்மை (entropy) எப்போதும் அதிகரிக்கும் என்கிறது, அதாவது வெப்பம் எப்போதும் சூடான இடத்திலிருந்து குளிர்ந்த இடத்திற்குச் செல்லும்.",
        },
        {
          title: "தீர்க்கப்பட்ட உதாரணங்கள் (Worked Examples)",
          body: "உதாரணம் 1: ஒரு கொள்கலனில் உள்ள வாயுவை வெப்பப்படுத்தும்போது அது பிஸ்டனை மேலே தள்ளுகிறது. கொடுக்கப்பட்ட வெப்பம் (Q) வாயுவின் உள் ஆற்றலை (ΔU) அதிகரித்து பிஸ்டனை உயர்த்தும் வேலையைச் (W) செய்கிறது. உதாரணம் 2: குளிர்சாதனப் பெட்டியில் வெப்பத்தை குளிர்ச்சியான பகுதியிலிருந்து வெளியேற்ற வெளி வேலை தேவைப்படுகிறது.",
        },
        {
          title: "பயிற்சி (Practice)",
          body: "ஒரு வாயு உருளைக்கு 100 ஜூல் வெப்பம் வழங்கப்பட்டு, அது பிஸ்டனைத் தள்ள 40 ஜூல் வேலை செய்தால், அதன் உள் ஆற்றல் அதிகரிப்பு என்ன? ΔU = Q - W ஐப் பயன்படுத்தவும். (விடை: 60 ஜூல்).",
        },
      ],
    },
    mr: {
      title: "उष्मागतिकीचे मूलभूत नियम (Thermodynamics Basics)",
      description: "ऊर्जा, उष्णता आणि उष्मागतिकीचे नियम.",
      sections: [
        {
          title: "ओळख (Introduction)",
          body: "उष्मागतिकी (Thermodynamics) ही भौतिकशास्त्राची अशी शाखा आहे जी उष्णता, कार्य, तापमान आणि ऊर्जा यांच्यातील परस्पर संबंधांचा अभ्यास करते. उष्णतेचे इतर उर्जेमध्ये कसे रूपांतर होते हे याद्वारे स्पष्ट केले जाते.",
        },
        {
          title: "मुख्य संकल्पना (Core Concept)",
          body: "उष्मागतिकीचा पहिला नियम ऊर्जा संवर्धनाचा नियम आहे: ΔU = Q - W (अंतर्गत ऊर्जेतील बदल = दिलेली उष्णता - केलेले कार्य). दुसरा नियम असे सांगतो की, कोणत्याही विलग प्रणालीची एंट्रॉपी (अव्यवस्था) नेहमी वाढत जाते, म्हणजेच उष्णता नैसर्गिकरित्या उष्ण वस्तूकडून थंड वस्तूकडे वाहते.",
        },
        {
          title: "सोडवलेली उदाहरणे (Worked Examples)",
          body: "उदाहरण १: सिलिंडरमधील वायूला उष्णता दिल्यास तो पिस्टनला वर ढकलतो. दिलेली उष्णता (Q) वायूची अंतर्गत ऊर्जा (ΔU) वाढवते आणि पिस्टन उचलण्यासाठी यांत्रिक कार्य (W) करते. उदाहरण २: फ्रिजमध्ये थंड हवेसाठी बाह्य विद्युत उर्जेचे कार्य करावे लागते.",
        },
        {
          title: "सराव (Practice)",
          body: "जर सिलिंडरमधील वायूला १०० जूल उष्णता दिली आणि वायूने पिस्टन ढकलण्यासाठी ४० जूल कार्य केले, तर अंतर्गत ऊर्जेतील वाढ किती असेल? ΔU = Q - W वापरा. (उत्तर: ६० जूल).",
        },
      ],
    },
  },
  l8: {
    en: {
      title: "Photosynthesis",
      description: "How plants convert light into energy.",
      sections: [
        {
          title: "Introduction",
          body: "Photosynthesis is the biological process used by plants, algae, and certain bacteria to harness light energy from the sun and convert it into chemical energy (glucose), releasing oxygen as a byproduct.",
        },
        {
          title: "Core Concept",
          body: "The chemical equation is: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂. It takes place inside chloroplasts, which contain chlorophyll (the green pigment that absorbs light). The process is divided into light-dependent reactions (making ATP) and light-independent reactions (Calvin Cycle, making sugars).",
        },
        {
          title: "Worked Examples",
          body: "Example 1: Green leaves appear green because chlorophyll absorbs blue and red wavelengths of light but reflects green light. Example 2: In dense forests, undergrowth plants have wide, thin leaves to maximize the capture of limited sunlight filtering through the canopy.",
        },
        {
          title: "Practice",
          body: "Which gas do plants absorb from the atmosphere for photosynthesis, and which gas do they release into the air? (Answer: Absorb Carbon Dioxide (CO₂), release Oxygen (O₂)).",
        },
      ],
    },
    hi: {
      title: "प्रकाश संश्लेषण (Photosynthesis)",
      description: "पौधे प्रकाश को ऊर्जा में कैसे बदलते हैं।",
      sections: [
        {
          title: "परिचय (Introduction)",
          body: "प्रकाश संश्लेषण वह जैविक प्रक्रिया है जिसके द्वारा हरे पौधे, शैवाल और कुछ बैक्टीरिया सूर्य के प्रकाश की ऊर्जा का उपयोग करके उसे रासायनिक ऊर्जा (ग्लूकोज) में बदलते हैं और सह-उत्पाद के रूप में ऑक्सीजन छोड़ते हैं।",
        },
        {
          title: "मुख्य अवधारणा (Core Concept)",
          body: "इसका रासायनिक समीकरण है: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ + 6O₂। यह प्रक्रिया क्लोरोप्लास्ट (हरितलवक) के अंदर होती है, जिसमें क्लोरोफिल (प्रकाश को अवशोषित करने वाला हरा वर्णक) होता है। यह प्रक्रिया प्रकाश-निर्भर प्रतिक्रियाओं और प्रकाश-स्वतंत्र प्रतिक्रियाओं (केल्विन चक्र) में विभाजित है।",
        },
        {
          title: "हल किए गए उदाहरण (Worked Examples)",
          body: "उदाहरण 1: हरी पत्तियां हरी दिखाई देती हैं क्योंकि क्लोरोफिल नीले और लाल रंग के प्रकाश को अवशोषित करता है लेकिन हरे रंग को परावर्तित करता है। उदाहरण 2: घने जंगलों में उगने वाले छोटे पौधों की पत्तियां चौड़ी होती हैं ताकि वे छन कर आने वाले कम प्रकाश को भी अवशोषित कर सकें।",
        },
        {
          title: "अभ्यास (Practice)",
          body: "प्रकाश संश्लेषण के लिए पौधे वायुमंडल से कौन सी गैस अवशोषित करते हैं, और हवा में कौन सी गैस छोड़ते हैं? (उत्तर: कार्बन डाइऑक्साइड (CO₂) अवशोषित करते हैं, ऑक्सीजन (O₂) छोड़ते हैं)।",
        },
      ],
    },
    gu: {
      title: "પ્રકાશસંશ્લેષણ (Photosynthesis)",
      description: "વનસ્પતિઓ પ્રકાશને ઉર્જામાં કેવી રીતે રૂપાંતરિત કરે છે.",
      sections: [
        {
          title: "પરિચય (Introduction)",
          body: "પ્રકાશસંશ્લેષણ એ એક જૈવિક પ્રક્રિયા છે જે વનસ્પતિ, લીલ અને અમુક બેક્ટેરિયા દ્વારા સૂર્યપ્રકાશની ઉર્જાનો ઉપયોગ કરીને તેને રાસાયણિક ઉર્જા (ગ્લુકોઝ) માં રૂપાંતરિત કરવા માટે થાય છે, અને આડપેદાશ તરીકે ઓક્સિજન મુક્ત થાય છે.",
        },
        {
          title: "મુખ્ય ખ્યાલ (Core Concept)",
          body: "તેનું રાસાયણિક સમીકરણ છે: 6CO₂ + 6H₂O + પ્રકાશ ઉર્જા → C₆H₁₂O₆ + 6O₂. આ પ્રક્રિયા હરિતકણ (chloroplast) ની અંદર થાય છે, જેમાં હરિતદ્રવ્ય (chlorophyll) નામનું રંજકદ્રવ્ય આવેલું હોય છે. આ પ્રક્રિયા પ્રકાશ-આધારિત પ્રક્રિયાઓ અને કેલ્વિન ચક્ર (પ્રકાશ-મુક્ત પ્રક્રિયાઓ) માં વિભાજિત છે.",
        },
        {
          title: "ઉદાહરણો (Worked Examples)",
          body: "ઉદાહરણ 1: લીલા પાંદડાઓ લીલા દેખાય છે કારણ કે હરિતદ્રવ્ય વાદળી અને લાલ પ્રકાશનું શોષણ કરે છે પરંતુ લીલા પ્રકાશને પરાવર્તિત કરે છે. ઉદાહરણ 2: ગીચ જંગલોમાં નાના છોડના પાંદડા પહોળા અને પાતળા હોય છે જેથી તે મર્યાદિત સૂર્યપ્રકાશ પણ મેળવી શકે.",
        },
        {
          title: "અભ્યાસ (Practice)",
          body: "વનસ્પતિઓ પ્રકાશસંશ્લેષણ માટે વાતાવરણમાંથી કયો વાયુ મેળવે છે, અને હવામાં કયો વાયુ મુક્ત કરે છે? (જવાબ: કાર્બન ડાયોક્સાઇડ (CO₂) મેળવે છે, ઓક્સિજન (O₂) મુક્ત કરે છે).",
        },
      ],
    },
    ta: {
      title: "ஒளிச்சேர்க்கை (Photosynthesis)",
      description: "தாவரங்கள் ஒளியை ஆற்றலாக எவ்வாறு மாற்றுகின்றன.",
      sections: [
        {
          title: "அறிமுகம் (Introduction)",
          body: "ஒளிச்சேர்க்கை என்பது தாவரங்கள், பாசிகள் மற்றும் சில பாக்டீரியாக்கள் சூரிய ஒளியைப் பயன்படுத்தி அதை வேதி ஆற்றலாக (குளுக்கோஸ்) மாற்றி, ஆக்சிஜனை வெளியேற்றும் உயிரியல் செயல்முறையாகும்.",
        },
        {
          title: "முக்கிய கருத்து (Core Concept)",
          body: "இதன் வேதியியல் சமன்பாடு: 6CO₂ + 6H₂O + ஒளி ஆற்றல் → C₆H₁₂O₆ + 6O₂. இது பசுங்கணிகத்தினுள் (chloroplasts) நடைபெறுகிறது, இதில் பச்சையம் (chlorophyll) என்ற நிறமி உள்ளது. இது ஒளி சார்ந்த வினைகள் மற்றும் ஒளி சாரா வினைகள் (கால்வின் சுழற்சி) என இரு பிரிவுகளாக பிரிக்கப்பட்டுள்ளது.",
        },
        {
          title: "தீர்க்கப்பட்ட உதாரணங்கள் (Worked Examples)",
          body: "உதாரணம் 1: பச்சைய நிறமி நீலம் மற்றும் சிவப்பு ஒளியை உறிஞ்சி பச்சை ஒளியை எதிரொளிப்பதால் இலைகள் நமக்கு பச்சையாகத் தெரிகின்றன. உதாரணம் 2: அடர்ந்த காடுகளில் கீழே வளரும் தாவரங்கள் குறைந்த சூரிய ஒளியையும் ஈர்ப்பதற்காக அகலமான இலைகளைக் கொண்டுள்ளன.",
        },
        {
          title: "பயிற்சி (Practice)",
          body: "ஒளிச்சேர்க்கைக்காக தாவரங்கள் வளிமண்டலத்திலிருந்து உறிஞ்சும் வாயு எது, அவை வெளியிடும் வாயு எது? (விடை: கார்பன் டை ஆக்சைடை (CO₂) உறிஞ்சி, ஆக்சிஜனை (O₂) வெளியிடுகின்றன).",
        },
      ],
    },
    mr: {
      title: "प्रकाशसंश्लेषण (Photosynthesis)",
      description: "वनस्पती प्रकाशाचे ऊर्जेत कसे रूपांतर करतात.",
      sections: [
        {
          title: "ओळख (Introduction)",
          body: "प्रकाशसंश्लेषण ही वनस्पती, शेवाळ आणि काही जीवाणूंद्वारे सूर्यप्रकाशाचा वापर करून त्याचे रासायनिक ऊर्जेत (ग्लुकोज) रूपांतर करण्याची आणि ऑक्सिजन वायू बाहेर सोडण्याची जैविक प्रक्रिया आहे.",
        },
        {
          title: "मुख्य संकल्पना (Core Concept)",
          body: "रासायनिक समीकरण असे आहे: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ + 6O₂. ही प्रक्रिया हरितलवकात (chloroplast) होते, ज्यामध्ये हरितद्रव्य (chlorophyll) असते. या प्रक्रियेचे दोन भाग असतात: प्रकाश-आधारित आणि प्रकाश-स्वतंत्र (कॅल्विन चक्र) अभिक्रिया.",
        },
        {
          title: "सोडवलेली उदाहरणे (Worked Examples)",
          body: "उदाहरण १: वनस्पतींची पाने हिरवी दिसतात कारण हरितद्रव्य निळ्या आणि लाल रंगाचा प्रकाश शोषून घेते आणि हिरवा प्रकाश परावर्तित करते. उदाहरण २: घनदाट जंगलात लहान रोपट्यांची पाने रुंद असतात जेणेकरून ती जास्तीत जास्त सूर्यप्रकाश मिळवू शकतील.",
        },
        {
          title: "सराव (Practice)",
          body: "प्रकाशसंश्लेषणासाठी वनस्पती हवेतून कोणता वायू शोषून घेतात आणि कोणता वायू बाहेर सोडतात? (उत्तर: कार्बन डायऑक्साईड (CO₂) शोषून घेतात, ऑक्सिजन (O₂) बाहेर सोडतात).",
        },
      ],
    },
  },
};

export function getTranslatedLesson(lessonId: string, langCode: string): LessonTranslation | null {
  const translations = LESSON_TRANSLATIONS[lessonId];
  if (translations) {
    return translations[langCode] || translations["en"];
  }
  return null;
}
