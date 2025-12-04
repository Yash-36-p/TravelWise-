import { Button } from "@/components/ui/button";
import { PlusCircle, RotateCw } from "lucide-react";

interface DashboardHeaderProps {
  onAddExpense: () => void;
  onReset?: () => void;
}

export const DashboardHeader = ({ onAddExpense, onReset }: DashboardHeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-soft sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Travel<span className="text-primary">Wise</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={onReset} variant="ghost" className="gap-2">
              <RotateCw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button onClick={onAddExpense} className="gap-2">
              <PlusCircle className="h-5 w-5" />
              <span className="hidden sm:inline">Add Expense</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
