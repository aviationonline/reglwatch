export function regulationPrompt(content: string) {
  return `
Tu es un expert français en conformité réglementaire.

Analyse le texte ci-dessous.

Retourne UNIQUEMENT un JSON valide.

Format attendu :

{
  "title":"",
  "summary":"",
  "urgency":"low|medium|high|critical",
  "effective_date":"",
  "sectors":[],
  "obligations":[
    {
      "title":"",
      "description":"",
      "deadline_days":0
    }
  ]
}

Texte :

${content}
`;
}
