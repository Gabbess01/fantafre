
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { CreatePlayerValues, formationOptions } from "@/schemas/playerSchema";

interface CreateTeamFormProps {
  form: UseFormReturn<CreatePlayerValues>;
}

export const CreateTeamForm = ({ form }: CreateTeamFormProps) => {
  return (
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
  );
};
