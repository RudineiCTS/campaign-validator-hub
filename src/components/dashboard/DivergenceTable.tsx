import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface Divergence {
  campaignId: string;
  type: string;
  difference: number;
  description: string;
  suggestedAction: string;
}

const mockDivergences: Divergence[] = [
  {
    campaignId: "CMP-2024-002",
    type: "Valor Divergente",
    difference: -1500,
    description: "Diferença entre valor total e soma individual",
    suggestedAction: "Revisar valores individuais dos itens da campanha",
  },
  {
    campaignId: "CMP-2024-005",
    type: "Data Inválida",
    difference: 0,
    description: "Data de início posterior à data de fim",
    suggestedAction: "Corrigir datas no sistema de origem",
  },
];

export function DivergenceTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <CardTitle>Divergências Identificadas</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {mockDivergences.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Campanha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Diferença</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Ação Sugerida</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDivergences.map((divergence, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{divergence.campaignId}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-warning text-warning">
                        {divergence.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {divergence.difference !== 0
                        ? divergence.difference.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {divergence.description}
                    </TableCell>
                    <TableCell className="text-sm">{divergence.suggestedAction}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-2 text-success" />
            <p>Nenhuma divergência identificada</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
