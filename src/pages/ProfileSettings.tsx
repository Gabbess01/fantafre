
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Mock user data - in a real app, this would come from your auth provider
const user = {
  username: "GiocatoreFre",
  email: "giocatore@example.com",
  avatar: "/placeholder.svg",
  teamName: "Squadra Pro",
};

const ProfileSettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    username: user.username,
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profilo aggiornato",
      description: "Le modifiche al tuo profilo sono state salvate con successo.",
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Le password non corrispondono",
        description: "Assicurati che la nuova password e la conferma siano uguali.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password aggiornata",
      description: "La tua password è stata modificata con successo.",
    });
    
    // Reset password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/profile" className="flex items-center text-muted-foreground hover:text-foreground gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Torna al Profilo</span>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Impostazioni Profilo</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile">Profilo</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Profilo</CardTitle>
                <CardDescription>
                  Modifica le tue informazioni personali
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-24 w-24 mb-4 border-2 border-fregna-primary">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-fregna-primary to-fregna-secondary text-white">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Cambia Foto</Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-fregna-primary to-fregna-secondary">
                      Salva Modifiche
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Cambia Password</CardTitle>
                <CardDescription>
                  Aggiorna la tua password per mantenere il tuo account sicuro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Password Attuale</Label>
                      <Input 
                        id="current-password"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nuova Password</Label>
                      <Input 
                        id="new-password"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Conferma Nuova Password</Label>
                      <Input 
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-fregna-primary to-fregna-secondary">
                      Aggiorna Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileSettings;
