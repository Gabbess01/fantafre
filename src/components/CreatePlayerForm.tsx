
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, ChevronDown } from "lucide-react";

const createPlayerSchema = z.object({
  playerName: z.string().min(3, { message: "Il nome deve contenere almeno 3 caratteri" }).max(30),
  role: z.string().min(1, { message: "Seleziona un ruolo" }),
  teamOption: z.enum(["join", "create"]),
  teamName: z.string().optional(),
  formation: z.string().optional(),
});

type CreatePlayerValues = z.infer<typeof createPlayerSchema>;

const roleOptions = [
  { value: "attaccante", label: "Attaccante" },
  { value: "centrocampista", label: "Centrocampista" },
  { value: "difensore", label: "Difensore" },
  { value: "portiere", label: "Portiere" },
];

const formationOptions = [
  { value: "4-3-3", label: "4-3-3" },
  { value: "4-4-2", label: "4-4-2" },
  { value: "3-5-2", label: "3-5-2" },
  { value: "5-3-2", label: "5-3-2" },
];

const CreatePlayerForm = () => {
  const [isCreateTeam, setIsCreateTeam] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const form = useForm<CreatePlayerValues>({
    resolver: zodResolver(createPlayerSchema),
    defaultValues: {
      playerName: "",
      role: "",
      teamOption: "join",
    },
  });

  const teamOption = form.watch("teamOption");

  const onSubmit = (values: CreatePlayerValues) => {
    console.log(values);

    // Generate a mock invite link if creating a team
    if (values.teamOption === "create") {
      const generatedLink = `https://fantafregna.com/join/${values.teamName?.toLowerCase().replace(/\s/g, "-")}-${Math.random().toString(36).substring(2, 8)}`;
      setInviteLink(generatedLink);
    } else {
      // For join team option
      toast.success(`${values.playerName} creato con successo!`, {
        description: "Ora puoi unirti a una squadra usando un link di invito.",
      });
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Link copiato negli appunti!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Crea il tuo giocatore</CardTitle>
            <CardDescription>
              Inserisci i tuoi dati per iniziare la tua avventura in FantaFregna
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="playerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Giocatore</FormLabel>
                  <FormControl>
                    <Input placeholder="Il tuo nome da giocatore" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruolo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona un ruolo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamOption"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Opzione Squadra</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setIsCreateTeam(value === "create");
                        setInviteLink("");
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="join" id="join" />
                        <Label htmlFor="join">Unisciti a una squadra esistente</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="create" id="create" />
                        <Label htmlFor="create">Crea una nuova squadra</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {teamOption === "create" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Squadra</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome della tua squadra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="formation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modulo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona un modulo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {formationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-gradient-to-r from-fregna-primary to-fregna-secondary">
              {teamOption === "join" ? "Crea Giocatore" : "Crea Squadra"}
            </Button>
          </CardFooter>
        </Card>

        {inviteLink && (
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>Squadra Creata!</CardTitle>
              <CardDescription>
                Condividi questo link di invito con gli altri giocatori
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input readOnly value={inviteLink} className="flex-1 bg-background" />
                <Button size="icon" variant="outline" onClick={copyInviteLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </Form>
  );
};

export default CreatePlayerForm;
