
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreatePlayerValues, createPlayerSchema, roleOptions } from "@/schemas/playerSchema";
import { JoinTeamForm } from "./create-player/JoinTeamForm";
import { CreateTeamForm } from "./create-player/CreateTeamForm";
import { InviteLinkCard } from "./create-player/InviteLinkCard";

const CreatePlayerForm = () => {
  const navigate = useNavigate();
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

    if (values.teamOption === "create") {
      // Generate team ID and invite link for new team
      const teamId = values.teamName?.toLowerCase().replace(/\s/g, "-") + "-" + Math.random().toString(36).substring(2, 8);
      const generatedLink = `https://fantafregna.com/join/${teamId}`;
      setInviteLink(generatedLink);
      
      toast.success(`Squadra ${values.teamName} creata con successo!`, {
        description: "Ora puoi gestire la tua squadra.",
      });
      
      // Navigate to team dashboard with team data
      setTimeout(() => {
        navigate(`/team/${teamId}`, { 
          state: { 
            teamName: values.teamName,
            formation: values.formation,
            playerName: values.playerName,
            role: values.role
          } 
        });
      }, 1500);
    } else {
      // For join team option - simulate joining an existing team
      // In a real app, you'd validate the team ID or invite link
      toast.success(`${values.playerName} creato con successo!`, {
        description: "Stai per essere reindirizzato alla dashboard della squadra.",
      });
      
      // For demo purposes, create a mock team ID
      const mockTeamId = "squadra-esistente-" + Math.random().toString(36).substring(2, 8);
      
      // Navigate to team dashboard with player data only
      setTimeout(() => {
        navigate(`/team/${mockTeamId}`, { 
          state: { 
            teamName: "Squadra Esistente",
            playerName: values.playerName,
            role: values.role,
            isNewPlayer: true
          } 
        });
      }, 1500);
    }
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

            {teamOption === "join" && <JoinTeamForm form={form} />}
            {teamOption === "create" && <CreateTeamForm form={form} />}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-gradient-to-r from-fregna-primary to-fregna-secondary">
              {teamOption === "join" ? "Unisciti alla Squadra" : "Crea Squadra"}
            </Button>
          </CardFooter>
        </Card>

        {inviteLink && <InviteLinkCard inviteLink={inviteLink} />}
      </form>
    </Form>
  );
};

export default CreatePlayerForm;
