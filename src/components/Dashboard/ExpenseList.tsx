import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Expense, CATEGORY_COLORS } from "@/types/expense";
import { Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { formatINR } from "@/lib/utils";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseListProps) => {
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="p-6 shadow-soft">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Expenses</h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {sortedExpenses.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No expenses yet. Add your first expense to get started!</p>
        ) : (
          sortedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
            >
              <div className="flex items-start gap-4 flex-1">
                <div 
                  className="w-1 h-12 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[expense.category] }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">{expense.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {expense.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{format(new Date(expense.date), "MMM dd, yyyy")}</span>
                  </div>
                  {expense.description && (
                    <p className="text-sm text-muted-foreground mt-1 truncate">{expense.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-foreground whitespace-nowrap">
                  {formatINR(expense.amount)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
