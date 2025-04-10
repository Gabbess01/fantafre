
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CreatePlayerValues } from "@/schemas/playerSchema";

interface JoinTeamFormProps {
  form: UseFormReturn<CreatePlayerValues>;
}

export const JoinTeamForm = ({ form }: JoinTeamFormProps) => {
  return (
    <FormField
      control={form.control}
      name="teamId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>ID Squadra o Link di Invito</FormLabel>
          <FormControl>
            <Input placeholder="Inserisci l'ID della squadra o il link di invito" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
