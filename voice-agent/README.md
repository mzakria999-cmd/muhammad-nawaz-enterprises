# Zaki Assistant — Voice Agent

A voice assistant built on ElevenLabs Agents.

- **Talk to it:** https://elevenlabs.io/app/talk-to?agent_id=agent_0901m7nt31bpejktby4gt34s5wpg
- **Agent ID:** agent_0901m7nt31bpejktby4gt34s5wpg
- **Languages:** English (default), Urdu, German, switched automatically
- **Voice:** "Amjid ch" (Urdu male voice)
- **Brain:** Claude Haiku 5.5 with a knowledge base (searches the documents below)

## Family-only information
A private profile document ("PRIVATE - Zaki personal profile") lives only in ElevenLabs,
not in this repository. The agent shares it only after the caller says the family code.
The code is kept in the agent's prompt in ElevenLabs, never in this repo.
Do not store passwords, bank details or ID numbers in the profile.

## Knowledge
- `knowledge/01-business.md`: products, prices, ordering, contact
- `knowledge/02-german-law-guide.md`: general info on deadlines, benefits, residence, work, renting
- `knowledge/03-agent-rules.md`: how the agent behaves

To add knowledge: edit or add a file here, then upload it in ElevenLabs
(Agents → Zaki Assistant → Knowledge Base) or ask Claude to do it.

## History
Every conversation is saved in ElevenLabs (Agents → Zaki Assistant → History), with no expiry.
