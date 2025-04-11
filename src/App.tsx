
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Layout from "./Layout";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Players from "./pages/Players";
import Rules from "./pages/Rules";
import CreatePlayer from "./pages/CreatePlayer";
import TeamDashboard from "./pages/TeamDashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import Stats from "./pages/Stats";
import Teams from "./pages/Teams";
import Cards from "./pages/Cards";
import PlayerRatings from "./pages/PlayerRatings";
import TeamEvents from "./pages/TeamEvents";
import CreateTeamEvent from "./pages/CreateTeamEvent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/players" element={<Players />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/create-player" element={<CreatePlayer />} />
              <Route path="/team/:teamId" element={<TeamDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/settings" element={<ProfileSettings />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/player-ratings" element={<PlayerRatings />} />
              <Route path="/team-events" element={<TeamEvents />} />
              <Route path="/team-events/create" element={<CreateTeamEvent />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
