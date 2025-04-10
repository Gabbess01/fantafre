
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface InviteLinkCardProps {
  inviteLink: string;
}

export const InviteLinkCard = ({ inviteLink }: InviteLinkCardProps) => {
  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Link copiato negli appunti!");
  };

  return (
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
  );
};
