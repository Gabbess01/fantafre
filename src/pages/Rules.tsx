
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Rules = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Regolamento FantaFregna</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Come funziona FantaFregna?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                FantaFregna è un gioco sociale che trasforma le tue esperienze romantiche in un divertente sistema di punteggi.
                Ogni giocatore registra i propri tentativi, conquiste e pali, accumulando statistiche e scalando la classifica.
              </p>
              
              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="registration">
                  <AccordionTrigger>Registrazione e Partecipazione</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Registrati con un nickname unico che ti rappresenti nel gioco.</li>
                      <li>Crea il tuo profilo personale con foto e breve descrizione (facoltativo ma consigliato).</li>
                      <li>Ogni giocatore rappresenta una "squadra" a sé nella lega FantaFregna.</li>
                      <li>La partecipazione è riservata a persone maggiorenni.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="points">
                  <AccordionTrigger>Sistema di Punteggio</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2 font-medium">Le statistiche principali sono:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Tentativi:</strong> Ogni approccio romantico registrato</li>
                      <li><strong>Pali:</strong> Tentativi falliti (più pali = più punti)</li>
                      <li><strong>Conquiste:</strong> Tentativi riusciti</li>
                      <li><strong>Streak:</strong> Serie consecutiva di conquiste o pali</li>
                    </ul>
                    <p className="mt-4">Il rating complessivo aumenta sia con le conquiste che con i pali, premiando sia il successo che il coraggio di tentare!</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="verification">
                  <AccordionTrigger>Verifica e Testimoni</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Per mantenere l'integrità del gioco, ogni tentativo dovrebbe essere verificabile:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Un amico/testimone può confermare il tentativo</li>
                      <li>Foto o messaggi possono servire come prova (nel rispetto della privacy)</li>
                      <li>La community può votare in caso di disputeì</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="rewards">
                  <AccordionTrigger>Ricompense e Premi</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">I migliori giocatori vengono premiati con:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Badge e riconoscimenti speciali sul profilo</li>
                      <li>Posizioni d'onore nella classifica generale</li>
                      <li>Potenziali premi fisici negli eventi dal vivo</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="ethics">
                  <AccordionTrigger>Etica e Rispetto</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2 text-amber-500 font-medium">Importante:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Il gioco promuove interazioni consensuali e rispettose</li>
                      <li>È vietato condividere dettagli privati o intimi delle persone coinvolte</li>
                      <li>Il rispetto reciproco viene prima della competizione</li>
                      <li>Comportamenti molesti o inappropriati comportano l'espulsione dal gioco</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Calcolo del Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Il rating di ogni giocatore è calcolato secondo questa formula:
              </p>
              <div className="p-4 bg-muted rounded-lg text-center font-mono">
                Rating = (Conquiste × 3) + (Pali × 2) + Bonus streak
              </div>
              <p className="text-sm mt-4 text-muted-foreground">
                I pali hanno un valore importante perché dimostrano coraggio nel tentare!
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Periodi di Classifica</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center pb-2 border-b">
                  <span>Stagione completa</span>
                  <span className="text-muted-foreground">12 mesi</span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b">
                  <span>Classifica mensile</span>
                  <span className="text-muted-foreground">30 giorni</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Classifica settimanale</span>
                  <span className="text-muted-foreground">7 giorni</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rules;
