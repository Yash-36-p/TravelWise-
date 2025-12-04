import { Card } from "@/components/ui/card";
import { Budget } from "@/types/expense";
import { CurrencyRupee, TrendingDown, Wallet } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface BudgetSummaryProps {
  budget: Budget;
}

export const BudgetSummary = ({ budget }: BudgetSummaryProps) => {
  const spentPercentage = (budget.spent / budget.total) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-primary">
            <CurrencyRupee className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total Budget</p>
            <p className="text-2xl font-bold text-foreground">{formatINR(budget.total)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-accent">
            <TrendingDown className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total Spent</p>
            <p className="text-2xl font-bold text-foreground">{formatINR(budget.spent)}</p>
            <p className="text-xs text-muted-foreground mt-1">{spentPercentage.toFixed(1)}% of budget</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-success">
            <Wallet className="h-6 w-6 text-success-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Remaining</p>
            <p className="text-2xl font-bold text-foreground">{formatINR(budget.remaining)}</p>
            <p className="text-xs text-muted-foreground mt-1">{(100 - spentPercentage).toFixed(1)}% left</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
