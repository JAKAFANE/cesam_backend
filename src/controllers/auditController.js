const express = require("express");
const { Op } = require("sequelize");
const { 
  Branch, 
  Domain, 
  SubDomain, 
  ControlPoint, 
  Question, 
  Evaluation, 

} = require("../models");

const router = express.Router();

// Create a new audit branch
router.post("/branches", async (req, res) => {
  try {
    const { name,description, missionId } = req.body;
    const branch = await Branch.create({ name_br: name, description_br: description , missionId:missionId });
    res.status(201).json(branch);
  } catch (error) {
    console.error("Error creating branch:", error);
    res.status(500).json({ error: "Unable to create branch" });
  }
});

// Get all audit branches
router.get("/branches", async (_req, res) => {
  try {
    const branches = await Branch.findAll();
    res.status(200).json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ error: "Unable to fetch branches" });
  }
});

// Create a new domain under a branch
router.post("/domains", async (req, res) => {
  try {
    const { name, branchId } = req.body;
    const domain = await Domain.create({ name_dom: name, branchId: branchId });
    res.status(201).json(domain);
  } catch (error) {
    console.error("Error creating domain:", error);
    res.status(500).json({ error: "Unable to create domain" });
  }
});

// Get domains under a specific branch
router.get("/domains/:branchId", async (req, res) => {
  try {
    const { branchId } = req.params;
    const domains = await Domain.findAll({ where: { branchId: branchId } });
    res.status(200).json(domains);
  } catch (error) {
    console.error("Error fetching domains:", error);
    res.status(500).json({ error: "Unable to fetch domains" });
  }
});

// Create a new sub-domain under a domain
router.post("/subdomains", async (req, res) => {
  try {
    const { name, domainId } = req.body;
    const subDomain = await SubDomain.create({ name_sdom: name, domainId:domainId });
    res.status(201).json(subDomain);
  } catch (error) {
    console.error("Error creating sub-domain:", error);
    res.status(500).json({ error: "Unable to create sub-domain" });
  }
});

// Get sub-domains under a specific domain
router.get("/subdomains/:domainId", async (req, res) => {
  try {
    const { domainId } = req.params;
    const subDomains = await SubDomain.findAll({ where: { domainId:domainId } });
    res.status(200).json(subDomains);
  } catch (error) {
    console.error("Error fetching sub-domains:", error);
    res.status(500).json({ error: "Unable to fetch sub-domains" });
  }
});

// Create a new control point under a sub-domain
router.post("/controlpoints", async (req, res) => {
  try {
    const { name, subDomainId, poids } = req.body;
    const controlPoint = await ControlPoint.create({ name_cp: name, subDomainId:subDomainId, poids_cp: poids });
    res.status(201).json(controlPoint);
  } catch (error) {
    console.error("Error creating control point:", error);
    res.status(500).json({ error: "Unable to create control point" });
  }
});

// Get control points under a specific sub-domain
router.get("/controlpoints/:subDomainId", async (req, res) => {
  try {
    const { subDomainId } = req.params;
    const controlPoints = await ControlPoint.findAll({ where: { subDomainId: subDomainId } });
    res.status(200).json(controlPoints);
  } catch (error) {
    console.error("Error fetching control points:", error);
    res.status(500).json({ error: "Unable to fetch control points" });
  }
});

// Create a new question for a control point
router.post("/questions", async (req, res) => {
  try {
    const { questionText, controlPointId } = req.body;
    const question = await Question.create({ questionText: questionText, controlPointId: controlPointId });
    res.status(201).json(question);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Unable to create question" });
  }
});

// Get all questions for a specific control point
router.get("/questions/:controlPointId", async (req, res) => {
  try {
    const { controlPointId } = req.params;
    const questions = await Question.findAll({ where: { controlPointId: controlPointId } });
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Unable to fetch questions" });
  }
});

//EDIT WEIGHT

router.put("/updateWeight", async (req, res) => {
  try {
    
    const { id,weight } = req.body;

    const domain = await Domain.findByPk(id);
    if (!domain) {
      return res.status(404).json({ error: "domain not found" });
    }

    await domain.update({ weight:weight });
    return res.status(200).json({ message: "domain updated successfully" });
  } catch (error) {
    console.error("Error updating domain:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


/**
 * @route POST /api/audit/start-evaluation
 * @desc Start a new evaluation for a control point
 */
router.post("/collectanswer", async (req, res) => {

  try {

    // console.log("Reçu dans req.body:", req.body);
    // console.log(req.body[0])
    const evaluations  = req.body;

    console.log(evaluations[0])
    
    if (!Array.isArray(evaluations) || evaluations.some(e => !("subjectId" in e) || !("questionId" in e) || !("answer" in e))) {
      return res.status(400).json({ message: "Format invalide. Attendu: [{ subjectId, questionId, answer }]" });
    };

    for (const evalSub of evaluations) {
      await Evaluation.upsert(evalSub)
    }

    return res.status(201).json({
      message: `The answer of subject registered successfully`
      
    });
  } catch (error) {
    console.error("Error registering answer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// router.post("/evalIndiv", async (req, res) => {

//   try {
//     const { subjectId } = req.body;

//     // Récupérer les évaluations
//     const evaluations = await Evaluation.findAll({ where: { subjectId: subjectId } });
//     if (evaluations.length === 0) return res.status(404).json({ message: "Aucune évaluation trouvée" });

//     // Calcul du score
//     const totalQuestions = evaluations.length;
//     const totalOui = evaluations.filter((e) => e.answer === true).length;

//     console.log(totalQuestions);
//     console.log(totalOui);

//     const score = (totalOui / totalQuestions) * 100;

//     return res.json({ subjectId: subjectId, score:score });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }

// });

const scoreSujet = async (subjectId, controlPointId) => {

  const questions = await Question.findAll({where: {controlPointId: controlPointId}, attributes: ["id_qst"]})

  const questionIds = questions.map(q => q.id_qst)

  if (questionIds.length === 0) {
    return 0
  }

  const totalQuestions = await Evaluation.count({ where: {subjectId: subjectId, questionId: questionIds}});
  const totalOui = await Evaluation.count({ where : { subjectId: subjectId,questionId:questionIds, answer: true}});

  // console.log(`nombre de question ${totalQuestions}`)
  // console.log(`nombre de oui ${totalOui}`)

  if (totalQuestions === 0 ) return 0;

  return totalOui/totalQuestions;
  
};

const determinerCriticite = (score) => {
  if (score < 0 || score > 1) {
    throw new Error("Le score doit être compris entre 0 et 1.");
  }

  let niveau;

  switch (true) {
    case (score === 1):
      niveau = "Optimisé (Niveau 5)";
      break;
    case (score >= 0.95):
      niveau = "Excellence (Niveau 4.7)";
      break;
    case (score >= 0.90):
      niveau = "Géré quantitativement avancé (Niveau 4.3)";
      break;
    case (score >= 0.85):
      niveau = "Géré quantitativement (Niveau 4.0)";
      break;
    case (score >= 0.75):
      niveau = "Défini avancé (Niveau 3.7)";
      break;
    case (score >= 0.65):
      niveau = "Défini (Niveau 3.3)";
      break;
    case (score >= 0.55):
      niveau = "Défini initial (Niveau 3.0)";
      break;
    case (score >= 0.45):
      niveau = "Géré avancé (Niveau 2.7)";
      break;
    case (score >= 0.35):
      niveau = "Géré (Niveau 2.3)";
      break;
    case (score >= 0.25):
      niveau = "Géré initial (Niveau 2.0)";
      break;
    case (score >= 0.15):
      niveau = "Initial avancé (Niveau 1.7)";
      break;
    case (score >= 0.05):
      niveau = "Initial (Niveau 1.3)";
      break;
    case (score > 0):
      niveau = "Très faible (Niveau 1.0)";
      break;
    default:
      niveau = "Critique (Niveau 0)";
  }

  return niveau;
};


router.post("/evalPointControl", async (req, res) => {
  try {
    const alpha = 5;
    const {controlPointId} = req.body;

    const questions = await Question.findAll({where: {controlPointId: controlPointId}, attributes: ["id_qst"]})

    const questionIds = questions.map(q => q.id_qst)

    questionIds.forEach(i => {
      console.log(i)
    })

    if (questionIds.length === 0) {
      return 0
    }

    const evaluations = await Evaluation.findAll({
      where: {questionId: questionIds}
    })

    if (evaluations.length === 0) {
      return 0
    }

    const subjectIds = [...new Set(evaluations.map(e => e.subjectId))]

    const scores = await Promise.all(subjectIds.map(id => scoreSujet(id, controlPointId)));
    scores.forEach((e) => {
      console.log(`le sujet a un P_i de ${e}`)
    } )

    let sumScore = 0

    scores.forEach((sco) => {
      sumScore += sco
    })

    let P_sys = sumScore / subjectIds.length

    let sumSqrt = 0

    scores.forEach((sco) => {
      sumSqrt = sumSqrt + Math.pow((sco - P_sys), 2)
    })

    let variance = sumSqrt / subjectIds.length

    let dispersion = Math.sqrt(variance)

    let ScorePtCtrl = dispersion === 0 ? P_sys : P_sys* Math.exp(-alpha*dispersion)
    // console.log(` P_sys ${P_sys}`)
    // console.log(` variance ${variance}`)
    // console.log(` dispersion ${dispersion}`)
    // console.log(` score pt_ctrl ${ScorePtCtrl}`)

    const criticality = determinerCriticite(ScorePtCtrl)
    console.log(`criticité ${criticality}`)

    await ControlPoint.update({score_cp: ScorePtCtrl, criticalityLevel: criticality}, {where:{id_cp: controlPointId}})
    
    return res.status(200).json({
      message: `Le score du point de Controle ${controlPointId} est ${ScorePtCtrl.toFixed(2)}`,
    })
  } catch (error) {
    console.error("Erreur lors de l'évaluation du point de contrôle :", error);
    return null;
  }
});

router.post("/evalSubDomain", async (req, res) => {
  try {
    
    const {subDomainId} = req.body;

    const controlpoints = await ControlPoint.findAll({where: {subDomainId: subDomainId}, attributes: ["id_cp","poids_cp", "score_cp"]})

    if (controlpoints.length === 0) {return 0} ;

    let sommePonderee = 0;
    let sommePoids = 0; 


    controlpoints.forEach(({poids_cp : poids, score_cp: score}) => {
      if (poids !== null && score !== null){
        sommePonderee += score*poids;
        sommePoids += poids;
      }
    });

    if (sommePoids === 0) {return 0};

    let ScoreSubDomain = sommePonderee / sommePoids; 

    const criticality = determinerCriticite(ScoreSubDomain)
    console.log(`criticité ${criticality}`)

    await SubDomain.update({score: ScoreSubDomain, criticality: criticality}, {where:{id_sdom: subDomainId}})

  
    
    return res.status(200).json({
      message: `Le score du sous domaine ${subDomainId} est ${ScoreSubDomain.toFixed(2)}`,
    })
  } catch (error) {
    console.error("Erreur lors de l'évaluation du sous domaine :", error);
    return null;
  }
});

router.post("/evalDomain", async (req, res) => {
  try {
    
    const {domainId} = req.body;

    const subdomains = await SubDomain.findAll({where: {domainId: domainId}, attributes: ["id_sdom","score", "weight"]})

    if (subdomains.length === 0) {return 0} ;

    let sommePonderee = 0;
    let sommePoids = 0; 


    subdomains.forEach(({score : sco, weight: wg}) => {
      if (sco !== null && wg !== null){
        sommePonderee += sco*wg;
        sommePoids += wg;
      }
    });

    if (sommePoids === 0) {return 0};

    let ScoreDomain = sommePonderee / sommePoids; 

    const criticality = determinerCriticite(ScoreDomain)
    console.log(`criticité ${criticality}`)

    await Domain.update({score: ScoreDomain, criticality: criticality}, {where:{id_dom: domainId}})

  
    
    return res.status(200).json({
      message: `Le score du domaine ${domainId} est ${ScoreDomain.toFixed(2)}`,
    })
  } catch (error) {
    console.error("Erreur lors de l'évaluation du domaine :", error);
    return null;
  }
});

router.post("/evalBranch", async (req, res) => {
  try {
    
    const {branchId} = req.body;

    const domains = await Domain.findAll({where: {branchId: branchId}, attributes: ["id_dom","score", "weight"]})

    if (domains.length === 0) {return 0} ;

    let sommePonderee = 0;
    let sommePoids = 0; 


    domains.forEach(({score : sco, weight: wg}) => {
      if (sco !== null && wg !== null){
        sommePonderee += sco*wg;
        sommePoids += wg;
      }
    });

    if (sommePoids === 0) {return 0};

    let ScoreBranch = sommePonderee / sommePoids; 

    await Branch.update({score: ScoreBranch}, {where:{id_br: branchId}})

  
    
    return res.status(200).json({
      message: `Le score de la branche ${branchId} est ${ScoreBranch.toFixed(2)}`,
    })
  } catch (error) {
    console.error("Erreur lors de l'évaluation de la branche :", error);
    return null;
  }
});


// /**
//  * @route POST /api/audit/submit-answers
//  * @desc Submit answers for an evaluation
//  */
// router.post("/submit-answers", async (req, res) => {
//   try {
//     const { evaluationId, answers } = req.body; // Answers is an array [{ questionId, answer }]

//     // Save each answer
//     const answerRecords = await Promise.all(
//       answers.map((ans) =>
//         EvaluationAnswer.create({
//           evaluationId: evaluationId,
//           questionId: ans.questionId,
//           answer: ans.answer,
//         })
//       )
//     );

//     // Compute score (yes = 1, no = 0)
//     const totalQuestions = answers.length;
//     const yesCount = answers.filter((ans) => ans.answer === true).length;
//     const score = totalQuestions > 0 ? yesCount / totalQuestions : 0;

//     // Update evaluation score
//     await Evaluation.update({ score }, { where: { id_eval: evaluationId } });

//     return res.status(200).json({
//       message: "Answers submitted successfully",
//       score,
//       answers: answerRecords,
//     });
//   } catch (error) {
//     console.error("Error submitting answers:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// /**
//  * @route POST /api/audit/finalize-evaluation
//  * @desc Finalize a control point evaluation (compute average score & criticality) and update hierarchy scores
//  */
// router.post("/finalize-evaluation", async (req, res) => {
//   try {
//     const { controlPointId } = req.body;

//     // Get all evaluations for the control point
//     const evaluations = await Evaluation.findAll({
//       where: { id_cp: controlPointId },
//       attributes: ["score"],
//     });

//     if (evaluations.length === 0) {
//       return res.status(400).json({ error: "No evaluations found" });
//     }

//     // Compute average score
//     const totalScore = evaluations.reduce((sum, ev) => sum + ev.score, 0);
//     const avgScore = totalScore / evaluations.length;

//     // Assign criticality based on refined CMMI model
//     let criticality;
//     if (avgScore >= 0.8) criticality = "Low"; // Optimized (CMMI Level 5)
//     else if (avgScore >= 0.6) criticality = "Moderate"; // Defined (CMMI Level 3-4)
//     else if (avgScore >= 0.4) criticality = "High"; // Managed (CMMI Level 2-3)
//     else if (avgScore >= 0.2) criticality = "Critical"; // Initial (CMMI Level 1-2)
//     else criticality = "Severe"; // Chaotic (Below Level 1)

//     // // Update or create the control point score
//     // const [controlPointScore] = await ControlPointScore.findOrCreate({
//     //   where: { id_cp: controlPointId },
//     //   defaults: { averageScore: avgScore, criticalityLevel: criticality },
//     // });

//     // if (!controlPointScore.isNewRecord) {
//     //   await controlPointScore.update({ averageScore: avgScore, criticalityLevel: criticality });
//     // }
//     // Update control point score
//     const controlPointScore = await ControlPointScore.upsert({
//       controlPointId: controlPointId,
//       averageScore: avgScore,
//       criticalityLevel: criticality,
//     });

//     // Cascade updates to sub-domains, domains, and branches
//     await cascadeScores(controlPointId);

//     return res.status(200).json({
//       message: "Evaluation finalized",
//       averageScore: avgScore.toFixed(2),
//       criticalityLevel: criticality,
//     });
//   } catch (error) {
//     console.error("Error finalizing evaluation:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// /**
//  * Helper function to cascade scores from control points to higher levels
//  */
// const cascadeScores = async (controlPointId) => {
//   // Fetch control point and its weight
//   const controlPoint = await ControlPoint.findOne({ where: { id_cp: controlPointId } });

//   // Update Sub-Domain
//   const subDomain = await SubDomain.findOne({ where: { id_sdom: controlPoint.subDomainId } });
//   const controlPoints = await ControlPoint.findAll({ where: { subDomainId: subDomain.id_sdom } });
//   const subDomainScore = computeWeightedAverage(controlPoints, "score", "weight");
//   await subDomain.update({ score: subDomainScore });

//   // Update Domain
//   const domain = await Domain.findOne({ where: { id_dom: subDomain.domainId } });
//   const subDomains = await SubDomain.findAll({ where: { domainId: domain.id_dom } });
//   const domainScore = computeWeightedAverage(subDomains, "score", "weight");
//   await domain.update({ score: domainScore });

//   // Update Branch
//   const branch = await Branch.findOne({ where: { id_br: domain.branchId } });
//   const domains = await Domain.findAll({ where: { branchId: branch.id_br } });
//   const branchScore = computeWeightedAverage(domains, "score", "weight");
//   await branch.update({ score: branchScore });
// };

// /**
//  * Compute weighted average
//  */
// const computeWeightedAverage = (items, valueKey, weightKey) => {
//   const totalWeight = items.reduce((sum, item) => sum + item[weightKey], 0);
//   if (totalWeight === 0) return 0;
//   const weightedSum = items.reduce((sum, item) => sum + item[valueKey] * item[weightKey], 0);
//   return weightedSum / totalWeight;
// };


// /**
//  * @route GET /api/audit/control-point/:id_cp/score
//  * @desc Get the score & criticality of a control point
//  */
// router.get("/control-point/:id_cp/score", async (req, res) => {
//   try {
//     const { id_cp } = req.params;

//     const score = await ControlPointScore.findOne({ where: { controlPointId: id_cp } });

//     if (!score) {
//       return res.status(404).json({ error: "Score not found" });
//     }

//     return res.status(200).json(score);
//   } catch (error) {
//     console.error("Error fetching control point score:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// /**
//  * @route POST /api/audit/generate-recommendations
//  * @desc Generate recommendations based on negative responses
//  */
// router.post("/generate-recommendations", async (req, res) => {
//   try {
//     const { evaluationId } = req.body;

//     // Fetch evaluation answers
//     const answers = await EvaluationAnswer.findAll({
//       where: { evaluationId: evaluationId, answer: false }, // Get only 'No' answers
//       include: { model: Question, as: "question", attributes: ["text"] },
//     });

//     if (answers.length === 0) {
//       return res.status(200).json({ message: "No recommendations needed" });
//     }

//     // Generate recommendations
//     const recommendations = await Promise.all(
//       answers.map((ans) =>
//         Recommendation.create({
//           evaluationId: evaluationId,
//           controlPointId: ans.evaluationId,
//           recommendationText: `It is recommended to address: ${ans.question.text}`,
//         })
//       )
//     );

//     return res.status(201).json({
//       message: "Recommendations generated",
//       recommendations,
//     });
//   } catch (error) {
//     console.error("Error generating recommendations:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
