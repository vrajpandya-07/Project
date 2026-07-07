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
};

export function getTranslatedLesson(lessonId: string, langCode: string): LessonTranslation | null {
  const translations = LESSON_TRANSLATIONS[lessonId];
  if (translations) {
    return translations[langCode] || translations["en"];
  }
  return null;
}
