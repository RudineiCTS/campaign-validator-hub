import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText, History } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function ReportsSection() {
  const handleDownloadExcel = () => {
    toast({
      title: "Exportando relatório Excel",
      description: "O download será iniciado em breve...",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Exportando relatório PDF",
      description: "O download será iniciado em breve...",
    });
  };

  const handleViewHistory = () => {
    toast({
      title: "Histórico de execuções",
      description: "Abrindo histórico completo...",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios e Histórico</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <Button
            onClick={handleDownloadExcel}
            className="h-24 flex-col gap-2"
            variant="outline"
          >
            <FileSpreadsheet className="h-8 w-8 text-success" />
            <span className="text-sm">Baixar Excel</span>
          </Button>

          <Button
            onClick={handleDownloadPDF}
            className="h-24 flex-col gap-2"
            variant="outline"
          >
            <FileText className="h-8 w-8 text-destructive" />
            <span className="text-sm">Baixar PDF</span>
          </Button>

          <Button
            onClick={handleViewHistory}
            className="h-24 flex-col gap-2"
            variant="outline"
          >
            <History className="h-8 w-8 text-primary" />
            <span className="text-sm">Ver Histórico</span>
          </Button>
        </div>

        <div className="mt-6 p-4 rounded-lg border bg-muted/50">
          <h4 className="font-medium mb-2 text-sm">Última Exportação</h4>
          <p className="text-sm text-muted-foreground">
            26 de novembro de 2024, 14:32
          </p>
          <p className="text-sm text-muted-foreground">
            Formato: Excel | Tamanho: 2.4 MB
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
