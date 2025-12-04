export type ExpenseCategory = 
  | "Food" 
  | "Transport" 
  | "Stay" 
  | "Activities" 
  | "Shopping" 
  | "Entertainment" 
  | "Healthcare" 
  | "Communication" 
  | "Insurance" 
  | "Emergency" 
  | "Other";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description?: string;
}

export interface Budget {
  total: number;
  spent: number;
  remaining: number;
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Food",
  "Transport",
  "Stay",
  "Activities",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Communication",
  "Insurance",
  "Emergency",
  "Other"
];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: "hsl(16 85% 62%)",
  Transport: "hsl(186 85% 45%)",
  Stay: "hsl(270 75% 60%)",
  Activities: "hsl(142 76% 45%)",
  Shopping: "hsl(290 85% 55%)",
  Entertainment: "hsl(38 92% 50%)",
  Healthcare: "hsl(0 70% 55%)",
  Communication: "hsl(210 85% 55%)",
  Insurance: "hsl(240 75% 60%)",
  Emergency: "hsl(350 85% 50%)",
  Other: "hsl(215 15% 50%)"
};
