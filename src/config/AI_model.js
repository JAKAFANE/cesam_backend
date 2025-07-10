const { GoogleGenAI } = require("@google/genai") ;


const ai = new GoogleGenAI({ apiKey: "AIzaSyC0L0xP0CCSw3dK0otVAU5TYmANhyicELo" });


const resume = async (questions) => {
  let corpus = "";
  questions.forEach((i) =>{
    corpus += " "+ i + ";"
  })

  let  resumeQuestions = `Voici une liste de questions d'évaluation: ${corpus} .  Résume en une phrase le périmètre de sécurité couvert par ces questions.`
  const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: resumeQuestions,
    });
  
  console.log('response from AI:', response.text )
  const resumeText =  response.text;
  // console.log('resume result:', resumeText )
  return resumeText;
}



const recommandation = async(nomCp, scoreCp, criticiteCp, resumeText) => {

  let prompt = `
  Le point de contrôle « ${nomCp} » a été évalué à travers plusieurs entités.
  Score global obtenu : ${(scoreCp * 100).toFixed(2)}% — Criticité : ${criticiteCp}. Ce point de contrôle couvre les aspects suivants : ${resumeText} . Propose une liste claire et concise des recommandations globales et prioritaires pour améliorer la sécurité de ce point de contrôle. (donne juste les grands titres sans entrer dans les détails)
  `;

  const recoResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

  console.log('recoResponse from AI:', recoResponse.text )
  const recoText = recoResponse.text;
  // console.log('recoText from AI:',recoText);
  return recoText ;
}


module.exports =  { resume, recommandation };
