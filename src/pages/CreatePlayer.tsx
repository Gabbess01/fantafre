
import CreatePlayerForm from "@/components/CreatePlayerForm";

const CreatePlayer = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text text-center">
        Crea il tuo giocatore
      </h1>
      
      <CreatePlayerForm />
    </div>
  );
};

export default CreatePlayer;
