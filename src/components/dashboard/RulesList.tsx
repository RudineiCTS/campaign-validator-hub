import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Power } from "lucide-react";

interface Rule {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  isActive: boolean;
}

const mockRules: Rule[] = [
  {
    id: "R001",
    name: "Validação de Valor Total",
    description: "Verifica se a soma dos valores individuais corresponde ao valor total da campanha",
    lastModified: "2024-11-20",
    isActive: true,
  },
  {
    id: "R002",
    name: "Validação de Datas",
    description: "Confirma que a data de início é anterior à data de fim",
    lastModified: "2024-11-15",
    isActive: true,
  },
  {
    id: "R003",
    name: "Verificação de Duplicatas",
    description: "Identifica campanhas com IDs duplicados na base",
    lastModified: "2024-11-10",
    isActive: false,
  },
];

export function RulesList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Regras de Validação</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Regra
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRules.map((rule) => (
            <div
              key={rule.id}
              className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{rule.name}</h4>
                  <Badge variant={rule.isActive ? "default" : "secondary"} className="flex items-center gap-1">
                    <Power className="h-3 w-3" />
                    {rule.isActive ? "Ativa" : "Inativa"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
                <p className="text-xs text-muted-foreground">
                  Última alteração: {new Date(rule.lastModified).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
